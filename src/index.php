<?
    session_start();

    if ($_SERVER['REQUEST_URI'] == "/") {
        header("Location: /?component=cpu", TRUE, 301);
        exit();
    }

    require 'config.php';

?>


<!-- COMPONENTS -->
<?include COMPONENT . 'header.php'?>
<?include COMPONENT . 'catalog.php'?>
<?include COMPONENT . 'footer.php'?>
<!-- ./COMPONENTS -->
