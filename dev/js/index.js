import Admin from './Admin/Admin'
import Catalog from "@/js/Catalog/Catalog";
import '@/scss/style.scss'

class Main {
    constructor() {
        localStorage.setItem('page', 1);
        new Admin('.admin-panel', {
            ajaxURL: '../modules/Component.php'
        });
        new Catalog('.catalog-content', {
            showComponents: 6,
            imagesPath: 'images',
            ajaxURL: 'modules/Component.php'
        });


    }



}

new Main();
