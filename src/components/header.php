<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./template/style.css">
    <link href="https://fonts.googleapis.com/css2?family=Material+Icons"
          rel="stylesheet">
    <title>Document</title>
</head>
<body>

        <!-- catalog-menu -->
        <?
            if ($_SESSION['admin']) {
                include COMPONENT . 'admin.php';
            }
        ?>
         <div class="page">
            <header class="page__header header">
            <div class="container">
                    <h1>Header</h1>
            </div>
            </header>
            <main class="page__content content">
                <div class="content__container container">
