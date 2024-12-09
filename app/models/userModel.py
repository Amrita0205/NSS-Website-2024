from app.extensions import db

class User:
    collection = db['users']  # Replace 'users' with your MongoDB collection name

    @staticmethod
    def create_user(data):
        return User.collection.insert_one(data)

    @staticmethod
    def find_user(query):
        return User.collection.find_one(query)

    @staticmethod
    def update_user(query, new_data):
        return User.collection.update_one(query, {"$set": new_data})

    @staticmethod
    def delete_user(query):
        return User.collection.delete_one(query)
