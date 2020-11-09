<?php
session_start();
unset($_SESSION['login']);
header('Location: ' . $_SERVER['HTTP_REFERER']);


