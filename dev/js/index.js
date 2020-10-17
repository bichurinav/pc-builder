import Catalog from './Catalog/Catalog';
import Admin from './Admin/Admin'

class Main {
    constructor() {
        localStorage.setItem('page', 1);

        this.session = false;

        if (this.session) {
            this.admin = new Admin();
        }

        this.catalog = new Catalog();

        this.catalog.emit('utils', {
            findParent: this.findParent
        })

    }

    findParent(el, parentClass) {
        let parent = el.parentNode;
        while(!parent.classList.contains(parentClass)) {
            parent = parent.parentNode
        }
        return parent
    }
    
}

new Main();
