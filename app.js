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

    // console.log(weather);

    const descricao_atual = capitalizeFirstLetter(weather.weather[0].description);
    const main = getPtBRMain(weather.weather[0].main);
    const weather_icon = weather.weather[0].icon;
    const vel_vento = weather.wind.speed * 3.6;

    image.src = `https://openweathermap.org/img/wn/${weather_icon}@2x.png`;
    nameVal.innerHTML = `Previsão para Hoje ${data_atual} ${weather.name} - ES`;
    temp.innerText = `Temperatura: ${Math.round(weather.main.temp)}°C`;
    sensTerm.innerText = `Sensação: ${Math.round(weather.main.feels_like)}°C`;
    desc.innerText = `${descricao_atual}, ${main}.`;
    umidade.innerText = `Umidade: ${weather.main.humidity}%`;
    pressao.innerText = `Pressão: ${weather.main.pressure}hPa`;
    vento.innerText = `Vento: 0-${Math.round(vel_vento)}km/h`;
}

async function getForecast(cidade) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cidade}&appid=${apiKey}&lang=pt_br&units=metric`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error(`Erro na solicitação: ${response.statusText}`);
    }

    const forecastData = await response.json();
    return forecastData;
}

function displayForecast(forecastData) {
    console.log(forecastData);
    var temp_max = Number.MIN_VALUE;
    var temp_min = Number.MAX_VALUE;
    
    for (let i = 0; i < forecastData.list.length; i++) {
        var dt_txt = forecastData.list[i].dt_txt;
        console.log(dt_txt.slice(0,10));
        /*
        const temp_menor = Math.round(forecastData.list[i].main.temp_min);
        const temp_maior = Math.round(forecastData.list[i].main.temp_max);

        if (temp_menor < temp_min) {
            temp_min = temp_menor;
        }
        if (temp_maior > temp_max) {
            temp_max = temp_maior;
        }
        */
    }

    // console.log(temp_max);
    // console.log(temp_min);
    
    /*
    forecastData.list.forEach(forecast => {
        const date = new Date(forecast.dt * 1000);
        console.log(`Data e Hora: ${date.toLocaleString('pt-BR')}`);
        console.log(`Temperatura: ${forecast.main.temp}°C`);
        console.log(`Sensação Térmica: ${forecast.main.feels_like}°C`);
        console.log(`Descrição: ${forecast.weather[0].description}`);
        console.log(`Umidade: ${forecast.main.humidity}%`);
        console.log(`Pressão: ${forecast.main.pressure} hPa`);
        console.log(`Velocidade do Vento: ${(forecast.wind.speed * 3.6).toFixed(2)} km/h`);
        console.log('-----------------------------------');
    });
    */
}

send_city.addEventListener('click', async function () {
    const cidade = city.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&lang=pt_br&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(displayCurrentWeather)
        .catch(err => alert('Wrong City name'));

    try {
        const forecastData = await getForecast(cidade);
        displayForecast(forecastData);
    } catch (error) {
        console.error('Erro ao obter a previsão do tempo:', error);
    }
});
