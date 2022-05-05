import { getUserData } from "./util.js";

 export function updateNav() {
    const userData = getUserData();

    if (userData) {
        const forUsers = document.querySelectorAll('.user');
        for (const userBtn of forUsers) {
            userBtn.style.display = 'inline-block';
        }

        const forGuests = document.querySelectorAll('.guest');
        for (const guestBtn of forGuests) {
            guestBtn.style.display = 'none';
        }
    } else {
        const forUsers = document.querySelectorAll('.user');
        for (const userBtn of forUsers) {
            userBtn.style.display = 'none';
        }

        const forGuests = document.querySelectorAll('.guest');
        for (const guestBtn of forGuests) {
            guestBtn.style.display = 'inline-block';
        }
    }
}