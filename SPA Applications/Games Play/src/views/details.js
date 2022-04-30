import { html } from '../../node_modules/lit-html/lit-html.js';
import { deleteGame, getComments, getGameById, postComment } from '../api/data.js';
import { getUserData } from '../util.js';

const detailsTemplate = (game, isOwner, onDelete, comments, isNotOwner, onComment) => html`
<section id="game-details">
    <h1>Game Details</h1>
    <div class="info-section">

        <div class="game-header">
            <img class="game-img" src="${game.imageUrl}" />
            <h1>${game.title}</h1>
            <span class="levels">${game.maxLevel}</span>
            <p class="type">${game.category}</p>
        </div>

        <p class="text">${game.summary}</p>
    	${isOwner ? html`<div class="buttons">
            <a href="/edit/${game._id}" class="button">Edit</a>
            <a @click=${onDelete} href="/" class="button">Delete</a>
        </div>` : null}

        <div class="details-comments">
            <h2>Comments:</h2>
            ${comments.length == 0 
                ? html`<p class="no-comment">No comments.</p>` 
                : html`<ul>
                ${comments.map(comentCard)};
            </ul>`}
        </div>    
    </div>

    ${isNotOwner ? html`<article class="create-comment">
        <label>Add new comment:</label>
        <form @submit=${onComment} class="form">
            <textarea name="comment" placeholder="Comment......"></textarea>
            <input class="btn submit" type="submit" value="Add Comment">
        </form>
    </article>` : null}
    
</section>`;

const comentCard = (comment) => html`
<li class="comment">
    <p>Content: ${comment.comment}</p>
</li>`;

export async function detailsPage(ctx) {
    const game = await getGameById(ctx.params.id);
    const userData = getUserData();
    const isOwner = userData && game._ownerId == userData.id;
    const isNotOwner = userData && game._ownerId != userData.id;
    const comments = await getComments(ctx.params.id); 
    
    ctx.render(detailsTemplate(game, isOwner, onDelete, comments, isNotOwner, onComment));

    async function onDelete() {
        const choise = confirm('Are you sure?');
        if (choise) {
            await deleteGame(ctx.params.id);
        }
    }

    async function onComment(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const text = formData.get('comment');

        if (text == '') {
            return alert('Please enter your comment!');
        }
        const gameId = ctx.params.id;
        await postComment( { gameId, comment: text } );
        event.target.reset();
        ctx.page.redirect(`/details/${ctx.params.id}`);
    }
}