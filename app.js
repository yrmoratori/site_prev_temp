const apiKey = 'bf5acf81f81c091e4cda77114f6c6287';

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.substring(1);
}

function getPtBRMain(string_main) {
    main_text = string_main;
    let main_br = "";

    switch (main_text) {
        case "Thunderstorm":
        case "Squall":
            main_br = "Tempestade";
            break;
        case "Drizzle":
            main_br = "Chuvisco";
            break;
        case "Rain":
            main_br = "Chovendo";
            break;
        case "Snow":
            main_br = "Nevando";
            break;
        case "Clouds":
            main_br = "Com nuvens";
            break;
        case "Clear":
            main_br = "Sem nuvens";
            break;
        case "Tornado":
            main_br = "Com tornados";
            break;
        case "Ash":
        case "Dust":
        case "Sand":
            main_br = "Poeira/Cinzas";
            break;
        case "Fog":
        case "Smoke":
        case "Mist":
        case "Haze":
            main_br = "Neblina/Nublado";
            break;
        default:
            main_br = main_text;
    }

    return main_br;
}

function getDayOfWeek(dateString) {
    const date = new Date(dateString);
    const daysOfWeek = ["seg", "ter", "qua", "qui", "sex", "sáb", "dom"];
    const dayOfWeek = date.getDay();
    return daysOfWeek[dayOfWeek];
}

function getDataFromForecast(forecastData) {
    console.log(forecastData);

    const dados_forecast = {};

    for (const date in forecastData) {
        let max_temp = -Infinity;
        let min_temp = Infinity;
        let max_pop = -Infinity;
        let min_pop = Infinity;

        forecastData[date].forEach(forecast => {
            console.log(forecast);

            const temp_max = forecast.main.temp_max;
            const temp_min = forecast.main.temp_min;
            const pop = forecast.pop; // Precipitação: precisa ser `forecast.pop`, não `forecast.main.pop`

            if (temp_max > max_temp) {
                max_temp = temp_max;
            }
            if (temp_min < min_temp) {
                min_temp = temp_min;
            }
            if (pop > max_pop) {
                max_pop = pop;
            }
            if (pop < min_pop) {
                min_pop = pop;
            }
        });

        dados_forecast[date] = {
            max_temp: Math.round(max_temp),
            min_temp: Math.round(min_temp),
            max_pop: max_pop * 100,
            min_pop: min_pop * 100
        };
    }

    console.log('Temperaturas por dia:', dados_forecast);
    return dados_forecast;
}

// dados da previsao do tempo atual
let send_city = document.querySelector('.send_city');
let city = document.querySelector('.city');
let nameVal = document.querySelector('.name');
let temp = document.querySelector('.temp');
let sensTerm = document.querySelector('.sensTermica');
let desc = document.querySelector('.desc');
let image = document.querySelector('.weather-icon');
let umidade = document.querySelector('.umidade');
let pressao = document.querySelector('.pressao');
let vento = document.querySelector('.vento');

// display previsao do tempo atual
const displayCurrentWeather = (weather) => {
    const today = new Date();
    const options = { day: '2-digit', month: '2-digit' };
    const data_atual = today.toLocaleDateString('pt-BR', options);

    const descricao_atual = capitalizeFirstLetter(weather.weather[0].description);
    const main = getPtBRMain(weather.weather[0].main);
    const weather_icon = weather.weather[0].icon;
    const vel_vento = weather.wind.speed * 3.6;

    const icon_map = `<i class="fa-solid fa-location-dot"></i>`;
    const tempIcon = '<i class="fas fa-temperature-high"></i>';
    const sensTermIcon = '<i class="fas fa-thermometer-three-quarters"></i>';
    const umidadeIcon = '<i class="fas fa-tint"></i>';
    const pressaoIcon = '<i class="fas fa-tachometer-alt"></i>';
    const ventoIcon = '<i class="fas fa-wind"></i>';

    image.src = `https://openweathermap.org/img/wn/${weather_icon}@2x.png`;
    nameVal.innerHTML = `Previsão para Hoje ${data_atual} ${weather.name} - ES ${icon_map}`;
    desc.innerHTML = `${descricao_atual}, ${main}.`;
    temp.innerHTML = `${tempIcon} Temperatura: ${Math.round(weather.main.temp)}°C`;
    sensTerm.innerHTML = `${sensTermIcon} Sensação: ${Math.round(weather.main.feels_like)}°C`;
    umidade.innerHTML = `${umidadeIcon} Umidade: ${weather.main.humidity}%`;
    pressao.innerHTML = `${pressaoIcon} Pressão: ${weather.main.pressure}hPa`;
    vento.innerHTML = `${ventoIcon} Vento: 0-${Math.round(vel_vento)}km/h`;
}

// display previsao forecast 5/3
const displayForecast = (forecastData) => {
    // console.log(forecastData.list);

    const newDiv = document.createElement('div');
    newDiv.classList.add("displayForecastWeather");
    document.body.appendChild(newDiv);

    const groupedByDate = {};
    const today = new Date().toISOString().slice(0, 10);

    for (let i = 0; i < forecastData.list.length; i++) {
        const forecast = forecastData.list[i];
        const date = forecast.dt_txt.slice(0, 10);

        if (date === today) {
            continue;
        }

        if (!groupedByDate[date]) {
            groupedByDate[date] = [];
        }

        groupedByDate[date].push(forecast);
    }

    // console.log('oie');
    // console.log(groupedByDate);
    // console.log('bye');

    getDataFromForecast(groupedByDate);

    for (const date in groupedByDate) {
        const dateHeader = document.createElement('h2');
        dateHeader.innerHTML = `<i class="fa-solid fa-calendar-day"></i> ${date.slice(8)} ${getDayOfWeek(date)}`;
        newDiv.appendChild(dateHeader);

        groupedByDate[date].forEach(forecast => {
            // console.log(forecast);
            const weather_icon = forecast.weather[0].icon;
            const descricao_atual = capitalizeFirstLetter(forecast.weather[0].description);
            const main = getPtBRMain(forecast.weather[0].main);
            const tempIcon = '<i class="fas fa-temperature-high"></i>';
            const sensTermIcon = '<i class="fas fa-thermometer-three-quarters"></i>';
            const umidadeIcon = '<i class="fas fa-tint"></i>';
            const pressaoIcon = '<i class="fas fa-tachometer-alt"></i>';
            const ventoIcon = '<i class="fas fa-wind"></i>';
            const vel_vento = forecast.wind.speed * 3.6;

            const forecastDiv = document.createElement('div');
            forecastDiv.classList.add("forecastItem");

            const timeHeader = document.createElement('h3');
            const time = forecast.dt_txt.slice(11, 16);
            timeHeader.innerHTML = `<i class="fa-solid fa-clock"></i> ${time}`;
            forecastDiv.appendChild(timeHeader);

            const weatherIcon = document.createElement('img');
            weatherIcon.src = `https://openweathermap.org/img/wn/${weather_icon}@2x.png`;
            forecastDiv.appendChild(weatherIcon);

            const descElem = document.createElement('p');
            descElem.innerHTML = `${descricao_atual}, ${main}.`;
            forecastDiv.appendChild(descElem);

            const tempElem = document.createElement('p');
            tempElem.innerHTML = `${tempIcon} Temperatura: ${Math.round(forecast.main.temp)}°C`;
            forecastDiv.appendChild(tempElem);

            const sensTermElem = document.createElement('p');
            sensTermElem.innerHTML = `${sensTermIcon} Sensação: ${Math.round(forecast.main.feels_like)}°C`;
            forecastDiv.appendChild(sensTermElem);

            const umidadeElem = document.createElement('p');
            umidadeElem.innerHTML = `${umidadeIcon} Umidade: ${forecast.main.humidity}%`;
            forecastDiv.appendChild(umidadeElem);

            const pressaoElem = document.createElement('p');
            pressaoElem.innerHTML = `${pressaoIcon} Pressão: ${forecast.main.pressure}hPa`;
            forecastDiv.appendChild(pressaoElem);

            const ventoElem = document.createElement('p');
            ventoElem.innerHTML = `${ventoIcon} Vento: 0-${Math.round(vel_vento)}km/h`;
            forecastDiv.appendChild(ventoElem);

            newDiv.appendChild(forecastDiv);
        });
    }
}

send_city.addEventListener('click', async function () {
    const cidade = city.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&lang=pt_br&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(displayCurrentWeather)
        .catch(err => alert('Wrong City name'));

    const url_forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${cidade}&appid=${apiKey}&lang=pt_br&units=metric`;

    fetch(url_forecast)
        .then(response => response.json())
        .then(displayForecast)
        .catch(err => alert('Wrong City name'));
});
