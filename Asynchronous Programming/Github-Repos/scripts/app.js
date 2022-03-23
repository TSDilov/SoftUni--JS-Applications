function loadRepos() {
	const username = document.getElementById('username').value;
	const url = `https://api.github.com/users/${username}/repos`;
	const listElement = document.getElementById('repos');

	fetch(url)
		.then(res => {
			if (res.ok ==false) {
				throw new Error(`${res.status} ${res.statusText}`);
			}
			return res.json();
		})
		.then(handlerResponce)
		.catch(handleError);

	function handlerResponce(data) {
		
		listElement.innerHTML = '';

		for (const repo of data) {
			const liElement = document.createElement('li');

			liElement.innerHTML = `<a href="${repo.html_url}">
			${repo.full_name}
		</a>`;

		listElement.appendChild(liElement);
		}
	}

	function handleError(error) {
		listElement.innerHTML = '';
		listElement.textContent = `${error.message}`;
	}
}