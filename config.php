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
    'cpu' => 'Процессор',
    'motherboard' => 'Материнская плата',
    'cooler' => 'Кулер',
    'bp' => 'Блок питания',
    'videocard' => 'Видеокарта',
    'ram' => 'Оперативная память',
    'hdd' => 'HDD-диск',
    'ssd' => 'SSD-диск',
);