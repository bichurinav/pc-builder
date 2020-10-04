<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./template/style.css">
    <title>Document</title>
</head>
<body>
    <div class="page">
        <!-- catalog-menu -->
        <?
            if ($_SESSION['admin']) {
                include COMPONENT . 'admin.php';
            }
        ?>
        <header class="page__header header">
            
        </header>
        <main class="page__content content">
            <div class="content__container container">