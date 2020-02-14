from flask import Flask, jsonify, render_template, url_for
from fetch_db import all_cities

app = Flask(__name__)

#generate route for home page
@app.route('allcities')
def get_all_cities():
    cities = all_cities()
    response = jsonify(cities)
    response.headers.add('Access-Control-Allow-Origin', '*')
    print(response.headers)
    return response

@app.route('wind_speed_changes')
def get_speed_changes():
    return render_template('wind_speed_changes.html')

# generate route for Energy Production vs Life Span page
# @app.route('/production_vs_lifespan')
# def get_all_cities():
#     cities = all_cities()
#     return jsonify(cities)

# generate route for specific city
# @app.route('/<city>')
#     city = city()
#     return jsonify(city)

if __name__ == '__main__':
    app.run(debug=True)