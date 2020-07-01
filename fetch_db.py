from pymongo import MongoClient
from flask import jsonify

def get_db():
    # Make connection to DB and return database
    client = MongoClient('mongodb+srv://small_wind:insert_password@cluster0-enyp4.mongodb.net/test?retryWrites=true&w=majority')
    return client.smallWind

# create function to return a list of all cities, all monthly wind speeds, all monthly wind directions, and all changes in average changes in wind speed and direction
def all_cities():
    db = get_db()

    cities = [city for city in db.mpg_ang.aggregate([
        {"$project": {"_id": 0,"city": 1,"loc": 1, "mph": 1, "deg": 1, "mph_avg": {"$avg": "$mph"}, "deg_avg": {"$avg": "$deg"}, "change_mph_avg": {"$avg": "$mph_change"}  , "change_deg_avg": {"$avg": "$deg_change"}}}
        ])]

    
    return cities

if __name__ == '__main__':
    print(all_cities())