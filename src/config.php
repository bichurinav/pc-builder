<?php
session_start();

define('DB', array(
    'host' => 'localhost',
    'name' => 'ironkit',
    'user' => 'root',
    'password' => ''
));

define('COMPONENT', 'components/');
define('MODULES', 'modules/');

$arrComponentList = array(
    'cpu' => array(
        'name' => 'Процессор',
        'genetive' => 'процессор',
        'params' => array(
            'name' => array(
                'title' => 'Название',
                'type' => 'text'
            ),
            'Цена' => array(
                'title' => 'Цена',
                'type' => 'text'
            ),
            'Частота' => array(
                'title' => 'Частота',
                'type' => 'text'
            ),
            'Количество ядер' => array(
                'title' => 'Количество ядер',
                'type' => 'number'
            ),
            'Гнездо процессора' => array(
                'title' => 'Гнездо процессора',
                'type' => 'text'
            ),
            'Поддержка частот памяти' => array(
                'title' => 'Поддержка частот памяти',
                'type' => 'text'
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
            'Цена' => array(
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
