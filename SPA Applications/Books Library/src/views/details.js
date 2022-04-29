import { html } from '../../node_modules/lit-html/lit-html.js';
import { deleteBook, getAllLikesOfBook, getBookById, getLike, postLike } from '../api/data.js';
import { getUserData } from '../util.js';

const detailsTemplate = (book, isOwner, isNotOwner, onDelete, likes, onLike, isLiked) => html`
<section id="details-page" class="details">
    <div class="book-information">
        <h3>${book.title}</h3>
        <p class="type">Type: ${book.type}</p>
        <p class="img"><img src=${book.imageUrl}></p>
        <div class="actions">
            ${isOwner  ? html`<a class="button" href="/edit/${book._id}">Edit</a>
            <a @click=${onDelete} class="button" href="/">Delete</a>` : null}
            ${isNotOwner && isLiked == 0 ? html`<a @click=${onLike} class="button" href="/details/${book._id}">Like</a>` : null}           
            <div class="likes">
                <img class="hearts" src="/images/heart.png">
                <span id="total-likes">Likes: ${likes}</span>
            </div>
        </div>
    </div>
    <div class="book-description">
        <h3>Description:</h3>
        <p>${book.description}</p>
    </div>
</section>`;

export async function detailsPage(ctx) {
    const book = await getBookById(ctx.params.id);
    const userData = getUserData();
    const isOwner = userData && book._ownerId == userData.id;
    const inNotOwner = userData && book._ownerId != userData.id;
    const likes = await getAllLikesOfBook(book._id);
    let isLiked = '';
    if (userData) {
        isLiked = await getLike(book._id, userData.id);
    }

    ctx.render(detailsTemplate(book, isOwner, inNotOwner, onDelete, likes, onLike, isLiked));

    async function onDelete() {
        const choice = confirm('Are you sure?');
        if (choice) {
            await deleteBook(ctx.params.id);
            ctx.page.redirect('/');
        }
    }

    async function onLike() {
        const bookId = book._id;
        await postLike(bookId);
    }
}