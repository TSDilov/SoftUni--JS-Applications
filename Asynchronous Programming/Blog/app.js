function attachEvents() {
    const postsURL = 'http://localhost:3030/jsonstore/blog/posts';
    const commentsURL = 'http://localhost:3030/jsonstore/blog/comments';

    const loadButtonElement = document.getElementById('btnLoadPosts');
    const postMenuElement = document.getElementById('posts');
    const viewButtonElement = document.getElementById('btnViewPost');
    const postTitleElement = document.getElementById('post-title');
    const postDetailsUlElement = document.getElementById('post-body');
    const commentsUlElement = document.getElementById('post-comments');

    loadButtonElement.addEventListener('click', loadPosts);
    viewButtonElement.addEventListener('click', viewPost);

    async function viewPost() {
        
        commentsUlElement.replaceChildren();
        const postsResponse = await fetch(postsURL);
        const postsResponseData = await postsResponse.json();
        postTitleElement.textContent = postsResponseData[postMenuElement.value].title.toUpperCase();
        postDetailsUlElement.textContent = postsResponseData[postMenuElement.value].body;

        const viewResponse = await fetch(commentsURL);
        const commentsData = await viewResponse.json();
        
        let arrayWithEntries = Object.entries(commentsData)
                                        .filter(([, value]) => value.postId == postMenuElement.value);

       for (const [key, value] of arrayWithEntries) {
            const listItemElement = document.createElement('li');
            listItemElement.id = key;
            listItemElement.textContent = value.text;
            commentsUlElement.appendChild(listItemElement);
       }

    }

    async function loadPosts() {
        const postResponse = await fetch(postsURL);
        const responseData = await postResponse.json();

        for (const post in responseData) {
            const optionElement = document.createElement('option');
            optionElement.textContent = responseData[post].title;
            optionElement.value = post;
            postMenuElement.appendChild(optionElement);
        }
    }
}

attachEvents();