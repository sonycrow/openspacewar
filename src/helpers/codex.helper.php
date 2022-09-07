<?php
declare(strict_types=1);

class CodexHelper
{
    static public function help($cards, $skills, $traits, $lang): array
    {
        $codexTranslated = array();

        foreach ($cards as $card)
        {
            $card["classtrans"] = TranslateHelper::help($skills, $traits, "[{$card["class"]}]", $lang);

            $card["special"]["desc"][$lang]   = TranslateHelper::help($skills, $traits, $card["special"]["desc"][$lang], $lang);
            $card["vanguard"]["desc"][$lang]  = TranslateHelper::help($skills, $traits, $card["vanguard"]["desc"][$lang], $lang);
            $card["rearguard"]["desc"][$lang] = TranslateHelper::help($skills, $traits, $card["rearguard"]["desc"][$lang], $lang);
            $card["flash"]["desc"][$lang]     = TranslateHelper::help($skills, $traits, $card["flash"]["desc"][$lang], $lang);

            if ($card["skill"]) {
                foreach ($card["skill"] as &$skill) {
                    $skill = DescriptionHelper::help($skills, $skill, $lang);
                }
            }

            if ($card["trait"]) {
                foreach ($card["trait"] as &$trait) {
                    $trait = DescriptionHelper::help($traits, $trait, $lang);
                }
            }

            $codexTranslated[] = $card;
        }

        return array("card" => $codexTranslated);
    }
}