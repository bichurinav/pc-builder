import Admin from './Admin/Admin';
import Catalog from '@/js/Catalog/Catalog';
import Auth from '@/js/Auth/Auth';
import '@/scss/style.scss';

class App {
    constructor() {
        localStorage.setItem('page', '1');

        new Catalog('.cards', {
            showComponents: 6,
            imagesPath: 'images',
            ajaxURL: 'modules/Component.php'
        });

        new Auth('auth', {
            buttonActivate: '.button_auth',
            parent: '.page',
            ajaxURL: 'modules/Component.php'
        });

        new Admin('.admin-panel', {
            ajaxURL: '../modules/Component.php'
        });
    }
}

new App();
