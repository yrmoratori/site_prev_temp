const apiKey = 'bf5acf81f81c091e4cda77114f6c6287';

async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=pt_br&units=metric`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Erro ao buscar a previsão do tempo!');
        }
        const data = await response.json();
        const result = {
            cidade: data.name, // cidade
            temperatura: Math.round(data.main.temp), // temperatura atual
            sensacaoTermica: Math.round(data.main.feels_like), // sencacao termica atual
            umidade: data.main.humidity, // umidade atual
            descricao: data.weather[0].description, // descricao do tempo atual
            // ventoVelocidade: data.wind.speed, // velocidade do vento
            pressao: data.main.pressure // pressao atmosferica
        };
        return result;
    } catch (error) {
        console.error('Erro:', error);
        return { error: error.message };
    }
}

async function showWeather(event) {
    event.preventDefault();
    const cidade = document.getElementById('city').value;
    const weatherData = await getWeather(cidade);
    console.log(JSON.stringify(weatherData, null, 2));
    document.getElementById('app').style.display = 'block';
    
    new Vue({
        el: '#app',
        data: {
            weather: weatherData,
            error: weatherData.error || null
        },
        computed: {
            temperature() {
                return this.weather ? this.weather.temperatura : null;
            },
            feelsLike() {
                return this.weather ? this.weather.sensacaoTermica : null;
            }
        }
    });
}

document.getElementById('weather-form').addEventListener('submit', showWeather);
