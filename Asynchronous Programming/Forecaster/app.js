function attachEvents() {

    const forecastDivElement = document.getElementById('forecast');
    const currentWeatherDivElement = document.getElementById('current');
    const upcomingWeatherDivElement = document.getElementById('upcoming');

    const locationInputElement = document.getElementById('location');
    const submitButton = document.getElementById('submit');
    submitButton.addEventListener('click', getWeather);
    async function getWeather(event) {
        event.preventDefault();
        

        currentWeatherDivElement.innerHTML = `<div class="label">Current conditions</div>`;
        upcomingWeatherDivElement.innerHTML = `<div class="label">Three-day forecast</div>`;
        const errorElement = document.querySelector('#forecast p');
        if (errorElement) {           
            errorElement.remove();
        }

        if (locationInputElement.value) {

            const locationsURL = `http://localhost:3030/jsonstore/forecaster/locations`;

            try {

                const locationsResponse = await fetch(locationsURL);
                const locationsData = await locationsResponse.json();
                const lookingLocation = locationsData.find(loc => loc.name == locationInputElement.value);

                const currentWeatherURL = `http://localhost:3030/jsonstore/forecaster/today/${lookingLocation.code}`;
                const upcomingWeatherURL = `http://localhost:3030/jsonstore/forecaster/upcoming/${lookingLocation.code}`;

                const currentWeatherResponse = await fetch(currentWeatherURL);
                const currentWeatherData = await currentWeatherResponse.json();

                const upcomingWeatherResponse = await fetch(upcomingWeatherURL);
                const upcomingWeatherData = await upcomingWeatherResponse.json();

                forecastDivElement.style.display = 'inline';

                const forecastCurrentDivElement = document.createElement('div');
                forecastCurrentDivElement.classList.add('forecasts');
                
                const spanSymbolElement = document.createElement('span');
                spanSymbolElement.classList.add('condition');
                spanSymbolElement.classList.add('symbol');

                switch (currentWeatherData.forecast.condition) {
                    case 'Sunny':
                        spanSymbolElement.innerHTML = `&#x2600`;
                        break;
                    case 'Partly sunny':
                        spanSymbolElement.innerHTML = `&#x26C5`;
                        break;
                    case 'Overcast':
                        spanSymbolElement.innerHTML = `&#x2601`;
                        break;
                    case 'Rain':
                        spanSymbolElement.innerHTML = `&#x2614`;
                        break;
                    case 'Degrees':
                        spanSymbolElement.innerHTML = `&#176`;
                        break;
                }

                forecastCurrentDivElement.appendChild(spanSymbolElement);

                const spanConditionElement = document.createElement('span');
                spanConditionElement.classList.add('condition');
                forecastCurrentDivElement.appendChild(spanConditionElement);

                const spanLocationElement = document.createElement('span');
                spanLocationElement.textContent = currentWeatherData.name;
                spanLocationElement.classList.add('forecast-data');
                spanConditionElement.appendChild(spanLocationElement);

                const spanTempElement = document.createElement('span');
                spanTempElement.innerHTML = `${currentWeatherData.forecast.low}&deg;/${currentWeatherData.forecast.high}&deg;`;
                spanTempElement.classList.add('forecast-data');
                spanConditionElement.appendChild(spanTempElement);

                const spanWordConditionElement = document.createElement('span');
                spanWordConditionElement.textContent = `${currentWeatherData.forecast.condition}`;
                spanWordConditionElement.classList.add('forecast-data');
                spanConditionElement.appendChild(spanWordConditionElement);

                currentWeatherDivElement.appendChild(forecastCurrentDivElement);

                const forecastInfoUpcomingDivElement = document.createElement('div');
                forecastInfoUpcomingDivElement.classList.add('forecast-info');               

                upcomingWeatherData.forecast.forEach(forecast => {

                    const spanUpcomingElement = document.createElement('span');
                    spanUpcomingElement.classList.add('upcoming');
                    forecastInfoUpcomingDivElement.appendChild(spanUpcomingElement);

                    const spanUpcomingSymbolElement = document.createElement('span');
                    spanUpcomingSymbolElement.classList.add('symbol');

                    switch (forecast.condition) {
                        case 'Sunny':
                            spanUpcomingSymbolElement.innerHTML = `&#x2600;`;
                            break;
                        case 'Partly sunny':
                            spanUpcomingSymbolElement.innerHTML = `&#x26C5;`;
                            break;
                        case 'Overcast':
                            spanUpcomingSymbolElement.innerHTML = `&#x2601;`;
                            break;
                        case 'Rain':
                            spanUpcomingSymbolElement.innerHTML = `&#x2614;`;
                            break;
                        case 'Degrees':
                            spanUpcomingSymbolElement.innerHTML = `&#176;`;
                            break;
                    }

                    spanUpcomingElement.appendChild(spanUpcomingSymbolElement);

                    const spanUpcomingTempElement = document.createElement('span');
                    spanUpcomingTempElement.innerHTML = `${forecast.low}&deg;/${forecast.high}&deg;`;
                    spanUpcomingTempElement.classList.add('forecast-data');
                    spanUpcomingElement.appendChild(spanUpcomingTempElement);

                    const spanUpcomingWordConditionElement = document.createElement('span');
                    spanUpcomingWordConditionElement.textContent = `${forecast.condition}`;
                    spanUpcomingWordConditionElement.classList.add('forecast-data');
                    spanUpcomingElement.appendChild(spanUpcomingWordConditionElement);

                    upcomingWeatherDivElement.appendChild(forecastInfoUpcomingDivElement);
                }); 
                
                locationInputElement.value = '';
            }catch {
                forecastDivElement.style.display = 'inline';
                const labels = Array.from(document.querySelectorAll('.label'));
                labels.forEach(label => {

                    label.style.display = 'none';

                })

                const errorElement = document.createElement('p');
                errorElement.classList.add('label');
                errorElement.textContent = `Error`;
                forecastDivElement.appendChild(errorElement);
                locationInputElement.value = '';
            }
        }
    }

}

attachEvents();
