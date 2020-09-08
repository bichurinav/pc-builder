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