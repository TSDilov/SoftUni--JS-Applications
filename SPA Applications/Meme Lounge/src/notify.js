const element = document.getElementById('errorBox');

const message = element.querySelector('span');

export function notify(msg) {
    message.textContent = msg;
    element.style.display = 'block';

    setTimeout(() => element.style.display = 'none', 3000);
}

window.notify = notify;
