function attachEvents() {
    const sendButton = document.getElementById('submit');
    const refreshButton = document.getElementById('refresh');

    refreshButton.addEventListener('click', loadMessages);

    sendButton.addEventListener('click', send);
    loadMessages();
    
}   

const authorInputElement = document.querySelector('[name="author"]');
const contentInputElement = document.querySelector('[name="content"]');
const listElement = document.getElementById('messages');

attachEvents();

async function send() {
    
    const author = authorInputElement.value;
    const content = contentInputElement.value;

    if (author == '' || content == '') {
        return;
    }
    
    await postData({ author, content });

    authorInputElement.value = '';
    contentInputElement.value = '';
    listElement.value += '\n' + `${author}: ${content}`;
}

async function loadMessages () {

    const url = 'http://localhost:3030/jsonstore/messenger';

    const response = await fetch(url);
    const responseData = await response.json();
    const messages = Object.values(responseData);

    listElement.value = messages.map(m => `${m.author}: ${m.content}`).join('\n');
    
}

async function postData(data) {
    const url = 'http://localhost:3030/jsonstore/messenger';

    const options = {
        method: 'post',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    
    const response = await fetch(url, options);
    const result = await response.json();

    return result;
}