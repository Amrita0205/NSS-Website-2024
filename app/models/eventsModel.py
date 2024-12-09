from app.extensions import db

class Event:
    collection = db['events']  # Replace 'events' with your MongoDB collection name

    @staticmethod
    def create_event(data):
        return Event.collection.insert_one(data)

    @staticmethod
    def find_event(query):
        return Event.collection.find_one(query)

    @staticmethod
    def update_event(query, new_data):
        return Event.collection.update_one(query, {"$set": new_data})

    @staticmethod
    def delete_event(query):
        return Event.collection.delete_one(query)
