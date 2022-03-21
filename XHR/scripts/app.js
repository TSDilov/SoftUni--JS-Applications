function loadRepos() {
   const request = new XMLHttpRequest();
   request.addEventListener('readystatechange', () => {
      if (request.readyState == 4 && request.status == 200) {
         document.getElementById('res').textContent = request.responseText;
      }
   });
   request.open("GET", 'https://api.github.com/users/testnakov/repos');
   request.send();
}