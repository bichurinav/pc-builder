<?require $_SERVER['DOCUMENT_ROOT'] . '/modules/database.php';?>
<?
if ($_SERVER['REQUEST_URI'] == "/") {
    header("Location: /?component=cpu", TRUE, 301);
    exit();
}
?>
<?include TEMPLATE_PATH . 'header.php'?>
<div class="catalog">
    <!-- catalog-menu -->
    <?include COMPONENT . 'catalog.menu.php'?>
    <!-- catalog-components -->
    <?include COMPONENT . 'catalog.items.php'?>
</div>
<?include TEMPLATE_PATH . 'footer.php'?>
