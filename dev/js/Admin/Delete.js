import {findParent, getParamURL} from '../utils';
import axios from 'axios';

class Delete {
    constructor(selector, ajaxURL) {
        this.$delButtons = document.querySelectorAll(selector);
        this.action = 'remove';
        this.ajaxURL = ajaxURL;
        this.init();
    }

    init() {
        this.$delButtons.forEach(btn => {
            btn.style.display = 'block';
            btn.addEventListener('click', this.delCardFromDB.bind(this, btn));
        })
    }

    delCardFromDB(btn) {
        const cardName =
            findParent(btn, 'card').querySelector('.card__title').textContent;

        if (confirm(`Удалить ${cardName} ?`)) {
            const component = getParamURL('component');

            let body = new FormData();
            body.append('action', this.action);
            body.append('component', component);
            body.append('cardName', cardName);

            axios.post(this.ajaxURL, body)
                .then((response) => {
                    if (!response.data) return;
                    document.location.href = `/?component=${response.data}`;
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }
}

export default Delete;
