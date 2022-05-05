import { render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';
import { logout } from './api/data.js';
import { updateNav } from './navigation.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { profilePage } from './views/profile.js';
import { registerPage } from './views/register.js';

const main = document.getElementById('content');
const logoutBtn = document.getElementById('logoutBtn');
logoutBtn.addEventListener('click', onLogout);

page(decorateContex);
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/create', createPage);
page('/profile', profilePage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);

updateNav();
page.start();

function decorateContex(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.updateNav = updateNav;
    next();
}

function onLogout() {
    logout();
    updateNav();
    page.redirect('/')
}

