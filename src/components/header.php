<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./template/style.css">
    <link href="https://fonts.googleapis.com/css2?family=Material+Icons"
          rel="stylesheet">
    <script>
        // FOR IE
        var ua = window.navigator.userAgent.toLowerCase()
        var isIE = (/trident/gi).test(ua) || (/msie/gi).test(ua)
        if (isIE) {
            window.location.href = 'http://bestvpn.org/outdatedbrowser/ru'
        }
    </script>
    <title>Document</title>
</head>
<body>
        <!-- catalog-menu -->
        <?
            if ($_SESSION['login'] === 'admin') {
                include COMPONENT . 'admin.php';
            }
        ?>
         <div class="page">
            <header class="page__header header">
                <div class="container">
                    <div class="header__inner">
                        <? /* <a href="/" class="header__logo logo">
                            <img src="./images/logo.svg" alt="" class="logo__img">
                        </a>
                        <?if ($_SESSION['admin']):?>
                            <a href="/exit.php" class="header__btn-exit">
                                <span class="auth-icon material-icons">
                                    directions_run
                                </span>
                            </a>
                        <?else:?>
                            <button class="button header__btn-auth">
                                <span class="auth-icon material-icons">
                                    login
                                </span>
                            </button>
                        <?endif?>
                            */?>
                    </div>
                </div>
            </header>
            <main class="page__content content">
                <div class="content__container container">
