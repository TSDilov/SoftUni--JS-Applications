window.addEventListener('DOMContentLoaded', () => {
    const formLoginELement = document.getElementById('login');

    formLoginELement.addEventListener('submit', onLogin);
});

async function onLogin(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const email = formData.get('email');
    const password = formData.get('password');
    try{
        const response = await fetch('http://localhost:3030/users/login', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ email, password})
        });
        if (response.ok != true) {
            const error = await response.json();
            throw new Error(error.message);
        }
        const responseData = await response.json();
        const userData = {
            email: responseData.email,
            id: responseData._id,
            token: responseData.accessToken
        }
        
        sessionStorage.setItem('userData', JSON.stringify(userData));
        event.target.reset();
        window.location = './index.html';
    }
    catch(err){
        alert(err.message);
    }
}