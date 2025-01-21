from app.utils.extensions import mongo
from bson.objectid import ObjectId
from datetime import datetime

class Category:
    @staticmethod
    def create_category(data):
        """
        Add a new category to the database.
        """
        data['created_at'] = datetime.utcnow()
        data['last_updated'] = datetime.utcnow()
        result = mongo.db.categories.insert_one(data)
        return {"inserted_id": str(result.inserted_id)}

    @staticmethod
    def find_category(query):
        """
        Retrieve a single category based on the query.
        """
        category = mongo.db.categories.find_one(query)
        if category:
            category["_id"] = str(category["_id"])
            if isinstance(category.get("created_at"), datetime):
                category["created_at"] = category["created_at"].isoformat()
            if isinstance(category.get("last_updated"), datetime):
                category["last_updated"] = category["last_updated"].isoformat()
        return category

    @staticmethod
    def update_category(category_id, new_data):
        """
        Update a category's details using its ID.
        """
        new_data['last_updated'] = datetime.utcnow()
        result = mongo.db.categories.update_one({"_id": ObjectId(category_id)}, {"$set": new_data})
        return {"modified_count": result.modified_count}

    @staticmethod
    def delete_category(category_id):
        """
        Delete a category from the database using its ID.
        """
        result = mongo.db.categories.delete_one({"_id": ObjectId(category_id)})
        return {"deleted_count": result.deleted_count}

    @staticmethod
    def get_all_categories():
        """
        Retrieve all categories from the database.
        """
        categories = list(mongo.db.categories.find({}, {"_id": 1, "name": 1, "description": 1, "min_hours": 1}))
        for category in categories:
            category["_id"] = str(category["_id"])
        return categories
