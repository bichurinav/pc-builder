import {findParent, getParamURL} from '../utils';
import axios from 'axios';

class PriceChange {
    constructor(fields, prices, ajaxURL) {
        this.$fields = document.querySelectorAll(fields);
        this.$prices = document.querySelectorAll(prices);
        this.ajaxURL = ajaxURL;
        this.action = 'changePrice';
        this.init();
    }

    init() {
        for (let i = 0; i < this.$prices.length; i++) {
            this.$fields[i].style.display = "inline";
            this.$prices[i].style.display = "none";
            this.listenerFieldPrice(this.$fields[i]);
        }
    }

    listenerFieldPrice(field) {
        field.addEventListener('change', this.changePrice.bind(this));
    }

    changePrice(event) {
        const val = event.target.value
        if (val && val !== '0' && val.length < 7) {
            const parent = findParent(event.target, 'card');
            const name = parent.querySelector('.card__title').textContent;
            let body = new FormData();
            body.append('action', this.action);
            body.append('component', getParamURL('component'));
            body.append('newPrice', val);
            body.append('name', name);

            axios.post(this.ajaxURL, body)
                .then((response) => {
                    if (!response.data) return;
                    document.location.href = `/?component=${response.data}`;
                })
                .catch((error) => {
                    console.log(error);
                })

        } else {
            return;
        }
    }
}

export default PriceChange;
