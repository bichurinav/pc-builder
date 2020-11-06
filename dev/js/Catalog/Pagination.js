import EventEmitter from 'events'

class Pagination extends EventEmitter {
    constructor(options) {
        super()
        this.count = options.count;
        this.show = options.show;
        this.$catalog = options.catalog;
    }

    render() {
        this.pagination = document.createElement('div');
        this.pagination.classList.add('catalog-content-pagination');
        this.pagination.insertAdjacentHTML('afterbegin', `
            ${localStorage.getItem('page') != this.getLastPage()
                ? `<button offset class="button catalog-pagination__btn">
                      <span class="more material-icons">
                        cached
                      </span>
                      <span>Загрузить еще</span>
                   </button>`
                : `&nbsp;`
            }
            <span class="catalog-pagination__pages">
              ${localStorage.getItem('page')} из ${this.getLastPage()}
            </span>
        `);

        this.$catalog.appendChild(this.pagination);

        this.paginationButton = this.pagination.querySelector('.catalog-pagination__btn');
        if (this.paginationButton) {
            this.paginationButton.addEventListener('click', this.changePage.bind(this))
        }

    }

    getComponents() {
        this.limit = this.page === 1 ? this.show : this.page * this.show
        this.emit('getComponents', this.limit)
    }

    changePage() {
        if (localStorage.getItem('page') < this.getLastPage()) {
            this.page = Number(localStorage.getItem('page')) + 1
            localStorage.setItem('page', this.page)
        } else {
            this.page = 1
            localStorage.setItem('page', this.page)
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
