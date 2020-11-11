import collectorStore from "@/js/store/collector";
import {findParent} from "@/js/utils";

class Collector {
    constructor(selector, options) {
        this.$collector = document.querySelector(selector)
        this.$buttonActivate = document.querySelector(options.buttonActivate)
        this.$counter = collectorStore.$counter
        this.$counter.textContent = collectorStore.count;
        this.flagRender = true;
        this.buttonCollectorListener();
        this.templateComponents = [
            {cpu: 'Процессор'},
            {motherboard: 'Материнская плата'},
            {cooler: 'Кулер'},
            {bp: 'Блок питания'},
            {videocard: 'Видеокарта'},
            {ram: 'Оперативная память'},
            {hdd: 'HDD-диск'},
            {ssd: 'SSD-диск'},
        ]
    }

    render() {
        if (this.flagRender) {

            const components = this.templateComponents.map(el => {
                const items = collectorStore.getItems()
                const res = items.filter(item => item.component == Object.keys(el)[0])
                el['data'] = res[0];
                return el
            })

            const itemsHTML = components.map(el => {
                let html  = ``
                if (el['data']) {
                    html = `
                        <div class="collector__item collector__item_active"
                          data-component="${el['data'].component}">
                            <img src="${el['data'].image}" alt="">
                            <h3>${el['data'].name}</h3>
                            <button class="button collector__btn-del">
                                <span class="material-icons">
                                    remove_circle_outline
                                </span>
                            </button>
                        </div>
                    `
                } else {
                    html = `
                        <div class="collector__item">
                            <p>${el[Object.keys(el)[0]]}</p>
                        </div>
                    `
                }
                return html
            }).join('')

            this.$collector.innerHTML = `
            <div class="collector__inner">
                ${itemsHTML}
            </div>
            `

            this.flagRender = false;
            this.$collector.classList.remove('collector_close')
            this.$collector.classList.add('collector_open')
            this.listenersAfterRender()
        } else {
            this.flagRender = true;
            this.$collector.classList.remove('collector_open')
            this.$collector.classList.add('collector_close')
        }
    }

    removeComponent(event) {
        const item = findParent(event.target, 'collector__item')
        collectorStore.removeItem(item.dataset['component'])
        this.flagRender = true
        this.render()
    }

    buttonCollectorListener() {
        this.$buttonActivate.addEventListener('click', this.render.bind(this))
    }

    listenersAfterRender() {
        const delButtons = document.querySelectorAll('.collector__btn-del');
        if (!delButtons.length) {
            throw new Error('.collector__btn-del не найдены')
        }
        delButtons.forEach(btn => {
            btn.addEventListener('click', this.removeComponent.bind(this))
        })
    }
}

export default Collector
