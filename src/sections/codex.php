<?php
declare(strict_types=1);

class Codex extends SectionController
{
       public function getRenderVars(): array
    {
        return [
            'lang'  => $this->lang,
            'codex' => CodexHelper::help($this->codex, $this->skills, $this->traits, $this->lang)
        ];
    }
}