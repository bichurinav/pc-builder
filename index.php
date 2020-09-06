<?php

if ($_SERVER['REQUEST_URI'] == "/") {
    header("Location: /?component=cpu", TRUE, 301);
    exit();
}
?>

<?require $_SERVER['DOCUMENT_ROOT'] . '/config.php';?>
<?require $_SERVER['DOCUMENT_ROOT'] . '/modules/database.php';?>

<?include TEMPLATE_PATH . 'header.php'?>
<div class="catalog">
    <!-- catalog-menu -->
    <?include COMPONENT . 'catalog.menu.php'?>
    <!-- ./catalog-menu -->
    <div class="catalog-content">
        <?
            $component = $_GET['component'];
            if ($res = $db->query("SELECT * FROM `$component`")) {
                while ($item = $res->fetch_assoc()) {
                    ?>
                        <div class="catalog-content__item">
                            <b><?=$item['name']?>:</b>
                            <span><?=$item['price']?> руб.</span>
                        </div>
                    <?
                }
            }

        ?>
    </div>
</div>
<?include TEMPLATE_PATH . 'footer.php'?>
