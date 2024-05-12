from flask import Flask, render_template, request
from weather import Weather

app = Flask(__name__)
previsao = Weather()

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        city = request.form['city']
        weather = previsao.get_weather(city)
        if weather:
            temperature, humidity, description = weather
            return render_template('index.html', weather=True, city=city, temperature=temperature, humidity=humidity, description=description)
        else:
            return render_template('index.html', weather=False, city=city)
    return render_template('index.html', weather=False)

if __name__ == '__main__':
    app.run(debug=True)
