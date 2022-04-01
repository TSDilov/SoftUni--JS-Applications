import { editPage } from "./edit.js";
import { homePage } from "./home.js";
import { showView } from "./util.js";

const section = document.querySelector('#movie-example');

export function detailsPage(id) {
    showView(section);
    displayMovie(id);
}

async function displayMovie(id) {
       
    const user = JSON.parse(sessionStorage.getItem('user'));
    const [ movie, likes, ownLike ] = await Promise.all([
        getMovie(id),
        getLikes(id),
        getOwnLike(id, user)
    ]);
    section.replaceChildren(createMovieCard(movie, user, likes, ownLike));
}

function createMovieCard(movie, user, likes, ownLike) {
    
    const element = document.createElement('div');
    element.className = 'container';
    element.innerHTML = ` <div class="row bg-light text-dark">
    <h1>Movie title: ${movie.title}</h1>

    <div class="col-md-8">
        <img class="img-thumbnail" src="${movie.img}" alt="Movie">
    </div>
    <div class="col-md-4 text-center">
        <h3 class="my-3 ">Movie Description</h3>
        <p>${movie.description}</p>
        ${createControls(movie, user, likes, ownLike)}
    </div>
</div>`;

    const likeBtn = element.querySelector('.like-btn');
    if (likeBtn) {
        likeBtn.addEventListener('click', (e) => likeMovie(e, movie._id));
    }

    const deleteBtn = element.querySelector('.delete-btn');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', (e) => deleteMovie(e, movie._id));
    }

    const editBtn = element.querySelector('.edit-btn');
    if (editBtn) {
        editBtn.addEventListener('click', (e) => editMovie(e, movie._id));
    }

    return element;
}

function createControls(movie, user, likes, ownLike) {
    const isOwner = (user && user._id == movie._ownerId);
    
    let controls = [];
    if (isOwner) {
        controls.push(`<a class="btn btn-danger delete-btn" href="#">Delete</a>`);
        controls.push(`<a class="btn btn-warning edit-btn" href="#">Edit</a>`);
    } else if (user && ownLike == false){
        controls.push(`<a class="btn btn-primary like-btn" href="#">Like</a>`);
    }
    
    controls.push(`<span class="enrolled-span">Liked ${likes}</span>`);

    return controls.join('');
}

async function getMovie(id) {
    const response = await fetch(`http://localhost:3030/data/movies/${id}`);
    const movie = await response.json();

    return movie;
}

async function getLikes(movieId) {
    const response = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${movieId}%22&distinct=_ownerId&count`);
    const likes = await response.json();

    return likes;
}

async function getOwnLike(movieId, user) {
    if(!user){
        return false;
    } else {
        const userId = user._id;
        const response = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${movieId}%22%20and%20_ownerId%3D%22${userId}%22 `);
        const like = await response.json();

        return like.length > 0;
    }
}

async function likeMovie(e, movieId) {
    e.preventDefault();
    const user = JSON.parse(sessionStorage.getItem('user'));

    await fetch('http://localhost:3030/data/likes', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': user.accessToken
        },
        body: JSON.stringify({movieId})
    });

    detailsPage(movieId);
}

async function deleteMovie(e, movieId) {
    e.preventDefault();
    const user = JSON.parse(sessionStorage.getItem('user'));

    await fetch(`http://localhost:3030/data/movies/${movieId}`, {
        method: 'delete',
        headers: {
            'X-Authorization': user.accessToken
        }
    });

    homePage();
}

async function editMovie(event, movieId) {
    event.preventDefault();
    editPage();
    const url = `http://localhost:3030/data/movies/${movieId}`;
    console.log(url);
    const form = document.querySelector('.movie-edit');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const title = formData.get('title');
        const description = formData.get('description');
        const img = formData.get('imageUrl');
        const user = JSON.parse(sessionStorage.getItem('user'));
        const response = await fetch(url, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': user.accessToken
            },
            body: JSON.stringify({ title, description, img})
        });

        detailsPage(movieId)
    });

    
}