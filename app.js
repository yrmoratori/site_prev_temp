const apiKey = 'bf5acf81f81c091e4cda77114f6c6287';

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
    const dados_forecast = {};

    for (const date in forecastData) {
        let max_temp = -Infinity;
        let min_temp = Infinity;
        let max_pop = -Infinity;
        let min_pop = Infinity;
        let max_vel_vento = -Infinity;
        let min_vel_vento = Infinity;
        let max_umidade = -Infinity;
        let min_umidade = Infinity;

        forecastData[date].forEach(forecast => {
            const temp_max = forecast.main.temp_max;
            const temp_min = forecast.main.temp_min;
            const umidade = forecast.main.humidity;
            const pop = forecast.pop;
            const vel_vento = forecast.wind.speed;

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
            if (vel_vento > max_vel_vento) {
                max_vel_vento = vel_vento;
            }
            if (vel_vento < min_vel_vento) {
                min_vel_vento = vel_vento;
            }
            if (umidade > max_umidade) {
                max_umidade = umidade;
            }
            if (umidade < min_umidade) {
                min_umidade = umidade;
            }
        });

        dados_forecast[date] = {
            max_temp: Math.round(max_temp),
            min_temp: Math.round(min_temp),
            max_pop: Math.round(max_pop * 100),
            min_pop: Math.round(min_pop * 100),
            max_vel_vento: Math.round(max_vel_vento * 3.6),
            min_vel_vento: Math.round(min_vel_vento * 3.6),
            max_umidade: max_umidade,
            min_umidade: min_umidade
        };
    }

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

    const descricao_atual = weather.weather[0].description;
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

    const forecastDate = getDataFromForecast(groupedByDate);

    for (const date in forecastDate) {
        const max_icon = '<img src="https://www.climatempo.com.br/dist/images/v2/svg/ic-arrow-max.svg">';
        const min_icon = '<img src="https://www.climatempo.com.br/dist/images/v2/svg/ic-arrow-min.svg">';
        const min_humidity_icon = '<img src="https://www.climatempo.com.br/dist/images/v2/svg/ic-humidity-min.svg">';
        const max_humidity_icon = '<img src="https://www.climatempo.com.br/dist/images/v2/svg/ic-humidity-max.svg">';
        const rain_icon = '<i class="fa-solid fa-cloud-rain"></i>';

        const dateHeader = document.createElement('h2');
        dateHeader.innerHTML = `<i class="fa-solid fa-calendar-day"></i> ${date.slice(8)} ${getDayOfWeek(date)}`;
        newDiv.appendChild(dateHeader);

        const forecastDiv = document.createElement('div');
        forecastDiv.classList.add("forecastItem");

        const tempElem = document.createElement('p');
        tempElem.innerHTML = `Temperatura: ${min_icon} ${forecastDate[date].min_temp}°C ${max_icon} ${forecastDate[date].max_temp}°C `;
        forecastDiv.appendChild(tempElem);

        const popElem = document.createElement('p');
       popElem.innerHTML = `Chance de Chuva: ${rain_icon} ${forecastDate[date].max_pop}%`;
        forecastDiv.appendChild(popElem);

        const windElem = document.createElement('p');
        windElem.innerHTML = `Velocidade do Vento: ${min_icon} ${forecastDate[date].min_vel_vento} km/h ${max_icon} ${forecastDate[date].max_vel_vento} km/h`;
        forecastDiv.appendChild(windElem);

        const humidityElem = document.createElement('p');
        humidityElem.innerHTML = `Umidade: ${max_humidity_icon} ${forecastDate[date].max_umidade}% ${min_humidity_icon} ${forecastDate[date].min_umidade}%`;
        forecastDiv.appendChild(humidityElem);

        newDiv.appendChild(forecastDiv);
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
