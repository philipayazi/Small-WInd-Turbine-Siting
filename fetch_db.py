from pymongo import MongoClient
from flask import jsonify

def get_db():
    # Make connection to DB and return database
    client = MongoClient('mongodb+srv://small_wind:datascience@cluster0-enyp4.mongodb.net/test?retryWrites=true&w=majority')#need to replace local host with server path
    return client.smallWind

    # create function to return a list of all cities, all monthly wind speeds, and all monthly wind directions
def all_cities():
    db = get_db()
    # records = [record for record in db.mpg_ang.find({}, {"mph"})]
    # return records

    cities = [city for city in db.mpg_ang.aggregate([
        {"$project": {"_id": 0,"city": 1,"loc": 1, "mph": 1, "deg": 1, "mph_avg": {"$avg": "$mph"}, "deg_avg": {"$avg": "$deg"}, "change_mph_avg": {"$avg": "$mph_change"}, "change_deg_avg": {"$avg": "$deg_change"}}}
        ])]

    
    return cities

# def response():

#     return response


if __name__ == '__main__':
    print(all_cities())