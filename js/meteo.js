'use strict';

async function getWeather(ipInfo) {
    const url = 'https://www.infoclimat.fr/public-api/gfs/json?_ll='+ipInfo.latitude+','+ipInfo.longitude+'&_auth=ARsDFFIsBCZRfFtsD3lSe1Q8ADUPeVRzBHgFZgtuAH1UMQNgUTNcPlU5VClSfVZkUn8AYVxmVW0Eb1I2WylSLgFgA25SNwRuUT1bPw83UnlUeAB9DzFUcwR4BWMLYwBhVCkDb1EzXCBVOFQoUmNWZlJnAH9cfFVsBGRSPVs1UjEBZwNkUjIEYVE6WyYPIFJjVGUAZg9mVD4EbwVhCzMAMFQzA2JRMlw5VThUKFJiVmtSZQBpXGtVbwRlUjVbKVIuARsDFFIsBCZRfFtsD3lSe1QyAD4PZA%3D%3D&_c=19f3aa7d766b6ba91191c8be71dd1ab2';
    console.log(url);
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
}

function getWeatherHTML(data, time) {
    const temperature = Math.round(data['temperature']['2m'] - 273.15);
    const windSpeed = data['vent_moyen']['10m'];
    
    if(data['risque_neige'] > 0) {
        var cielClass = 'fa-snowflake';
        var weatherDescription = 'risque de neige';
    }else if(data['pluie'] > 0) {
        var cielClass = 'fa-cloud-showers-heavy';
        var weatherDescription = 'Pluie '+ data['pluie'] + 'mm';
    }else if(data['nebulosite']['totale'] > 50) {
        var cielClass = 'fa-cloud';
        var weatherDescription = 'Nuageux';
    }else if (data['nebulosite']['totale'] > 20) {
        var cielClass = 'fa-cloud-sun';
        var weatherDescription = 'Peu nuageux';
    }else {
        var cielClass = 'fa-sun';
        var weatherDescription = 'Ensoleillé';
    }

    return `
    <div class="meteo-item">
        <h2 class="hour">${time}</h2>
        <div class="meteo-content">
            <div class="temperature">
                <i class="fas fa-thermometer-empty"></i><p>${temperature}°C</p>
            </div>
            <div class="vent">
                <i class="fas fa-wind"></i><p>${windSpeed} km/h</p>
            </div>
            <div class="ciel">
                <i class="fas ${cielClass}"></i><p>${weatherDescription}</p>
            </div>
        </div>
    </div>
    `;
}

async function addWeather(ipInfo) {
    const weatherData = await getWeather(ipInfo);
    const weatherContainer = document.getElementById('meteo-container');

    const entries = Object.entries(weatherData);
    const data = [entries[8], entries[10], entries[12], entries[14]];
    const timeOfDay = ['Matin', 'Midi', 'Soir', 'Nuit'];
    console.log(data);

    weatherContainer.innerHTML = data.map((weatherData, index) => {
        return getWeatherHTML(weatherData[1], timeOfDay[index]);
    }).join('');
}

export {
    addWeather
}