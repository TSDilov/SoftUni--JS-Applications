import { render } from './node_modules/lit-html/lit-html.js';
import listTemplate from './template.js';

const form = document.querySelector('form');
form.addEventListener('submit', onClick);

function onClick(event) {
    event.preventDefault();
    const towns = document.getElementById('towns').value.split(',').map(t => t.trim());
    if (towns == '') {
        return;
    }
    const divForList = document.getElementById('root');
    render(listTemplate(towns), divForList);
    event.target.children[1].value = '';
}