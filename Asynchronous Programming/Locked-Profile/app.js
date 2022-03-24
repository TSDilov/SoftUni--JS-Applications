async function lockedProfile() {
    
    const url = 'http://localhost:3030/jsonstore/advanced/profiles';
    const response = await fetch(url);
    const responseData = await response.json();
    const mainElement = document.getElementById('main');
    mainElement.innerHTML = '';
    let userCounter = 0;

    for (const profile in responseData) {
        
        mainElement.innerHTML += `<div class="profile">
        <img src="./iconProfile2.png" class="userIcon" />
        <label>Lock</label>
        <input type="radio" name="user${++userCounter}Locked" value="lock" checked>
        <label>Unlock</label>
        <input type="radio" name="user${userCounter}Locked" value="unlock"><br>
        <hr>
        <label>Username</label>
        <input type="text" name="user${userCounter}Username" value="${responseData[profile].username}" disabled readonly />
        <div class="hiddenInfo">
            <hr>
            <label>Email:</label>
            <input type="email" name="user${userCounter}Email" value="${responseData[profile].email}" disabled readonly />
            <label>Age:</label>
            <input type="email" name="user${userCounter}Age" value="${responseData[profile].age}" disabled readonly />
        </div>
        
        <button>Show more</button>
    </div>` + '\n';
    
    }

    mainElement.innerHTML.trimEnd();

    const buttonEllements = Array.from(document.getElementsByTagName('button'));
    buttonEllements.forEach(b => b.addEventListener('click', showMoreInfo));

    function showMoreInfo(event) {
        
        if (event.target.parentNode.children[2].checked) {
            return;
        }

        if (event.target.textContent === 'Show more') {
            
            event.target.parentNode.children[9].style.display = 'block';
            event.target.parentNode.children[9].classList.remove('hiddenInfo');
            event.target.parentNode.children[9].children[2].style.display = 'block';
            event.target.parentNode.children[9].children[3].style.display = 'block';
            event.target.textContent = 'Hide it';

        } else {
            
            event.target.parentNode.children[9].style.display = 'none';
            event.target.parentNode.children[9].classList.add('hiddenInfo');
            event.target.textContent = 'Show more';

        }
    }

}