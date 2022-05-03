import { html } from '../../node_modules/lit-html/lit-html.js';
import { searchAlbum } from '../api/data.js';
import { getUserData } from '../util.js';

const searchTemplate = (albums, userData, onSearch) => html `
<section id="searchPage">
    <h1>Search by Name</h1>

    <div class="search">
        <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
        <button @click=${onSearch} class="button-list">Search</button>
    </div>

    <h2>Results:</h2>
    <div class="search-result">
        ${albums.length == 0 ? html`<p class="no-result">No result.</p>`
                            : albums.map(a => albumCard(a, userData))}
        
    </div>
</section>`;

const albumCard = (album, userData) => html`<div class="card-box">
<img src=${album.imgUrl}>
<div>
    <div class="text-center">
        <p class="name">Name: ${album.name}</p>
        <p class="artist">Artist: ${album.artist}</p>
        <p class="genre">Genre: ${album.genre}</p>
        <p class="price">Price: $${album.price}</p>
        <p class="date">Release Date: ${album.releaseDate}</p>
    </div>
    ${userData && album._ownerId == userData.id ? html`<div class="btn-group">
        <a href="/details/${album._id}" id="details">Details</a>
    </div>` : null }
    
</div>
</div>`;

export function searchPage(ctx) {
    let albums = '';
    async function onSearch() {
        const inputName = document.getElementById('search-input').value;
        if (inputName == '') {
            return alert('Field is required!');
        }
        albums = await searchAlbum(inputName);
        ctx.render(searchTemplate(albums, userData, onSearch));
    }
    const userData = getUserData();
    ctx.render(searchTemplate(albums, userData, onSearch));    
}