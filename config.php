<?php
session_start();

define('DB', array(
    'host' => 'localhost',
    'name' => 'ironkit',
    'user' => 'root',
    'password' => ''
));
define('TEMPLATE_PATH', $_SERVER['DOCUMENT_ROOT'] . '/template/');
define('COMPONENT', TEMPLATE_PATH. 'components/');

$arrComponentList = array(
    'cpu' => array(
        'name' => 'Процессор',
        'genetive' => 'процессор',
        'params' => array(
            'name' => array(
                'title' => 'Название',
                'type' => 'text'
            ),
            'price' => array(
                'title' => 'Цена',
                'type' => 'number'
            ),
            'ghz' => array(
                'title' => 'Частота',
                'type' => 'number'
            )
        )
    ),
    'motherboard' => array(
        'name' => 'Материнская плата',
        'genetive' => 'материнскую плату',
        'params' => array(
            'name' => array(
                'title' => 'Название',
                'type' => 'text'
            ),
            'price' => array(
                'title' => 'Цена',
                'type' => 'number'
            ),
        )
    ),
    'cooler' => array(
        'name' => 'Кулер',
        'genetive' => 'кулер',
        'params' => array(
            'name' => array(
                'title' => 'Название',
                'type' => 'text'
            ),
            'price' => array(
                'title' => 'Цена',
                'type' => 'number'
            ),
        )
    ),
    'bp' => array(
        'name' => 'Блок питания',
        'genetive' => 'блок питания',
        'params' => array(
            'name' => array(
                'title' => 'Название',
                'type' => 'text'
            ),
            'price' => array(
                'title' => 'Цена',
                'type' => 'number'
            ),
        )
    ),
    'videocard' => array(
        'name' => 'Видеокарта',
        'genetive' => 'видеокарту',
        'params' => array(
            'name' => array(
                'title' => 'Название',
                'type' => 'text'
            ),
            'price' => array(
                'title' => 'Цена',
                'type' => 'number'
            ),
        )
    ),
    'ram' => array(
        'name' => 'Оперативная память',
        'genetive' => 'оперативную память',
        'params' => array(
            'name' => array(
                'title' => 'Название',
                'type' => 'text'
            ),
            'price' => array(
                'title' => 'Цена',
                'type' => 'number'
            ),
        )
    ),
    'hdd' => array(
        'name' => 'HDD-диск',
        'genetive' => 'HDD-диск',
        'params' => array(
            'name' => array(
                'title' => 'Название',
                'type' => 'text'
            ),
            'price' => array(
                'title' => 'Цена',
                'type' => 'number'
            ),
        )
    ),
    'ssd' => array(
        'name' => 'SSD-диск',
        'genetive' => 'SSD-диск',
        'params' => array(
            'name' => array(
                'title' => 'Название',
                'type' => 'text'
            ),
            'price' => array(
                'title' => 'Цена',
                'type' => 'number'
            ),
        )
    ),
);

$_SESSION['components'] = $arrComponentList;