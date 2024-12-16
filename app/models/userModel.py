from flask import jsonify
from bson.objectid import ObjectId
from datetime import datetime
from app import mongo

class User:
    collection = mongo.db['users']  # MongoDB collection

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
        users = list(User.collection.find({}, {"_id": 1, "first_name": 1, "last_name": 1, "email": 1}))
        for user in users:
            user["_id"] = str(user["_id"])
        return users

    @staticmethod
    def get_students_with_batch_and_branch():
        """
        Retrieve students with their batch and branch details based on their roll numbers.
        """
        students = User.collection.find({"role": "student", "active": True})
        students_with_details = []

        for student in students:
            batch = student["roll_no"][:4]  # Extract the batch year
            branch_code = student["roll_no"][2:4]  # Extract the branch code (e.g., 'CS', 'AD', 'MN')

            branch_mapping = {
                "CS": "CSE",
                "AD": "AIDS",
                "MN": "MNC"
            }

            student_details = {
                "id": str(student["_id"]),
                "first_name": student["first_name"],
                "last_name": student["last_name"],
                "roll_no": student["roll_no"],
                "email": student.get("email"),
                "batch": int(batch),
                "branch": branch_mapping.get(branch_code, "Unknown"),
                "created_at": student["created_at"].isoformat() if isinstance(student.get("created_at"), datetime) else None,
                "last_updated": student["last_updated"].isoformat() if isinstance(student.get("last_updated"), datetime) else None
            }
            students_with_details.append(student_details)

        return students_with_details
