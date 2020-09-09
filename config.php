<?php

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
        'params' => array(
            'name',
            'price'
        )
    ),
    'motherboard' => array(
        'name' => 'Материнская плата',
        'params' => array(
            'name',
            'price'
        )
    ),
    'cooler' => array(
        'name' => 'Кулер',
        'params' => array(
            'name',
            'price'
        )
    ),
    'bp' => array(
        'name' => 'Блок питания',
        'params' => array(
            'name',
            'price'
        )
    ),
    'videocard' => array(
        'name' => 'Видеокарта',
        'params' => array(
            'name',
            'price'
        )
    ),
    'ram' => array(
        'name' => 'Оперативная память',
        'params' => array(
            'name',
            'price'
        )
    ),
    'hdd' => array(
        'name' => 'HDD-диск',
        'params' => array(
            'name',
            'price'
        )
    ),
    'ssd' => array(
        'name' => 'SSD-диск',
        'params' => array(
            'name',
            'price'
        )
    ),
);