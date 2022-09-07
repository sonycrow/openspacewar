<?php
declare(strict_types=1);

abstract class SectionController {

    private string $name;

    protected string $lang;
    protected array $codex;
    protected array $skills;
    protected array $traits;

    /**
     * SectionController constructor.
     * @param string $name Nombre de la sección
     */
    function __construct(string $name)
    {
        $this->name = strtolower(trim($name));

        $this->lang   = $_REQUEST['lang'] ?? "es";
        $this->codex  = json_decode(file_get_contents(ROOT . "/src/storage/osw_codex.json"), true)['card'];
        $this->skills = json_decode(file_get_contents(ROOT . "/src/storage/osw_skills.json"), true)['skill'];
        $this->traits = json_decode(file_get_contents(ROOT . "/src/storage/osw_traits.json"), true)['trait'];
    }

    /**
     * @return array Devuelve una colección con los valores de esta sección para la vista
     */
    abstract public function getRenderVars(): array;
}