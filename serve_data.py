from flask import Flask, jsonify
from fetch_db import all_cities

app = Flask(__name__)

#generate route for home page
@app.route('/')
def get_all_cities():
    cities = all_cities()
    response = jsonify(cities)
    response.headers.add('Access-Control-Allow-Origin', '*')
    print(response.headers)
    return response

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