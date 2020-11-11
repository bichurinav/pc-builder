class Add {
    constructor(root, ajaxURL) {
        this.$root = root
        this.ajaxURL = ajaxURL
        this.action = 'add'
        this.panel = true
        this.selectorsInit()
        this.addEventListener()
    }

    selectorsInit() {
        if (!this.$root) {
            throw new Error('Не была найдена .admin-panel');
        }
        this.form = this.$root.querySelector('#form-add-component')
        if (!this.form) {
            throw new Error('Не была найдена форма #form-add-component');
        }

        this.formSelect = document.querySelector('#form-add-component-select');
        if (!this.formSelect) {
            throw new Error('Не был найден select #form-add-component-select у формы');
        }

        this.formUpload = document.querySelector('#form-add-component-upload');
        if (!this.formUpload) {
            throw new Error('Не был найден upload-изображений #form-add-component-select у формы');
        }

        this.fields = document.querySelectorAll('.form-add-component__form input')
        if (!this.fields) {
            throw new Error('Не были найдены поля у формы');
        }

        this.adminPanel = document.querySelector('.admin-panel')
        if (!this.adminPanel) {
            throw new Error('Не были найден .admin-panel');
        }

        this.btnShow = document.querySelector('.admin-panel__open')
        if (!this.btnShow ) {
            throw new Error('Не были найден .admin-panel__open');
        }

        this.page = document.querySelector('.page');
        this.page.classList.add('page_left');
        if (!this.page) {
            throw new Error('Не найден .page');
        }
    }

    changeComponent(event) {
        document.location.href = `/?component=${event.target.value}`;
    }

    uploadImage(event) {
        let textSelector = document.querySelector('.upload-file__text');
        if (!textSelector) {
            throw new Error('.upload-file__text не найден')
        }
        let file = event.target.files[0];
        if (file.size > 5 * 1024 * 1024) {
            textSelector.textContent = 'Изображение не более 5 МБ.';
            return;
        }
        textSelector.textContent = file.name;
    }

    addComponentInDB(event) {
        event.preventDefault();
        if (this.isFormValid(this.fields)) {
            // формируем данные для отправки
            let body = new FormData(event.target);
            body.append('action', this.action);
            const req = fetch(this.ajaxURL, {
                method: 'POST',
                body
            })
            // получаем ответ от сервера
            req.then(data => data.text()).then(data => {
                if (!data) {
                    return
                }
                setTimeout(() => {
                    document.location.href = `/?component=${data}`;
                }, 0);
            })
        }
    }

    isFormValid(fields) {
        let invalid = [];
        fields.forEach(el => {
            function isFile(el) {
                return el.getAttribute('type') === 'file'
            }
            if (el.value === '') {
                if (el.nextElementSibling.classList.contains('field__error')) {
                    el.nextElementSibling.classList.add('error')
                }
                if (isFile(el)) {
                    let imageText = el.nextElementSibling.children[1]
                    imageText.classList.add('error')
                }
                invalid.push(el)
            } else {
                el.nextElementSibling.classList.remove('error');
                if (isFile(el)) {
                    let imageText = el.nextElementSibling.children[1]
                    imageText.classList.remove('error')
                }
            }
        })
        return !invalid.length
    }

    addEventListener() {
        // При изменении select меняется выбор добавления компонента
        this.formSelect.addEventListener('change', event => this.changeComponent(event))
        // Добавляет загрузку изображения в форму
        this.formUpload.addEventListener('change', event => this.uploadImage(event))
        // Добавляет компонент в базу данных
        this.form.addEventListener('submit', event => this.addComponentInDB(event));
        // Показывает панель
        this.btnShow.addEventListener('click', () => {
            this.panel = !this.panel
            if (this.panel) {
                this.adminPanel.classList.remove('admin-panel_close')
                this.page.classList.remove('page_normal');
                this.adminPanel.classList.add('admin-panel_active')
                this.page.classList.add('page_left');
                this.btnShow.innerHTML = "&#10006;"
                this.btnShow.style.fontSize = "16px"
            } else {
                this.adminPanel.classList.remove('admin-panel_active')
                this.page.classList.remove('page_left');
                this.adminPanel.classList.add('admin-panel_close')
                this.page.classList.add('page_normal');
                this.btnShow.textContent = "+"
                this.btnShow.style.fontSize = "28px"
            }
        })


    }
}

export default Add;
