from app.extensions import db

class Category:
    collection = db['categories']  # Replace 'categories' with your MongoDB collection name

    @staticmethod
    def create_category(data):
        return Category.collection.insert_one(data)

    @staticmethod
    def find_category(query):
        return Category.collection.find_one(query)

    @staticmethod
    def update_category(query, new_data):
        return Category.collection.update_one(query, {"$set": new_data})

    @staticmethod
    def delete_category(query):
        return Category.collection.delete_one(query)
