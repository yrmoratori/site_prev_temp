const apiKey = 'bf5acf81f81c091e4cda77114f6c6287';

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
        let max_vel_vento = -Infinity;
        let ww_s = Infinity;
        let total_umidade = 0;
        let count_umidade = 0;
        let total_mm_chuva = 0;

        forecastData[date].forEach(forecast => {
            const temp_max = forecast.main.temp_max;
            const temp_min = forecast.main.temp_min;
            const umidade = forecast.main.humidity;
            const pop = forecast.pop;
            const vel_vento = forecast.wind.speed;
            const ww = forecast.weather[0].description;

            if (temp_max > max_temp) {
                max_temp = temp_max;
            }
            if (temp_min < min_temp) {
                min_temp = temp_min;
            }
            if (pop > max_pop) {
                max_pop = pop;
            }
            if (vel_vento > max_vel_vento) {
                max_vel_vento = vel_vento;
            }
            if (forecast.rain) {
                total_mm_chuva += forecast.rain['3h'];
            }
            
            total_umidade += umidade;
            count_umidade += 1;

            ww_s = ww;
        });

        const media_umidade = total_umidade / count_umidade;

        dados_forecast[date] = {
            max_temp: Math.round(max_temp),
            min_temp: Math.round(min_temp),
            max_pop: Math.round(max_pop * 100),
            max_vel_vento: Math.round(max_vel_vento * 3.6),
            media_umidade: Math.round(media_umidade),
            ww_s: ww_s,
            max_chuva_mm: Math.round(total_mm_chuva)
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
let tempMax = document.querySelector('.tempMax');
let tempMin = document.querySelector('.tempMin')

// display previsao do tempo atual
const displayCurrentWeather = (weather) => {
    const descricao_atual = weather.weather[0].description;
    const vel_vento = weather.wind.speed * 3.6;

    const umidadeIcon = '<i class="fas fa-tint"></i>';
    const pressaoIcon = '<i class="fas fa-tachometer-alt"></i>';
    const ventoIcon = '<i class="fas fa-wind"></i>';

    image.src = `https://samuelljg.github.io/AgendaES/${descricao_atual}.svg`;
    nameVal.innerHTML = `Tempo Hoje em ${weather.name}, ES `;
    desc.innerHTML = `${descricao_atual}.`;
    temp.innerHTML = `${Math.round(weather.main.temp)}°`;
    sensTerm.innerHTML = `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
    <svg fill="red" opacity='0.7' width="20px" height="20px" viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg">
      <path d="M33.74609,76.96289a7.98611,7.98611,0,0,1,1.25635-11.21A81.79682,81.79682,0,0,1,64.05957,52.23926c16.16406-4.042,41.14941-5.04785,68.37793,13.10449,42.333,28.22363,77.12891,1.53906,78.58887.38965a8.00032,8.00032,0,0,1,9.97119,12.51367,81.79682,81.79682,0,0,1-29.05713,13.51367,81.324,81.324,0,0,1-19.71484,2.4375c-14.04053,0-30.87207-3.68164-48.66309-15.542-42.333-28.22266-77.12891-1.53906-78.58887-.38965A8.01729,8.01729,0,0,1,33.74609,76.96289ZM211.02637,121.7334c-1.46,1.14941-36.25586,27.833-78.58887-.38965-27.22852-18.15137-52.21387-17.14844-68.37793-13.10449a81.79682,81.79682,0,0,0-29.05713,13.51367,8.00032,8.00032,0,0,0,9.97119,12.51367c1.46-1.14941,36.25586-27.834,78.58887.38965,17.791,11.86035,34.62256,15.542,48.66309,15.542a83.50512,83.50512,0,0,0,48.772-15.95117,8.00032,8.00032,0,0,0-9.97119-12.51367Zm0,56c-1.46,1.15039-36.25586,27.832-78.58887-.38965-27.22852-18.15332-52.21387-17.14746-68.37793-13.10449a81.79682,81.79682,0,0,0-29.05713,13.51367,8.00032,8.00032,0,0,0,9.97119,12.51367c1.46-1.15039,36.25586-27.835,78.58887.38965,17.791,11.86035,34.62256,15.542,48.66309,15.542a83.50512,83.50512,0,0,0,48.772-15.95117,8.00032,8.00032,0,0,0-9.97119-12.51367Z"/>
    </svg> Sensação ${Math.round(weather.main.feels_like)}°`;
    umidade.innerHTML = `${umidadeIcon} Umidade ${weather.main.humidity}%`;
    pressao.innerHTML = `${pressaoIcon} Pressão ${weather.main.pressure}hPa`;
    vento.innerHTML = `${ventoIcon} Vento ${Math.round(vel_vento)}km/h`;
    tempMax.innerHTML = ` ${Math.round(weather.main.temp_max)}°`;
    tempMin.innerHTML = ` ${Math.round(weather.main.temp_min)}°`;
}

// display previsao forecast 5/3
const displayForecast = (forecastData) => {
    const newDiv = document.querySelector(".displayForecastWeather");

    if (document.querySelector(".forecastItem")) {
        const forecastItems = document.querySelectorAll('.forecastItem');
        forecastItems.forEach(item => item.remove());
    }

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

        const forecastDiv = document.createElement('div');
        forecastDiv.classList.add("forecastItem");

        const cc = document.createElement('div');
        cc.classList.add("cc");
        forecastDiv.appendChild(cc);

        const cc2 = document.createElement('div');
        cc2.classList.add("cc2");
        forecastDiv.appendChild(cc2);

        const dateHeader = document.createElement('h2');
        dateHeader.innerHTML = ` ${date.slice(8)}`;
        cc.appendChild(dateHeader);

        const dateHeader2 = document.createElement('div');
        dateHeader2.innerHTML = ` ${getDayOfWeek(date)}`;
        dateHeader.appendChild(dateHeader2);

        const popElem2 = document.createElement('p');
        popElem2.innerHTML = `<img class="weather-image" src="https://samuelljg.github.io/AgendaES/${forecastDate[date].ww_s}.svg">`;
        cc.appendChild(popElem2);

        const tempElem = document.createElement('p');
        tempElem.innerHTML = ` ${max_icon} ${forecastDate[date].max_temp}° <br>  ${min_icon} ${forecastDate[date].min_temp}°`;
        cc.appendChild(tempElem);

        const rainDiv = document.createElement('p');
        rainDiv.classList.add('rainDiv');
        cc2.appendChild(rainDiv);

        const rainBar2 = document.createElement('p');
        rainBar2.classList.add('rainBar2');
        rainDiv.appendChild(rainBar2);

        const rainBar = document.createElement('p');
        rainBar.classList.add('rainBar');
        rainBar2.appendChild(rainBar);

        const rainIcon = document.createElement('div');
        rainIcon.innerHTML = ` <img width='35px' style='margin-bottom:-10px;' src='https://samuelljg.github.io/AgendaES/rain-svgrepo-com (3).svg'> ${forecastDate[date].max_pop}% - ${forecastDate[date].max_chuva_mm}mm`;
        rainIcon.classList.add('rainIcon');
        rainDiv.appendChild(rainIcon);

        rainBar.style.height = `${forecastDate[date].max_pop}%`;

        const windElem = document.createElement('p');
        windElem.innerHTML = `<i class="fas fa-wind"></i> ${forecastDate[date].max_vel_vento} km/h`;
        cc2.appendChild(windElem);

        const humidityElem = document.createElement('p');
        humidityElem.innerHTML = `<i class="fas fa-tint"></i> ${forecastDate[date].media_umidade}%`;
        cc2.appendChild(humidityElem);

        /*
        console.log(groupedByDate[date][0]);

        const imageMadrugada = document.createElement('p');
        imageMadrugada.innerHTML = `<img width='35px' style='margin-bottom:-10px;' src='https://openweathermap.org/img/wn/${groupedByDate[date][0].weather[0].icon}@2x.png'> Madrugada`;
        imageMadrugada.classList.add('imageMadrugada');
        cc2.appendChild(imageMadrugada);
        */

        newDiv.appendChild(forecastDiv);
    }
}

const url = `https://api.openweathermap.org/data/2.5/weather?q=Vitória&appid=bf5acf81f81c091e4cda77114f6c6287&lang=pt_br&units=metric`;

fetch(url)
    .then(response => response.json())
    .then(displayCurrentWeather)

const url_forecast = `https://api.openweathermap.org/data/2.5/forecast?q=Vitória&appid=bf5acf81f81c091e4cda77114f6c6287&lang=pt_br&units=metric`;

fetch(url_forecast)
    .then(response => response.json())
    .then(displayForecast)

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
