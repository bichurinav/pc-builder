<?session_start()?>
<?
if ($_SERVER['REQUEST_URI'] == "/") {
    header("Location: /?component=cpu", TRUE, 301);
    exit();
}
?>

<?
    $_SESSION['admin'] = false
?>

<?require 'config.php'?>
<?require MODULES . 'database.php';?>

<?include COMPONENT . 'header.php'?>
<div class="catalog">
    <!-- catalog-menu -->
    <?include COMPONENT . 'catalog.menu.php'?>
    <!-- catalog-components -->
    <div class="catalog-content"></div>
</div>
<?include COMPONENT . 'footer.php'?>
