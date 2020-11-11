import {findParent, changeFormatPrice} from "@/js/utils";
import collectorStore from "@/js/store/collector";
import Pagination from "@/js/Catalog/Pagination";
import Delete from "@/js/Admin/Delete";
import PriceChange from "@/js/Admin/PriceChange";
import EventEmitter from 'events'
import Collector from "@/js/Catalog/Collector";

class Cards extends EventEmitter {
    constructor(options) {
        super()
        this.$catalog = options.catalog
        this.components = options.cards
        this.count = options.count
        this.show = options.show
        this.imagesPath = options.imagesPath
        this.ajaxURL = options.ajaxURL
        this.filter = options.filter
        this.pagination = new Pagination({
            count: this.count,
            show: this.show,
            catalog: this.$catalog
        })
    }

    render() {
        if (Array.isArray(this.components)) {
            this.componentsHTML = this.components.map((component) => {
                const params = JSON.parse(component['params']);

                let $params = []
                for (let key in params) {
                    $params.push(`<div class="card__prop"><b>${key.replaceAll('_', ' ')}</b>: ${params[key]}</div>`);
                }
                const previewParams = $params.filter((el, i) => i <= 2)

                return `
                <div class="card catalog-content__item">
                    <div class="card__img">
                        <img width="100" src="${component['image']}">
                    </div>
                    <div class="card__content">
                        <h2 class="card__title">${component['name']}</h2>
                        <div class="card__preview-props">
                             ${previewParams.join('')}
                            <button class="button card__btn-more">
                                ${screen.width < 450 ? 'Характеристики' : 'Все характеристики'}
                            </button>
                        </div>
                        <span class="card__price">
                            <input class="card__changePrice" type="number" value="${component['price']}"/>
                            <span>&asymp; ${changeFormatPrice(component['price'], '₽')}</span>
                        </span>
                    </div>
                    <button class="button card__btn-box">
                        <img src="${this.imagesPath}/box.svg">
                    </button>
                    <div class="card__props">
                        <div class="card__props-inner">
                            ${$params.join('')}
                            
                        </div>
                        <button class="button card__props-close">&#10006;</button>
                    </div>
                    <button class="button card__del">
                        <span class="material-icons">
                            backspace
                        </span>
                    </button>
                </div>
                `
            }).join('')
        } else {
            this.componentsHTML = `<h2>Пусто :(</h2>`
        }

        this.$catalog.insertAdjacentHTML('afterbegin', `
            <div class="catalog-content-items">
                 ${this.componentsHTML}
            </div>
        `);

        window.addEventListener('resize', () => {
            let moreButtons =  document.querySelectorAll('.card__btn-more')
            moreButtons.forEach((btn) => {
                btn.textContent = screen.width < 425 ? 'Характеристики' : 'Все характеристики'
            })
        })

        // properties action
        this.btnsProps = document.querySelectorAll('.card__btn-more');
        this.btnsProps.forEach(btn => {
            btn.addEventListener('click', this.showProps.bind(this))
        })

        // admin action
        if (document.querySelector('.admin-panel')) {
            new Delete('.card__del', this.ajaxURL);
            new PriceChange('.card__changePrice',
                '.card__price span', this.ajaxURL);
        }

        //collector action
        this.collector = new Collector('.collector', {
            buttonActivate: '.collector-btn',
        });
        this.collectorAction()

        if (!this.filter) {
            if (this.count > this.show) {
                this.pagination.render()
                this.pagination.on('getComponents', (offset) => this.emit('getComponents', offset))
            }
        }

    }

    collectorAction() {
        this.$boxexButtons = document.querySelectorAll('.card__btn-box');
        this.$boxexButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const parent = findParent(btn, 'card');
                const name = parent.querySelector('.card__title').textContent;
                const component = this.components.filter(el => el.name === name)[0] // object
                collectorStore.addItem(component)
                if (!this.collector.flagRender) {
                    this.collector.flagRender = true;
                    this.collector.render()
                }
            })
        })
    }

    showProps(event) {
        const btn = event.target
        const blockProps = findParent(btn, 'card').querySelector('.card__props');
        blockProps.style.display = "flex";
        const card = findParent(blockProps, 'catalog-content__item');
        card.addEventListener('click', this.closeProps.bind(this, blockProps))
    }

    closeProps(blockProps, event) {
        if (event.target.classList.contains('card__props-close')) {
            blockProps.style.display = "none";
        }
    }

}

export default Cards;
