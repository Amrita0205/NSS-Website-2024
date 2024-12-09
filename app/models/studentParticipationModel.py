from app.utils.extensions import db

class Participation:
    collection = db['participations']  # Replace 'participations' with your MongoDB collection name

    @staticmethod
    def create_participation(data):
        return Participation.collection.insert_one(data)

    @staticmethod
    def find_participation(query):
        return Participation.collection.find_one(query)

    @staticmethod
    def update_participation(query, new_data):
        return Participation.collection.update_one(query, {"$set": new_data})

    @staticmethod
    def delete_participation(query):
        return Participation.collection.delete_one(query)
