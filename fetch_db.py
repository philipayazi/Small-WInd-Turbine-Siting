from pymongo import MongoClient

def get_db():
    # Make connection to DB and return database
    client = MongoClient('mongodb://localhost:27017')#need to replace local host with server path
    return client.smallWind

    # create function to return a list of all cities, all monthly wind speeds, and all monthly wind directions
def all_cities():
    db = get_db()
    # records = [record for record in db.mpg_ang.find({}, {"mph"})]
    # return records

    cities = [city for city in db.mpg_ang.aggregate([
        {"$project": {"mph": {"$avg": "mph"}, "deg": {"$avg": "deg"}}}
        ])]

    return cities

#     db.students.aggregate([
#    { $project: { quizAvg: { $avg: "$quizzes"}, labAvg: { $avg: "$labs" } } } }
#     ])
    # Loop over cities to find avg wind speed
    # when looping, access each date and then find each value by key.
    # Sum each of these values and divide by the number of values
    # for city in cities:
    #     mean(mph.values())

    

    # wind_speed = [speed for speed in db.#collectionName.find({'$avg': int{_x}})]
    # return wind_speed
    # wind_direction = [direction for direction db.#collectionName.find({'$avg': int{city_y}})]

# def city():
#     db = get_db()
#     specific_city = [city for city in db.#collectionName.find({})]


if __name__ == '__main__':
    print(all_cities())