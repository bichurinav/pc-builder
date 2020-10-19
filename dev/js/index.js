import Catalog from './Catalog/Catalog';
import Admin from './Admin/Admin'
import '@/scss/style.scss'

class Main {
    constructor() {
        localStorage.setItem('page', 1);

        this.session = false;

        if (this.session) {
            this.admin = new Admin();
        }

        this.catalog = new Catalog();

        this.catalog.emit('utils', {
            findParent: this.findParent,
            changeFormatPrice: this.changeFormatPrice
        })

    }

    findParent(el, parentClass) {
        let parent = el.parentNode;
        while(!parent.classList.contains(parentClass)) {
            parent = parent.parentNode
        }
        return parent
    }



    changeFormatPrice(price) {
        let value = price.split(' ')[0]
        let symbol = price.split(' ')[1]

        function detach(count, firstPart) {
            if (firstPart) {
                return Array.from(value).filter((item, index) => {
                    return index + 1 <= count
                }).join('')
            } else {
                return Array.from(value).filter((item, index) => {
                    return index >= count
                }).join('')
            }
        }

        switch (value.length) {
            case 4:
                return `${detach(1, true)} ${detach(1)} ${symbol}`
            case 5:
                return `${detach(2, true)} ${detach(2)} ${symbol}`
            case 6:
                return `${detach(3, true)} ${detach(3)} ${symbol}`
            default:
                return price
        }
    }

}

new Main();
