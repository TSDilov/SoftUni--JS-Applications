import { html } from '../../node_modules/lit-html/lit-html.js';
import { deleteTheater, getLike, getLikes, getTheaterById, postLike } from '../api/data.js';
import { getUserData } from '../util.js';

const detailsTemplate = (theater, isOwner, isNotOwner, onDelete, likes, onLike, isLiked) => html`
<section id="detailsPage">
    <div id="detailsBox">
        <div class="detailsInfo">
            <h1>Title: ${theater.title}</h1>
            <div>
                <img src=${theater.imageUrl}>  
            </div>
        </div>

        <div class="details">
            <h3>Theater Description</h3>
            <p>${theater.description}</p>
            <h4>Date: ${theater.date}</h4>
            <h4>Author: ${theater.author}</h4>
            <div class="buttons">
                ${isOwner ? html`<a @click=${onDelete} class="btn-delete" href="/profile">Delete</a>
                <a class="btn-edit" href="/edit/${theater._id}">Edit</a>` : null}
                ${isNotOwner && isLiked == 0 ? html`<a @click=${onLike} class="btn-like" href="/details/${theater._id}">Like</a>` : null}
            </div>
            <p class="likes">Likes: ${likes}</p>
        </div>
    </div>
</section>`;

export async function detailsPage(ctx) {
    const theater = await getTheaterById(ctx.params.id);
    const userData = getUserData();
    const isOwner = userData && theater._ownerId == userData.id;
    const isNotOwner = userData && theater._ownerId != userData.id;
    const likes = await getLikes(theater._id);
    let isLiked = '';

    if (userData) {
        isLiked = await getLike(theater._id, userData.id);
    }

    ctx.render(detailsTemplate(theater, isOwner, isNotOwner, onDelete, likes, onLike, isLiked));

    async function onDelete() {
        const choice = confirm('Are you sure?');
        if (choice) {
            await deleteTheater(ctx.params.id);
        }
    }

    async function onLike() {
        const theaterId = theater._id;
        await postLike(theaterId);
    }
}