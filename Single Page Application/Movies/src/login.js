import { homePage } from "./home.js";
import { showView, updateNav } from "./util.js";

const section = document.querySelector('#form-login');
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);

export function loginPage() {
    showView(section);
}

async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
        const response = await fetch('http://localhost:3030/users/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })

        if (response.ok != true) {
            const error = await response.json();
            throw new Error(error.message);
        }

        const user = await response.json();
        sessionStorage.setItem('user', JSON.stringify(user));

    } catch (err) {
        alert(err.message);
        throw err;
    }
    
    event.target.reset();
    updateNav();
    homePage();
}