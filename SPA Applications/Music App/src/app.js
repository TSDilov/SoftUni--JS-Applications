import { render, html } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';
import { logout } from './api/data.js';
import { getUserData } from './util.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { catalogPage } from './views/catalog.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { searchPage } from './views/search.js';

const main = document.getElementById('main-content');
const logoutBtn = document.getElementById('logoutBtn');

logoutBtn.addEventListener('click', onLogout);

page(decorateContext);
page()
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/catalog', catalogPage);
page('/create', createPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page('/search', searchPage);
updateNav();
page.start();

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.updateNav = updateNav;
    next();
}

function onLogout() {
    logout();
    updateNav();
    page.redirect('/');
}

function updateNav() {
    const userData = getUserData();
    const login = document.getElementById('loginBtn');
    const register = document.getElementById('registerBtn');
    const create = document.getElementById('createBtn');

    if (userData) {
        login.style.display = 'none';
        register.style.display = 'none';
        logoutBtn.style.display = 'inline-block';
        create.style.display = 'inline-block';
    } else {
        login.style.display = 'inline-block';
        register.style.display = 'inline-block';
        logoutBtn.style.display = 'none';
        create.style.display = 'none';
    }
}






