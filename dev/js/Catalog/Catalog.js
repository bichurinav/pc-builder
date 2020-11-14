import Cards from '@/js/Catalog/Cards';
import {getParamURL} from '@/js/utils';
import axios from 'axios';

class Catalog {
    constructor(selector, options) {
        this.$el = document.querySelector(selector);
        this.ajaxURL = options.ajaxURL;
        this.showComponents = options.showComponents;
        this.imagesPath = options.imagesPath;
        this.delayData = 200;
        this.cardsOptions = {
            catalog: this.$el,
            imagesPath: this.imagesPath,
            show: this.showComponents,
            getComponents: this.getComponents
        }
        this.cards = new Cards(this.cardsOptions)
        this.getComponents()
        this.search()
    }

    getComponents(show = this.showComponents, search = null) {
        let body = new FormData();
        body.append('action','load');
        body.append('component', getParamURL('component'))
        body.append('limit', show)
        if (search) {
            body.append('search', search)
        }

        this.preloader(true)

        axios.post(this.ajaxURL, body)
            .then((response) => {
                const data = response.data
                setTimeout(() => {
                    this.preloader(false)

                    this.cards = new Cards({
                        ...this.cardsOptions,
                        cards: data.items,
                        count: data.count,
                        filter: data.filter || false,
                        ajaxURL: this.ajaxURL,
                    })

                    this.cards.render()

                    this.cards.on('getComponents',
                        (show) => this.getComponents(show))

                    if (!data.filter) {
                        document.body.scrollIntoView(false)
                    }

                }, this.delayData)
            })
            .catch(() => {
                this.preloader(false)
                this.cards.render()
            })
    }

    search() {
        if (document.querySelector('.menu__link_active')) {
            this.$formSearch = document.querySelector('#search');
            this.$search = this.$formSearch.querySelector('.search__input');
            this.$activeMenuLink = document.querySelector('.menu__link_active')
            const placeholder = this.$activeMenuLink.dataset['genetive']
            this.$search.setAttribute('placeholder', `Найти ${placeholder}...`)

            this.$formSearch.addEventListener('submit', (event) => {
                event.preventDefault()
                const val = this.$search.value
                if (val !== '') {
                    const str = val.replace(/[^a-zа-я0-9\s]/gi, "")
                    if (str.length > 1) {
                        this.getComponents(null, str)
                    } else {
                        alert('Ваш запрос содержит менее 2 символов.')
                        return
                    }
                }
            })

            this.$search.addEventListener('input', (event) => {
                const val = event.target.value
                if (val === '') {
                    this.getComponents()
                }
            })
        }
    }

    preloader(flag) {
        if (flag) {
            this.$el.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; display: block; shape-rendering: auto;" width="197px" height="197px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
            <circle cx="50" cy="50" r="0" fill="none" stroke="#0051a2" stroke-width="2">
            <animate attributeName="r" repeatCount="indefinite" dur="1.2987012987012987s" values="0;35" keyTimes="0;1" keySplines="0 0.2 0.8 1" calcMode="spline" begin="-0.6493506493506493s"></animate>
            <animate attributeName="opacity" repeatCount="indefinite" dur="1.2987012987012987s" values="1;0" keyTimes="0;1" keySplines="0.2 0 0.8 1" calcMode="spline" begin="-0.6493506493506493s"></animate>
            </circle>
            <circle cx="50" cy="50" r="0" fill="none" stroke="#1b75be" stroke-width="2">
            <animate attributeName="r" repeatCount="indefinite" dur="1.2987012987012987s" values="0;35" keyTimes="0;1" keySplines="0 0.2 0.8 1" calcMode="spline"></animate>
            <animate attributeName="opacity" repeatCount="indefinite" dur="1.2987012987012987s" values="1;0" keyTimes="0;1" keySplines="0.2 0 0.8 1" calcMode="spline"></animate>
            </circle>
            </svg>
        `
        } else {
            this.$el.innerHTML = ''
        }
    }

}

export default Catalog
