from app.utils.extensions import db

class TotalHours:
    collection = db['total_hours']  # Replace 'total_hours' with your MongoDB collection name

    @staticmethod
    def create_total_hours(data):
        return TotalHours.collection.insert_one(data)

    @staticmethod
    def find_total_hours(query):
        return TotalHours.collection.find_one(query)

    @staticmethod
    def update_total_hours(query, new_data):
        return TotalHours.collection.update_one(query, {"$set": new_data})

    @staticmethod
    def delete_total_hours(query):
        return TotalHours.collection.delete_one(query)
