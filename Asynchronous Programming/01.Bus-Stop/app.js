async function getInfo() {
    const inputBusNumber = document.getElementById('stopId').value;
    let url = `http://localhost:3030/jsonstore/bus/businfo/${inputBusNumber}`;
    const divStopNameElement = document.getElementById('stopName');
    const listElementOfBuses = document.getElementById('buses');
    
    if (inputBusNumber) {
        
        try {
            divStopNameElement.textContent = 'Loading...';
            listElementOfBuses.replaceChildren();
            const response = await fetch(url);
            if (response.status != 200) {
                throw new Error(`${response.status}`);
            }
    
            const data = await response.json();
            divStopNameElement.textContent = data.name;
            for (const bus in data.buses) {
                const listItemElement = document.createElement('li');
                listItemElement.textContent = `Bus ${bus} arrives in ${data.buses[bus]} minutes`;
                listElementOfBuses.appendChild(listItemElement);
            }
    
        } catch (error) {
            divStopNameElement.textContent = 'Error';
        }
    }
}