import collectorStore from "@/js/store/collector";

class Collector {
    constructor(selector, options) {
        this.$collector = document.querySelector(selector)
        this.$buttonActivate = document.querySelector(options.buttonActivate)
        this.$counter = collectorStore.$counter
        this.$counter.textContent = collectorStore.count;
        this.flagRender = true;
        this.click = false;
        this.addEventListener();
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
            if (collectorStore.count == 0) {
                alert('Сборщик пуст, положите комплектующие');
                return
            } else {
                const itemsHTML = this.templateComponents.map(el => {
                    return `
                    <div class="collector__item">
                        <h3>${el[Object.keys(el)]}</h3>
                    </div>`
                }).join('')
   
                this.$collector.innerHTML = `
                <div class="collector__inner">
                    ${itemsHTML}
                </div>
            `
            }
            this.flagRender = false;
            this.$collector.classList.remove('collector_close')
            this.$collector.classList.add('collector_open')
        } else {
            this.flagRender = true;
            this.$collector.classList.remove('collector_open')
            this.$collector.classList.add('collector_close')
        }
    }

    addEventListener() {
        this.$buttonActivate.addEventListener('click', this.render.bind(this))
    }
}

export default Collector
