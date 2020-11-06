<?php
require 'database.php';

class Component
{
    public $action;
    public $component;
    public $params;
    private $DB;

    public function __construct($arData, $DB)
    {
        $this->DB = $DB;
        $this->action = $arData['action'];
        $this->component = $arData['component'];
        $this->limit = ($arData['limit']) ? $arData['limit'] : 0;
        $this->imagesPath = '../images';
        unset($arData['action']);
        unset($arData['component']);
        $this->params = $arData;
    }



    public function Add()
    {

        // Проверяет значения на пустоту
        function checkEmptyVal($el) {
            return ($el) ? $el : null;
        }

        $checkedParams = array_filter($this->params, "checkEmptyVal");
        if ($this->params === $checkedParams) {
            // Выгружаем картинку в папку
            if ($_FILES) {

                if (is_uploaded_file($_FILES['image']['tmp_name'])) {
                    $imageName = basename($_FILES['image']['name']);

                    $imagePath = "$this->imagesPath/$this->component/$imageName";
                    $imageDir = "$this->imagesPath/$this->component";
                    $image = "$this->imagesPath/$this->component/$imageName";

                    if (!is_dir($imageDir)) {
                        mkdir($imageDir);
                    }

                    move_uploaded_file($_FILES['image']['tmp_name'], $imagePath);
                }
            }

            $name = $this->params['name'];
            // $this->params['Цена'] = $this->params['Цена'] . " ₽";
            unset($this->params['name']);
            $params = json_encode($this->params, JSON_UNESCAPED_UNICODE);

            // Проверяем на существование компонента в таблице (база-данных)
            $checkName = $this->DB->query("SELECT * FROM $this->component WHERE name = '$name'");
            if (!$checkName->fetch_assoc()) {
                // Добавляем компонент в таблицу (база-данных)
                if ($input_component = $this->DB->prepare("INSERT INTO $this->component VALUES (NULL, ?, ?, ?)")) {
                    $input_component->bind_param('sss', $name, $params, $image);
                    $input_component->execute();
                    $input_component->close();
                    echo $this->component;
                }
            } else {
                echo false;
            }
            $this->DB->close();
        }
    }

    public function Remove()
    {
         $name = $this->params['cardName'];
         $res = $this->DB->query("DELETE FROM $this->component WHERE name = '$name'");
         if ($res) {
            echo $this->component;
         }
    }

    public function Load()
    {
        // Удаляем неиспользуемые изображения в папке
        function removeUnusedImages($component, $db) {
            $arImagesFromDB = [];
            // Получаем все изображения из таблицы (база-данных)
            $query = "SELECT `image` from $component";
            if ($res = $db->query($query)) {
                while ($image = $res->fetch_assoc()) {
                    $imageName = explode('/', $image['image'])[count(explode('/', $image['image'])) - 1];
                    $arImagesFromDB[] = $imageName;
                }
            }
            // Удаляем изображения, которые не совпадают с таблицей (база-данных)
            $src = $_SERVER['DOCUMENT_ROOT'];
            $imagesPath = "$src/images/$component";
            foreach (scandir($imagesPath) as $img) {
                if ($img != '.' && $img != '..') {
                    if (!in_array($img, $arImagesFromDB)) {
                        unlink($imagesPath . "/$img");
                    }
                }
            }
        }

        removeUnusedImages($this->component, $this->DB);
        
        if ($this->params['filter']) {
            $output_components = $this->DB->query("SELECT * FROM `$this->component`");
        } else {
            $output_components = $this->DB->query("SELECT * FROM `$this->component` LIMIT $this->limit");
        }

        if ($output_components) {
            while($row = $output_components->fetch_assoc()) {   
                $arResult['params'] = $row['params'];
                $arResult['id'] = $row['id'];
                $arResult['name'] = $row['name'];
                $arResult['image'] = $row['image'];
                // Формирование всех компонентов
                $data['items'][] = $arResult;
            }

            if ($this->params['filter'] && $data['items']) {
                $filter = array_filter($data['items'], function($el) {
                    //$arParams = json_decode($el['params'], true);
                    $search = $this->params['filter'];
                    
                    $arr = explode(' ', $search);

                    if (count($arr) > 1) {
                        foreach($arr as $item) {
                            if (preg_match("/$item/i", $el['name'])) {
                                return $el;
                            } 
                        }
                    } else {
                        return preg_match("/$search/i", $el['name']);
                    }
                });
                
                $data['items'] = [];
                $data['filter'] = true;

                foreach($filter as $el) {
                    $data['items'][] = $el;
                }
            }

            // Кол-во элементов в таблице (база-данных)
            $countRow = $this->DB->query("SELECT COUNT(*) FROM `$this->component`");
            $data['count'] = mysqli_fetch_array($countRow)[0];

            // Отправляем на клиент сформированные компоненты и кол-во элементов в таблице (база-данных)
            echo ($data['items'] && $data['count']) ? json_encode($data) : json_encode(false);
        }
    }
}
//file_put_contents(__DIR__ + '/', var_export($filter, true));

$component = new Component($_POST, $mysqli);

switch ($component->action) {
    case 'add':
        $component->Add();
        break;
    case 'load':
        $component->Load();
        break;
    case 'remove':
        $component->Remove();
        break;
    default:
        return;
        break;
}
