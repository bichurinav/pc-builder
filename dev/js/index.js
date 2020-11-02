import Admin from './Admin/Admin'
import Catalog from "@/js/Catalog/Catalog";
import '@/scss/style.scss'

class Main {
    constructor() {
        localStorage.setItem('page', 1);
        this.session = false;

        if (this.session) {
            new Admin();
        }

        new Catalog('.catalog-content', {
            showComponents: 6,
            imagesPath: 'images',
            ajaxURL: 'modules/Component.php'
        });


    }



}

new Main();
