window.addEventListener('load', () => {
    const form = document.getElementById('register-form');

    form.addEventListener('submit', onRegister);
});

async function onRegister(event) {  
    event.preventDefault();
    const formData = new FormData(event.target);
    const url = 'http://localhost:3030/users/register';
    const email = formData.get('email');
    const password = formData.get('password');
    const rePass = formData.get('rePass');

    if (password != rePass) {
        alert('Password is not the same!');
        return;
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ email, password }) 
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
    } catch (err) {
        alert(err.message);
    }
}