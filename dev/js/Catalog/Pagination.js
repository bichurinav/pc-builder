import EventEmitter from 'events'

class Pagination extends EventEmitter {
    constructor(options) {
        super()
        this.count = options.count;
        this.show = options.show;
        this.$catalog = options.catalog;
        this.offset = 0;
    }

    render() {
        this.pagination = document.createElement('div');
        this.pagination.classList.add('catalog-content-pagination');
        this.pagination.insertAdjacentHTML('afterbegin', `
            <button offset class="catalog-pagination__btn prev">Prev page</button>
            <span class="catalog-pagination__pages">
                ${localStorage.getItem('page')} из ${this.getLastPage()}
            </span>
            <button offset class="catalog-pagination__btn next">Next Page</button>
        `);

        this.$catalog.appendChild(this.pagination);

        this.paginationButtons = this.pagination.querySelectorAll('.catalog-pagination__btn');
        this.paginationButtons.forEach((btn) => {
            btn.addEventListener('click', this.changePage.bind(this))
        })
    }

    getComponents() {
        this.offset = this.page === 1 ? 0 : (this.page - 1) * this.show
        this.emit('getComponents', this.offset)
    }

    changePage(event) {
        const btn = event.target
        if (btn.classList.contains('next')) {
            if (localStorage.getItem('page') < this.getLastPage()) {
                this.page = Number(localStorage.getItem('page')) + 1
                localStorage.setItem('page', this.page)
            } else {
                this.page = 1
                localStorage.setItem('page', this.page)
            }
        } else {
            if (localStorage.getItem('page') == 1) {
                this.page = this.getLastPage()
                localStorage.setItem('page', this.page)
            } else {
                this.page = Number(localStorage.getItem('page')) - 1
                localStorage.setItem('page', this.page)
            }
        }
        this.getComponents()
    }

    getLastPage() {
        return this.count % this.show != 0
            ? Math.ceil(this.count / this.show)
            : this.count / this.show
    }
}

export default Pagination
