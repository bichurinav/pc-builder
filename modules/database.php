<?php
require $_SERVER['DOCUMENT_ROOT'] . '/config.php';

$db = new mysqli(
    DB['host'], 
    DB['user'],
    DB['password'],
    DB['name']
);

if ($db->connect_error) {
    die('Connect Error (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error);
}