<?php
require $_SERVER['DOCUMENT_ROOT'] . '/config.php';

$mysqli = new mysqli(
    DB['host'],
    DB['user'],
    DB['password'],
    DB['name']
);

if ($mysqli->connect_error) {
    die('Connect Error (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error);
}
