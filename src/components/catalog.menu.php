<nav class="menu catalog__menu">
    <ul class="menu__inner">
        <?foreach($arrComponentList as $key => $item):?>
            <li class="menu__item">
                <a href="/?component=<?=$key?>" 
                data-genetive="<?=$item['genetive']?>" class="menu__link 
                <?=($key === $_GET['component']) ? "menu__link_active" : "" ?>">
                    <img class="menu__icon" src="./images/menu/<?=$key?>.svg" alt="">    
                    <?=$item['name']?>
                </a>
            </li>
        <?endforeach?>
    </ul>
</nav>
