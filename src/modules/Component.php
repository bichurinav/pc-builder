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

    public function Auth()
    {
        $login = $this->params['login'];
        $password = $this->params['password'];
        $resLogin = $this->DB->query("SELECT * FROM users WHERE login = '$login'");

        if ($this->params['type'] === 'auth') {

            if ($row = $resLogin->fetch_assoc()) {
                $hash = $row['password'];
                if (password_verify($password, $hash)) {
                    $_SESSION['login'] = $login;
                    // USER IS AUTH
                    echo 'auth';
                } else {
                    // USER INVALID
                    echo 'Неверный логин или пароль';
                }
            } else {
                // USER NOT EXIST
                echo 'Неверный логин или пароль';
            }
        } else {
            if (!$resLogin->fetch_assoc()) {
                if ($input_user = $this->DB->prepare("INSERT INTO `users` VALUES (NULL, ?, ?)")) {
                    $password_hash = password_hash($password, PASSWORD_DEFAULT);
                    $input_user->bind_param('ss', $login, $password_hash);
                    $input_user->execute();
                    $input_user->close();
                    $_SESSION['login'] = $login;
                    // USER IS REGISTER
                    echo 'auth';
                }
            } else {
                // USER EXIST
                echo 'Такой пользователь существует';
            }
        }
    }

    public function Add()
    {

        if ($_SESSION['login'] === 'admin') {
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
                $price = (int)$this->params['Цена'];
                unset($this->params['name']);
                unset($this->params['Цена']);

                $params = json_encode($this->params, JSON_UNESCAPED_UNICODE);

                // Проверяем на существование компонента в таблице (база-данных)
                $checkName = $this->DB->query("SELECT * FROM $this->component WHERE name = '$name'");
                if (!$checkName->fetch_assoc()) {
                    // Добавляем компонент в таблицу (база-данных)
                    if ($input_component = $this->DB->prepare("INSERT INTO $this->component VALUES (NULL, ?, ?, ?, ?)")) {
                        $input_component->bind_param('siss', $name, $price, $params, $image);
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
    }

    public function Remove()
    {
        if ($_SESSION['login'] === 'admin') {
            $name = $this->params['cardName'];
            $res = $this->DB->query("DELETE FROM $this->component WHERE name = '$name'");
            if ($res) {
                echo $this->component;
            }
        }
    }

    public function changePrice()
    {
        if ($_SESSION['login'] === 'admin') {
            $price = $this->params['newPrice'];
            $name = $this->params['name'];
            $res = $this->DB->query("UPDATE $this->component SET price = '$price' WHERE name = '$name'");
            if ($res) {
                echo $this->component;
            }
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

        if ($this->params['search']) {
            $output_components = $this->DB->query("SELECT * FROM `$this->component`");
        } else {
            $output_components = $this->DB->query("SELECT * FROM `$this->component` LIMIT $this->limit");
        }

        if ($output_components) {
            while($row = $output_components->fetch_assoc()) {
                $arResult['component'] = $this->component;
                $arResult['params'] = $row['params'];
                $arResult['id'] = $row['id'];
                $arResult['name'] = $row['name'];
                $arResult['price'] = $row['price'];
                $arResult['image'] = $row['image'];
                // Формирование всех компонентов
                $data['items'][] = $arResult;
            }

            // Вернуть компоненты, которые совпадают с поиском
            if ($this->params['search'] && $data['items']) {

                $flag = true;

                $filter = array_filter($data['items'], function($el) {
                    global $flag;

                    $search_word = $this->params['search'];
                    $arSearch_word = explode(' ', $search_word);
                    $name = $el['name'];

                    if (count($arSearch_word) > 1 && $arSearch_word[1] !== '') {

                        if (preg_match("/$name/i", $search_word)) {
                            $flag = false;
                            return $el;
                        }

                        if ($flag) {
                            foreach($arSearch_word as $item) {
                                if (preg_match("/$item/i", $name)) {
                                    return $el;
                                }
                            }
                        }

                    } else {
                        return preg_match("/$search_word/i", $name);
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
    case 'auth':
        $component->Auth();
        break;
    case 'add':
        $component->Add();
        break;
    case 'load':
        $component->Load();
        break;
    case 'remove':
        $component->Remove();
        break;
    case 'changePrice':
        $component->changePrice();
        break;
    default:
        return;
        break;
}
