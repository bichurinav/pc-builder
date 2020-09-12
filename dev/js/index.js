import { addComponent } from './ajax/addComponent'
import { loadComponent } from './ajax/loadComponent'

const formAddComponent = document.querySelector('.form-add-component__form');
formAddComponent.addEventListener('submit', (e) => {
    e.preventDefault();
    const fields = document.querySelectorAll('.form-add-component__form input');
    fields.forEach(el => {
        function isFile(el) {
            if (el.getAttribute('type') === 'file') {
                return true
            } else {
                return false
            }
        }
        if (el.value == '') {
            if (el.nextElementSibling.classList.contains('field__error')) {
                el.nextElementSibling.classList.add('error')
            }
            if (isFile(el)) {
                let imageText = el.nextElementSibling.children[1]
                imageText.classList.add('error')
            }
        } else {
            el.nextElementSibling.classList.remove('error');
            if (isFile(el)) {
                let imageText = el.nextElementSibling.children[1]
                imageText.classList.remove('error')
                addComponent('add', e.target, 'modules/Component.php');
            }
        }
    })
})

loadComponent('load', 'modules/Component.php');

const addComponentSelect = document.getElementById('addComponentSelect');

addComponentSelect.addEventListener('change', e => {
    document.location.href = `/?component=${e.target.value}`;
})

/////////// Кнопка «Прикрепить изображение» /////////// 
const inputFile = document.querySelector('.upload-file__input');
inputFile.addEventListener('change', event => {
    let textSelector = document.querySelector('.upload-file__text');
    let file = event.target.files[0];
    if (file.size > 5 * 1024 * 1024) {
        text.textContent = 'Изображение не более 5 МБ.';
        return;
    }
    textSelector.textContent = file.name;
});


