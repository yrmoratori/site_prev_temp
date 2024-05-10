from flask import Flask, render_template, request
import requests

app = Flask(__name__)

def get_weather(city):
    api_key = "bf5acf81f81c091e4cda77114f6c6287" # Sua chave API
    link = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&lang=pt_br"
    response = requests.get(link)
    data = response.json()

    if data["cod"] != "404":
        main_data = data["main"]
        temperature_celsius = main_data["temp"] - 273.15
        humidity = main_data["humidity"]
        weather_data = data["weather"]
        weather_description = weather_data[0]["description"]
        return temperature_celsius, humidity, weather_description
    else:
        return None

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        city = request.form['city']
        weather = get_weather(city)
        if weather:
            temperature, humidity, description = weather
            return render_template('index.html', weather=True, city=city, temperature=temperature, humidity=humidity, description=description)
        else:
            return render_template('index.html', weather=False, city=city)
    return render_template('index.html', weather=False)

if __name__ == '__main__':
    app.run(debug=True)
