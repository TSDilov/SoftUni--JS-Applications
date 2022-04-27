import { showBooks } from './catalog.js';
import { showCreateBook } from './create.js';
import { showUpdateBook } from './update.js';
import { render } from './util.js'

const body = document.body;

const ctx = {
    update
};

update();

function update() {
    render([
        showBooks(ctx),
        showCreateBook(ctx),
        showUpdateBook(ctx),
    ],body);
}
