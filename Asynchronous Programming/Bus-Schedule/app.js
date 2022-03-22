function solve() {
    const infoElement = document.querySelector('#info span');
    let stop = {
        next: 'depot'
    };
    const departButtonElement = document.getElementById('depart');
    const arriveButtonElement = document.getElementById('arrive');
    async function depart() {
        const response = await fetch(`http://localhost:3030/jsonstore/bus/schedule/${stop.next}`);

        stop = await response.json();
        infoElement.textContent = `Next stop ${stop.name}`;
        departButtonElement.disabled = true;
        arriveButtonElement.disabled = false;
    }

    async function arrive() {
        infoElement.textContent = `Arriving at ${stop.name}`;
        departButtonElement.disabled = false;
        arriveButtonElement.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();