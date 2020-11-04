import Cards from "@/js/Catalog/Cards";
import EventEmitter from 'events'
import {getParamURL} from "@/js/utils";

class Catalog {
    constructor(selector, options) {
        this.$el = document.querySelector(selector)
        this.ajaxURL = options.ajaxURL
        this.showComponents = options.showComponents
        this.imagesPath = options.imagesPath
        this.delayData = 500
        this.optionsCards = {
            catalog: this.$el,
            imagesPath: this.imagesPath,
            show: this.showComponents,
            getComponents: this.getComponents
        }
        this.cards = new Cards(this.optionsCards)
        this.getComponents()

    }

    getComponents(offset = 0) {
        let body = new FormData();
        body.append('action','load');
        body.append('component', getParamURL('component'))
        body.append('offset', offset)
        body.append('limit', this.showComponents)

        this.preloader(true)

        const req = fetch(this.ajaxURL, {
            method: 'POST',
            body
        })
        req.then(data => data.json())
            .then(data => {
                setTimeout(() => {
                    this.preloader(false)

                    this.cards = new Cards({
                        ...this.optionsCards,
                        cards: data.items,
                        count: data.count,
                    })
                    this.cards.render()
                    this.cards.on('getComponents',
                        (offset) => this.getComponents(offset))

                }, this.delayData)
            })
            .catch(() => {
                this.preloader(false)
                this.cards.render()
            })
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
