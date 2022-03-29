let userData = null;
window.addEventListener('load',  () => {
    userData = JSON.parse(sessionStorage.getItem('userData'));
    const forLogin = document.getElementById('user');
    const forLogout = document.getElementById('guest');
    const welcomeUser = document.querySelector('.email span');
    const addButton = document.querySelector('#addForm .add');
    loadData();
    
    if (userData != null) {
        forLogout.style.display = 'none';
        addButton.disabled = false;
        welcomeUser.textContent = userData.email;
    } else {
        forLogin.style.display = 'none';
    }
    const loadButton = document.querySelector('.load');
    loadButton.addEventListener('click', loadData);

    const addForm = document.getElementById('addForm');
    addForm.addEventListener('submit', onCreate);

    const logOutButton = document.getElementById('logout');
    logOutButton.addEventListener('click', async () => {
        const url = 'http://localhost:3030/users/logout';
        const response = await fetch(url, {
            headers: {
                "X-Authorization": userData.token
            }
        });

        sessionStorage.clear();
        window.location = './index.html';
    });

    const fieldSet = document.getElementById('main');
    fieldSet.addEventListener('click', OnClick);

    function OnClick(event) {
        if (event.target.className == 'delete') {
            onDelete(event.target);
        } else if (event.target.className == 'update') {
            onEdit(event.target);
        } 
    }

    async function onEdit(button){
        if (!userData) {
            window.location = './login.html';
            return;
        }

        const id = button.dataset.id;
        const url = 'http://localhost:3030/data/catches/' + id;
        const angler = button.parentNode.children[1].value;
        const weight = button.parentNode.children[3].value;
        const species = button.parentNode.children[5].value;
        const location = button.parentNode.children[7].value;
        const bait = button.parentNode.children[9].value;
        const captureTime = button.parentNode.children[11].value;
        const data = {
            angler,
            weight,
            species,
            location,
            bait,
            captureTime
        };

        try {
            const response = await fetch(url, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': userData.token
                },
                body: JSON.stringify(data)
            });
    
            if (response.ok != true) {
                const error = await response.json();
                throw new Error(error.message);
            }

            loadData();
        } catch (err) {
            alert(err.message);
        }       
    }

    async function onDelete (button){
        const id = button.dataset.id;
        const url = 'http://localhost:3030/data/catches/' + id;

        try {
            const response = await fetch(url, {
                method: 'delete',
                headers: {
                    "X-Authorization": userData.token
                }
            });
        
            if (response.ok != true) {
                const error = await response.json();
                throw new Error(error.message);
            }
        
            button.parentNode.remove(); 
        } catch (err) {
            alert(err.message);
        }     
    }

});

async function onCreate(event) {
    event.preventDefault();
    if (!userData) {
        window.location = './login.html';
        return;
    }
    const formData = new FormData(event.target);

    const data = [...formData.entries()].reduce((a, [k, v ]) => Object.assign(a, {[k]: v}), {});

    try {
        if(Object.values(data).some(x => x == '')) {
            throw new Error('All fields are required!');
        }
        const response = await fetch('http://localhost:3030/data/catches', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': userData.token
            },
            body: JSON.stringify(data)
        });

        if (response.ok != true) {
            const error = await response.json();
            throw new Error(error.message);
        }

        event.target.reset();
        loadData();

    } catch (err) {
        alert(err.message);
    }
}

async function loadData() {
    const url = 'http://localhost:3030/data/catches';
    const response = await fetch(url);
    const responseData = await response.json();
    const catches = document.getElementById('catches');
    catches.replaceChildren(...responseData.map(createPreview));
}

function createPreview(data) {
    const isOwner = (userData && data._ownerId == userData.id);
    
    const element = document.createElement('div');
    element.className = 'catch';
    element.innerHTML = `<label>Angler</label>
<input type="text" class="angler" value="${data.angler}" ${!isOwner? 'disabled' : ''}>
<label>Weight</label>
<input type="text" class="weight" value="${data.weight}" ${!isOwner? 'disabled' : ''}>
<label>Species</label>
<input type="text" class="species" value="${data.species}" ${!isOwner? 'disabled' : ''}>
<label>Location</label>
<input type="text" class="location" value="${data.location}" ${!isOwner? 'disabled' : ''}>
<label>Bait</label>
<input type="text" class="bait" value="${data.bait}" ${!isOwner? 'disabled' : ''}>
<label>Capture Time</label>
<input type="number" class="captureTime" value="${data.captureTime}" ${!isOwner? 'disabled' : ''}>
<button class="update" data-id="${data._id}" ${!isOwner? 'disabled' : ''}>Update</button>
<button class="delete" data-id="${data._id}" ${!isOwner? 'disabled' : ''}>Delete</button>`;

    return element;
}