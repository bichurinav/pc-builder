import { addComponent } from './ajax/addComponent'
import { loadComponent } from './ajax/loadComponent'

const formAddComponent = document.querySelector('.form-add-component__form');
formAddComponent.addEventListener('submit', (e) => {
    e.preventDefault();
    addComponent('add', e.target, 'modules/Component.php')
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


