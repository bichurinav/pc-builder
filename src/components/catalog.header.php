<div class="catalog-header">
    <div class="catalog-header__inner">
        <a href="/" class="catalog-header__logo logo">
            <img src="./images/logo.svg" alt="" class="logo__img">
        </a>

        <form id="search" class="catalog-header__search search">
            <input class="search__input" id="test" type="text">
            <button class="search__btn">
                <span class="search__icon material-icons">
                    search
                </span>
            </button>
        </form>

        <button class="button button_icon catalog-header__btn-filter">
            <span class="catalog-header-btn__title">Фильтр</span>
            <img class="catalog-header-btn__img" src="./images/filter.svg" alt="">
        </button>

        <button class="button button_icon collector-btn">
            <span class="collector-btn__count">0</span>
            <span class="collector-btn__title">Сборщик</span>
            <img class="collector-btn__img" src="./images/box.svg" alt="">
        </button>

        <div class="catalog-header__user"><?=$_SESSION['login']?></div>

        <?if ($_SESSION['login']):?>
            <a href="/exit.php" class="button_exit catalog-header__auth ">
                <span class="auth-icon material-icons">
                    directions_run
                </span>
            </a>
        <?else:?>
            <button class="button button_auth catalog-header__auth">
                <span class="auth-icon material-icons">
                    login
                </span>
            </button>
         <?endif?>
    </div>
</div>
