from app.utils.extensions import db
from datetime import datetime

class User:
    collection = db['users']  # Replace 'users' with your MongoDB collection name

    @staticmethod
    def create_user(data):
        """
        Add a new user to the database.
        """
        data['created_at'] = datetime.utcnow()
        data['last_updated'] = datetime.utcnow()
        result = User.collection.insert_one(data)
        return {"inserted_id": str(result.inserted_id)}

    @staticmethod
    def find_user(query):
        """
        Retrieve a single user based on the query.
        """
        user = User.collection.find_one(query)
        if user:
            user["_id"] = str(user["_id"])
            if isinstance(user.get("created_at"), datetime):
                user["created_at"] = user["created_at"].isoformat()
            if isinstance(user.get("last_updated"), datetime):
                user["last_updated"] = user["last_updated"].isoformat()
        return user

    @staticmethod
    def update_user(query, new_data):
        """
        Update a user's details based on the query.
        """
        new_data['last_updated'] = datetime.utcnow()
        result = User.collection.update_one(query, {"$set": new_data})
        return {"modified_count": result.modified_count}

    @staticmethod
    def delete_user(query):
        """
        Delete a user from the database.
        """
        result = User.collection.delete_one(query)
        return {"deleted_count": result.deleted_count}

    @staticmethod
    def get_all_users():
        """
        Retrieve all users from the database.
        """
        users = list(User.collection.find({}, {"_id": 1, "name": 1, "email": 1}))
        for user in users:
            user["_id"] = str(user["_id"])
        return users
