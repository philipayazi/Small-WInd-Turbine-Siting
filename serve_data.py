from flask import Flask, jsonify, render_template, redirect, url_for
from fetch_db import all_cities

app = Flask(__name__)

@app.route('/home')
def home():
    return render_template('index.html')

#generate route for home page
@app.route('/allcities')
def get_all_cities():
    cities = all_cities()
    response = jsonify(cities)
    response.headers.add('Access-Control-Allow-Origin', '*')
    print(response.headers)
    return response

@app.route('/wind_speed_changes')
def wind_speed_changes():
    return render_template('wind_speed_changes.html')

@app.route('/wind_direction_changes')
def wind_direction_changes():
    return render_template('directional_changes.html')


@app.route('/slider')
def slider():
    return render_template('slider_2.html')

@app.route('/')
def index():
    return redirect('/home')

@app.route('/heatmap/<selected_city>')
def get_city(selected_city):
    return render_template('newHeatMap.html', city = selected_city)

if __name__ == '__main__':
    app.run(debug=True)