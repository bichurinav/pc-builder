<?php
require 'database.php';
class Component
{
    public $action;
    public $component;
    public $params;
    private $mysqli;

    public function __construct($arData, $DB)
    {
        $this->action = $arData['action'];
        $this->component = $arData['component'];
        unset($arData['action']);
        unset($arData['component']);
        $this->params = $arData;
        $this->mysqli = $DB;
    }

    public function Add() {
        
        function checkEmptyVal($el) {
            return ($el) ? $el : null;
        }

        $checkedParams = array_filter($this->params, "checkEmptyVal");
        if ($this->params === $checkedParams) {
            
            $name = $this->params['name'];
            $params = json_encode($this->params);

            $checkName = $this->mysqli->query("SELECT * FROM $this->component WHERE name = '$name'");
            if (!$checkName->fetch_assoc()) {
                if ($input_component = $this->mysqli->prepare("INSERT INTO $this->component VALUES (NULL, ?, ?)")) {
                    $input_component->bind_param('ss', $name, $params);
                    $input_component->execute();
                    $input_component->close();
                    echo $this->component;
                }
            }
            $this->mysqli->close();
        }
    }
    public function Load() {
        if ($output_components = $this->mysqli->query("SELECT * FROM `$this->component`")) {
            while($row = $output_components->fetch_assoc()) {
                $data['items'][] = json_decode($row['params'], true);
            }
            echo ($data['items']) ? json_encode($data) : json_encode(false);
        }
    }
}

$component = new Component($_POST, $mysqli);

switch ($component->action) {
    case 'add':
        $component->Add();
        break;
    case 'load':
        $component->Load();
        break;
    default:
        return;
        break;
}
