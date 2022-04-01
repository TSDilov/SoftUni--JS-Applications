import { homePage } from "./home.js";
import { showView, updateNav } from "./util.js";

const section = document.querySelector('#form-sign-up');
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);

export function registerPage() {
    showView(section);
}

async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');
    const rePass = formData.get('repeatPassword');

    if (password != rePass) {
        alert('The rePass din not match!');
        return;
    }

    try {
        const response = await fetch('http://localhost:3030/users/register', {
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