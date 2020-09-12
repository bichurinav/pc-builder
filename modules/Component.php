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

            if ($_FILES) {
                if (is_uploaded_file($_FILES['image']['tmp_name'])) {
                    $imageName = basename($_FILES['image']['name']);
                    $imagePath = $_SERVER['DOCUMENT_ROOT'] . "/template/images/$this->component/$imageName";
                    $imageDir = $_SERVER['DOCUMENT_ROOT'] . "/template/images/$this->component";
                    $image = "/template/images/$this->component/$imageName";
                    if (!is_dir($imageDir)) {
                        mkdir($imageDir);
                    }
                    move_uploaded_file($_FILES['image']['tmp_name'], $imagePath);
                }
            }
            
            $name = $this->params['name'];
            $this->params['Цена'] = $this->params['Цена'] . " ₽";
            unset($this->params['name']);
            $params = json_encode($this->params);

            $checkName = $this->mysqli->query("SELECT * FROM $this->component WHERE name = '$name'");
            if (!$checkName->fetch_assoc()) {
                if ($input_component = $this->mysqli->prepare("INSERT INTO $this->component VALUES (NULL, ?, ?, ?)")) {
                    $input_component->bind_param('sss', $name, $params, $image);
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
            
            $arImagesFromDB = [];

            while($row = $output_components->fetch_assoc()) {
                $arResult = json_decode($row['params'], true);
                $arResult['id'] = $row['id'];
                $arResult['name'] = $row['name'];
                $arResult['image'] = $row['image'];
                // Формирование всех компонентов
                $data['items'][] = $arResult;
                // Получаем изображения из базы данных
                $imageName = explode('/', $row['image'])[count(explode('/', $row['image'])) - 1];
                $arImagesFromDB[] = $imageName;
            }
            // Удаляем изображения, которые не совпадают с базой данных
            $imagesPath = $_SERVER['DOCUMENT_ROOT'] . "/template/images/$this->component";
            foreach (scandir($imagesPath) as $img) {
                if ($img != '.' && $img != '..') {
                    if (!in_array($img, $arImagesFromDB)) {
                        unlink($imagesPath . "/$img");
                    }
                }
            }
            // Отправляем на клиент сформированные компоненты
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
