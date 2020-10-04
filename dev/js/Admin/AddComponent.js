class AddComponent {
    constructor() {
        this.formAddComponent = document.querySelector('#form-add-component');
        if (!this.formAddComponent) {
            throw new Error('Не была найдена форма #form-add-component');
        }

        this.formAddComponentSelect = document.querySelector('#form-add-component-select');
        if (!this.formAddComponentSelect) {
            throw new Error('Не был найден select #form-add-component-select у формы');
        }

        this.formAddComponentUpload = document.querySelector('#form-add-component-upload');
        if (!this.formAddComponentUpload) {
            throw new Error('Не был найден upload-изображений #form-add-component-select у формы');
        }

        this.fields = document.querySelectorAll('.form-add-component__form input')
        if (!this.formAddComponentUpload) {
            throw new Error('Не были найдеы поля у формы');
        }

        this.ajaxURL = 'modules/Component.php';
        this.addEventListener();
    }


    
    changeComponent(event) {
        document.location.href = `/?component=${event.target.value}`;
    }


    
    uploadImage(event) {
        let textSelector = document.querySelector('.upload-file__text');
        let file = event.target.files[0];
        if (file.size > 5 * 1024 * 1024) {
            textSelector.textContent = 'Изображение не более 5 МБ.';
            return;
        }
        textSelector.textContent = file.name;
    }



    addComponentInDB(data) {
        data['event'].preventDefault();
        if (this.isFormValid(this.fields)) {
            // формируем данные для отправки
            let body = new FormData(data['event'].target);
            body.append('action', data['action']);

            const req = fetch(data['url'], {
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
        this.formAddComponentSelect.addEventListener('change', event => this.changeComponent(event))
        // Добавляет загрузку изображения в форму
        this.formAddComponentUpload.addEventListener('change', event => this.uploadImage(event))
        // Добавляет компонент в базу данных
        this.formAddComponent.addEventListener('submit', event => this.addComponentInDB({
            action: 'add',
            event,
            url: this.ajaxURL
        }));
        
    }
}

export default AddComponent;