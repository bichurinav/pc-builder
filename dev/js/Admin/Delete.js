import {findParent, getParamURL} from '../utils'

class Delete {
    constructor(selector, ajaxURL) {
        this.$delButtons = document.querySelectorAll(selector)
        this.action = 'remove'
        this.ajaxURL = ajaxURL
        this.init()
    }

    init() {
        this.$delButtons.forEach(btn => {
            btn.style.display = 'block'
            btn.addEventListener('click', this.delCardFromDB.bind(this, btn))
        })
    }

    delCardFromDB(btn) {
        const cardName =
            findParent(btn, 'card').querySelector('.card__title').textContent;

        if (confirm(`Удалить ${cardName} ?`)) {
            const component = getParamURL('component')

            let body = new FormData()
            body.append('action', this.action)
            body.append('component', component)
            body.append('cardName', cardName)

            const req = fetch(this.ajaxURL, {
                method: 'POST',
                body
            })

            req.then(data => data.text())
                .then(data => {
                    document.location.href = `/?component=${data}`;
                })

            req.catch(err => {
                console.log(err)
            })
        }
    }
}

export default Delete
