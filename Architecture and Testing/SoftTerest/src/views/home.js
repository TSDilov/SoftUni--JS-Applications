

const section = document.getElementById('homePage');
section.remove();
const getStartedButton = section.querySelector('#getStartedLink'); 

getStartedButton.addEventListener('click', (event) => {
    event.preventDefault();
    ctx.goTo('catalog');
}); 

let ctx = null;

export async function showHomePage(ctxTarget) {
    ctx = ctxTarget;
    ctx.showSection(section);
}