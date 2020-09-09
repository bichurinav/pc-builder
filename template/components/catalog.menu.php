<nav class="catalog-menu">
    <ul class="catalog-menu__inner">
        <?foreach($arrComponentList as $key => $item):?>
            <li class="catalog-menu__item">
                <a href="/?component=<?=$key?>" class="catalog-menu__link"><?=$item['name']?></a>
            </li>
        <?endforeach?>
    </ul>
</nav>