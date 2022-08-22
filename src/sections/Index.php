<?php
declare(strict_types=1);

class Index extends SectionController
{
    private string $lang;

    private array $codex;
    private array $skills;
    private array $traits;

    function __construct(string $name)
    {
        parent::__construct($name);

        $this->lang  = $_REQUEST['lang'] ?? "es";

        $this->codex  = json_decode(file_get_contents(ROOT . "/src/storage/osw_codex.json"), true);
        $this->skills = json_decode(file_get_contents(ROOT . "/src/storage/osw_skills.json"), true);
        $this->traits = json_decode(file_get_contents(ROOT . "/src/storage/osw_traits.json"), true);
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

        foreach ($this->codex["card"] as $card)
        {
//            if ($card["type"] != "base") continue;
//            if (intval($card['number']) != 11) continue;
//            if (intval($card['number']) < 4) continue;
//            if (intval($card['number']) >= 20) continue;

            if ($card['class'] != 'dimensional') continue;

            $card["special"]["desc"][$this->lang] = $this->translate($card["special"]["desc"][$this->lang]);

            $card["vanguard"]["desc"][$this->lang] = $this->translate($card["vanguard"]["desc"][$this->lang]);
            $card["rearguard"]["desc"][$this->lang] = $this->translate($card["rearguard"]["desc"][$this->lang]);
            $card["flash"]["desc"][$this->lang] = $this->translate($card["flash"]["desc"][$this->lang]);

            if ($card["skill"]) {
                foreach ($card["skill"] as &$skill) {
                    $skill = str_replace(" ", "&nbsp;", $this->getSkillDesc($skill, $this->lang));
                }
            }

            if ($card["trait"]) {
                foreach ($card["trait"] as &$trait) {
                    $trait = str_replace(" ", "&nbsp;", $this->getTraitDesc($trait, $this->lang));
                }
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

        $text = str_replace('\n', '<br/>', $text);

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
                return $code . "|" . $trait["name"][$lang];
            }
        }

        return null;
    }
}