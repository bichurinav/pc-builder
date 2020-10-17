<?
if ($_SERVER['REQUEST_URI'] == "/") {
    header("Location: /?component=cpu", TRUE, 301);
    exit();
}
?>
<?session_start()?>
<?
    $_SESSION['admin'] = false
?>
<?require $_SERVER['DOCUMENT_ROOT'] . '/modules/database.php';?>
<?include TEMPLATE_PATH . 'header.php'?>
<div class="catalog">
    <!-- catalog-menu -->
    <?include COMPONENT . 'catalog.menu.php'?>
    <!-- catalog-components -->
    <div class="catalog-content">
    </div>
</div>
<?include TEMPLATE_PATH . 'footer.php'?>
