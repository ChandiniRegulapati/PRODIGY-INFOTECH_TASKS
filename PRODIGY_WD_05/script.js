function fetchWeather() {
    const location = document.getElementById('locationInput').value;
    const apiKey = '2367e50aaee0082df8b1fd1118556deb'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

    fetch(url)
    .then(response => {
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Invalid city name, please try again.');
            } else {
                throw new Error('Weather data not found');
            }
        }
        return response.json();
    })
    .then(data => displayWeather(data))
    .catch(error => {
        console.error('Error:', error);
        displayError(error.message);
    });
}

function displayWeather(data) {
    const weather = `
        <h2>Weather in ${data.name}</h2>
        <p><span class="label">Temperature:</span> <span class="temperature">${data.main.temp}°C</span></p>
        <p><span class="label">Condition:</span> <span class="condition">${data.weather[0].main}</span></p>
        <p><span class="label">Humidity:</span> <span class="humidity">${data.main.humidity}%</span></p>
    `;
    document.getElementById('weatherDisplay').innerHTML = weather;
    document.getElementById('weatherDisplay').style.display = 'block';
    document.getElementById('backButton').style.display = 'block';
    document.getElementById('form-container').style.display = 'none';
}

function displayError(message) {
    const error = `<h2>${message}</h2>`;
    document.getElementById('weatherDisplay').innerHTML = error;
    document.getElementById('weatherDisplay').style.display = 'block';
    document.getElementById('backButton').style.display = 'block';
    document.getElementById('form-container').style.display = 'none';
}

function goBack() {
    document.getElementById('form-container').style.display = 'block';
    document.getElementById('weatherDisplay').style.display = 'none';
    document.getElementById('backButton').style.display = 'none';
    document.getElementById('locationInput').value = '';
}
