import { register } from '../api/data.js';

const section = document.getElementById('registerPage');
section.remove();
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);
let ctx = null;

export async function showRegisterPage(ctxTarget) {
    ctx = ctxTarget;
    ctx.showSection(section);
}

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(form);

    const email = formData.get('email').trim();
    const password = formData.get('password').trim();
    const rePass = formData.get('repeatPassword').trim();
    
    if (email == '' || password == '') {
        return alert('All fields are required!');
    }

    if (email.length < 3 || password.length < 3) {
        return alert('The name or password must be at least 3 characters');
    }

    if (password != rePass) {
        alert('The password do not match!');
        return;
    }
       
    await register(email, password);
    form.reset();
    ctx.goTo('home');
    ctx.updateNav();
}