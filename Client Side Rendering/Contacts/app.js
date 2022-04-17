
import { render } from '../node_modules/lit-html/lit-html.js';
import { contacts } from './contacts.js';
import divTemplate from './template.js';


start();

function start() {
    const container = document.getElementById('contacts');

    onRender();

    function onDetails(contact) {
        contact.details = !(contact.details);
        onRender();
    }
    function onRender() {
        const result = contacts.map(contact => divTemplate(contact, onDetails));
        render(result, container);
    }
}
    


