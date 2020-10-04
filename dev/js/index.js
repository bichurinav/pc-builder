import Catalog from './Catalog/Catalog';
import Admin from './Admin/Admin'
import Events from 'events';


class Main extends Events {
    constructor() {
        super()
        localStorage.setItem('page', 1);
        this.session = true;
        if (this.session) {
            this.admin = new Admin();
        }
        this.catalog = new Catalog();
    }

}

new Main();
