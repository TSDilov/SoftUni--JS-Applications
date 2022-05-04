import { html } from '../../node_modules/lit-html/lit-html.js';
import { deletePet, getAllDonates, getDonate, getPetById, postDonate } from '../api/data.js';
import { getUserData } from '../util.js';

const detailsTemplate = (pet, isOwner, isNotOwner, onDelete, donates, isDonate, onDonate) => html`
<section id="detailsPage">
    <div class="details">
        <div class="animalPic">
            <img src=${pet.image}>
        </div>
        <div>
            <div class="animalInfo">
                <h1>Name: ${pet.name}</h1>
                <h3>Breed: ${pet.breed}</h3>
                <h4>Age: ${pet.age}</h4>
                <h4>Weight: ${pet.weight}</h4>
                <h4 class="donation">Donation: ${donates * 100}$</h4>
            </div>
            <div class="actionBtn">
                ${isOwner ? html`<a href="/edit/${pet._id}" class="edit">Edit</a>
                                 <a @click=${onDelete} class="button" href="/">Delete</a>` : null}
                ${isNotOwner && isDonate == 0? html`<a @click=${onDonate} href="/details/${pet._id}" class="donate">Donate</a>` : null}                
            </div>           
        </div>
    </div>
</section>`;

export async function detailsPage(ctx) {
    console.log(ctx.params.id);
    const pet = await getPetById(ctx.params.id);
    const userData = getUserData();
    const isOwner = userData && pet._ownerId == userData.id;
    const isNotOwner = userData && pet._ownerId != userData.id;
    const donates = await getAllDonates(pet._id);
    let isDonate = ''
    if (userData) {
        isDonate = await getDonate(pet._id, userData.id);
    }

    ctx.render(detailsTemplate(pet, isOwner, isNotOwner, onDelete, donates, isDonate, onDonate));

    async function onDelete() {
        const choice = confirm('Are you sure?');
        if (choice) {
            await deletePet(ctx.params.id);
            ctx.page.redirect('/');
        }
    }

    async function onDonate() {
        const petId = pet._id;
        await postDonate(petId);
    }
}