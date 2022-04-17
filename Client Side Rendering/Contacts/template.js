import { html } from '../node_modules/lit-html/lit-html.js';
import { styleMap } from '../node_modules/lit-html/directives/style-map.js';

const divTemplate = (data, onDetails) => html`
<div class="contact card">
<div>
    <i class="far fa-user-circle gravatar"></i>
</div>
<div class="info">
    <h2>Name: ${data.name}</h2>
    <button class="detailsBtn" @click=${() => onDetails(data)}>${data.details ? 'Hide' : 'Details'}</button>
    <div class="details" id=${data.id} style=${styleMap({ display: data.details ? 'block' : 'none'})}>
        <p>Phone number: ${data.phoneNumber}</p>
        <p>Email: ${data.email}</p>
    </div>
</div>
</div>`;

export default divTemplate;

