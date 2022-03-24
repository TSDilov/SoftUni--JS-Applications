async function solution() {
    const articlesTitlesURL = 'http://localhost:3030/jsonstore/advanced/articles/list';

    const response = await fetch(articlesTitlesURL);
    const dataTitleResponse = await response.json();
    const mainSectionElement = document.getElementById('main');
    mainSectionElement.innerHTML = '';

    dataTitleResponse.forEach(async (article) => {
        const articleURL = `http://localhost:3030/jsonstore/advanced/articles/details/${article._id}`;

        const articleresponse = await fetch(articleURL);
        const articleData = await articleresponse.json();

        const acordionDivElement = document.createElement('div');
        const headDivElement = document.createElement('div');
        const extraDivElement = document.createElement('div');
        const spanElementForTitle = document.createElement('span');
        const buttonElement = document.createElement('button');
        const pElementForArticleContent = document.createElement('p');

        acordionDivElement.classList.add('accordion');
        headDivElement.classList.add('head');
        extraDivElement.classList.add('extra');
        buttonElement.classList.add('button');
        
        buttonElement.id = articleData._id;

        spanElementForTitle.textContent = articleData.title;       
        pElementForArticleContent.textContent = articleData.content;
        buttonElement.textContent = 'More';

        buttonElement.addEventListener('click', (event) => {

            if (event.target.textContent == 'More') {
                event.target.textContent = 'Less';
                event.target.parentNode.nextSibling.style.display = 'block';
            } else {
                event.target.textContent = 'More';
                event.target.parentNode.nextSibling.style.display = 'none';
            }

        });

        headDivElement.appendChild(spanElementForTitle);
        headDivElement.appendChild(buttonElement);
        extraDivElement.appendChild(pElementForArticleContent);
        acordionDivElement.appendChild(headDivElement);
        acordionDivElement.appendChild(extraDivElement);
        mainSectionElement.appendChild(acordionDivElement);
    });
    
}
solution();