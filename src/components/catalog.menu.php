<nav class="menu catalog__menu">
    <ul class="menu__inner">
        <?foreach($arrComponentList as $key => $item):?>
            <li class="menu__item">
                <?if ($key === $_GET['component']):?>
                    <a href="/?component=<?=$key?>" class="menu__link menu__link_active"><?=$item['name']?></a>
                <?else:?>
                    <a href="/?component=<?=$key?>" class="menu__link menu__link"><?=$item['name']?></a>
                <?endif?>
            </li>
        <?endforeach?>
    </ul>
</nav>