async function loadCommits() {
    const username = document.getElementById('username').value;
    const repo = document.getElementById('repo').value;
    let url = `https://api.github.com/repos/${username}/${repo}/commits`;
    const listElement = document.getElementById('commits');
    let errorHandle = '';
    
    try {
        const response = await fetch(url); 
        errorHandle = `Error: ${response.status} (Not Found)`;
        if (response.ok == false) {
            throw new Error(`${response.status} (Not Found)`);
        }

        const data = await response.json();

        for (const repo of data) {
            const listItemElement = document.createElement('li');
            listItemElement.textContent = `${repo.commit.author.name}: ${repo.commit.message}`;
            listElement.appendChild(listItemElement);
        }
        
    } catch (error) {
        const listItemElement = document.createElement('li');
        listElement.textContent = errorHandle;
        listElement.appendChild(listItemElement);
    }
    

}
