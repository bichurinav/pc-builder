const collectorStore = {
    $counter: document.querySelector('.collector-btn__count'),
    component: document.querySelector('.menu__link_active').textContent,
    count: sessionStorage.getItem('count') || 0,

    getItems() {
        return JSON.parse(sessionStorage.getItem('components')) || []
    },

    addItem(item) {
        const isReorderComponent = this.getItems().filter(el => {
            return el.component === item.component
        }).length

        if (!isReorderComponent) {
            sessionStorage.setItem('components', JSON.stringify([...this.getItems(), item]));
            sessionStorage.setItem('count', Number(this.count) + 1)
            this.count = sessionStorage.getItem('count');
            this.$counter.textContent = sessionStorage.getItem('count')
            console.log(this.getItems())
        } else {
            alert(`${this.component.trim()} уже лежит в сборщике`)
        }
    },

    removeItem(item) {
        const updatedItems = this.getItems().filter(el => {
            return el.component !== item
        })
        sessionStorage.setItem('components', JSON.stringify(updatedItems));
        sessionStorage.setItem('count', Number(this.count) - 1)
        this.count = sessionStorage.getItem('count');
        this.$counter.textContent = sessionStorage.getItem('count')
    }

}

export default collectorStore
