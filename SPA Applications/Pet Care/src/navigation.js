import { getUserData } from "./util.js";

 export function updateNav() {
    const userData = getUserData();

    if (userData) {
        const userBtns = document.querySelectorAll('.user');
        for (const button of userBtns) {
            button.style.display = 'inline-block';
        }
        const guestBtns = document.querySelectorAll('.guest');
        for (const button of guestBtns) {
            button.style.display = 'none';
        }
    } else {
        const userBtns = document.querySelectorAll('.user');
        for (const button of userBtns) {
            button.style.display = 'none';
        }
        const guestBtns = document.querySelectorAll('.guest');
        for (const button of guestBtns) {
            button.style.display = 'inline-block';
        }
    }
}