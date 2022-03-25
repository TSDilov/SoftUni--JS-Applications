function attachEvents() {
    const loadButton = document.getElementById('btnLoad');
    const createButton = document.getElementById('btnCreate');

    loadButton.addEventListener('click', loadPhones);
    createButton.addEventListener('click', addPhone);
    
}

const listWithPhones = document.getElementById('phonebook');
const personInput = document.getElementById('person');
const phoneInput = document.getElementById('phone');

attachEvents();

async function addPhone() {
    
    const person = personInput.value;
    const phone = phoneInput.value;
    if (person == '' || phone == '') {
        return; 
    }

    await createPhone({ person, phone });
    personInput.value = '';
    phoneInput.value = '';

    const phoneElement = createListItem(person, phone)
    listWithPhones.appendChild(phoneElement);
    listWithPhones.style.display = 'none';
    
}

async function loadPhones() {
    const url = 'http://localhost:3030/jsonstore/phonebook';
    listWithPhones.replaceChildren();
    const response = await fetch(url);
    const responseData = await response.json();
    const phones = Object.values(responseData);
    phones.map(p => {
        const phoneElement = createListItem(p.person, p.phone);
        const deleteButton = phoneElement.children[0];
        deleteButton.addEventListener('click', removePhone);
        async function removePhone(event) {
            event.target.parentNode.remove();
            await deletePhone(p._id);
        }
        listWithPhones.appendChild(phoneElement);
        listWithPhones.style.display = 'block';
    });   
}

async function createPhone(data) {
    const url = 'http://localhost:3030/jsonstore/phonebook';

    const options = {
        method: 'post',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    const response = await fetch(url, options);
    const responseData = await response.json();

    return responseData;
}

async function deletePhone(id) {
    const url = `http://localhost:3030/jsonstore/phonebook/${id}`;

    const response = await fetch(url, { method: 'delete' });
    const responseData = await response.json();

    return responseData;
}

function createListItem(person, phone) {
    
    const phoneElement = document.createElement('li');
    phoneElement.textContent = `${person}: ${phone}`;
    const deleteButton = document.createElement('button');
    deleteButton.className = 'deleteBtn';
    deleteButton.textContent = 'Delete';
    phoneElement.appendChild(deleteButton);

    return phoneElement;
}
