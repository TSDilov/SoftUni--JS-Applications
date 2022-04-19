import { html } from './node_modules/lit-html/lit-html.js';

const listTemplate = (towns) => html`
<ul>
    ${towns.map(t => html`<li>${t}</li>`)}
</ul>`;

export default listTemplate;