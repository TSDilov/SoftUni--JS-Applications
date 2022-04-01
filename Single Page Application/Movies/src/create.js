import { homePage } from "./home.js";
import { showView, updateNav } from "./util.js";

const section = document.querySelector('#add-movie');
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);

export function createPage() {
    showView(section);
}

async function onSubmit(event) {
    event.preventDefault();

    const user = JSON.parse(sessionStorage.getItem('user'));
    const formData = new FormData(form);
    const title = formData.get('title');
    const description = formData.get('description');
    const img = formData.get('imageUrl');

    const data = { title, description, img };

    try {
        const response = await fetch('http://localhost:3030/data/movies', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': user.accessToken
            },
            body: JSON.stringify(data)
        });

        if (response.ok != true) {
            const error = await response.json();
            throw new Error(error.message);
        }

    } catch (err) {
        alert(err.message);
    }

    event.target.reset();
    homePage();
}