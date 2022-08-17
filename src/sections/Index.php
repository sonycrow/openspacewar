<?php
declare(strict_types=1);

class Index extends SectionController
{
    private string $lang;
    private array $codex;

    private array $skills;
    private array $traits;
    private array $cardskills;

    function __construct(string $name)
    {
        parent::__construct($name);

        $this->lang  = $_REQUEST['lang'] ?? "es";
        $this->codex = json_decode(file_get_contents(ROOT . "/src/storage/openheroestcg_cards_complete.json"), true);

        $this->skills     = json_decode(file_get_contents(ROOT . "/src/storage/openheroestcg_skills.json"), true);
        $this->traits     = json_decode(file_get_contents(ROOT . "/src/storage/openheroestcg_traits.json"), true);
        $this->cardskills = json_decode(file_get_contents(ROOT . "/src/storage/openheroestcg_card_skills.json"), true);
    }

    public function getRenderVars(): array
    {
        return [
            'lang'  => $this->lang,
            'codex' => $this->translateCodex()
        ];
    }

    private function translateCodex(): array
    {
        $count = 1;
        $codexTranslated = array();

        foreach ($this->codex["card"] as $card) {
            $card["s1"]["desc"][$this->lang] = $this->translate($card["s1"]["desc"][$this->lang]);
            $card["s2"]["desc"][$this->lang] = $this->translate($card["s2"]["desc"][$this->lang]);
            $card["s3"]["desc"][$this->lang] = $this->translate($card["s3"]["desc"][$this->lang]);

            foreach ($card["skill"] as &$skill) {
                 $skill = str_replace(" ", "&nbsp;", $this->getSkillDesc($skill, $this->lang));
            }
            foreach ($card["trait"] as &$trait) {
                $trait = str_replace(" ", "&nbsp;", $this->getTraitDesc($trait, $this->lang));
            }

            $codexTranslated[] = $card;

            if ($count++ >= 100) break;
        }

        return array("card" => $codexTranslated);
    }


    private function translate($text): string
    {
        $text = preg_replace_callback(
            '/\{(.*?)}/mi',
            function ($m) {
                return "{" . $this->getSkillDesc($m[1], $this->lang) . "}";
            },
            $text
        );

        $text = preg_replace_callback(
            '/\[(.*?)]/mi',
            function ($m) {
                return "[" . $this->getTraitDesc($m[1], $this->lang) . "]";
            },
            $text
        );

        return $text;
    }

    private function getSkillDesc($code, $lang): ?string
    {
        foreach ($this->skills["skill"] as $skill) {
            if ($skill["code"] == $code) {
                return $skill["name"][$lang];
            }
        }

        return null;
    }

    private function getTraitDesc($code, $lang): ?string
    {
        foreach ($this->traits["trait"] as $trait) {
            if ($trait["code"] == $code) {
                return $trait["name"][$lang];
            }
        }

        return null;
    }
}