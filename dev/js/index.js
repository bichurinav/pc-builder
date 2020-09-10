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


