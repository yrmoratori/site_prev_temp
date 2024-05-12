import requests

# link do open_weather: https://openweathermap.org/

class Weather:
    def get_weather(self, city):
        api_key = "bf5acf81f81c091e4cda77114f6c6287" # Sua chave API
        link = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&lang=pt_br"
        response = requests.get(link)
        data = response.json()

        if data["cod"] != "404":
            main_data = data["main"]
            temperature_celsius = round(main_data["temp"] - 273.15)
            humidity = main_data["humidity"]
            weather_data = data["weather"]
            weather_description = weather_data[0]["description"]
            return temperature_celsius, humidity, weather_description
        else:
            return None
