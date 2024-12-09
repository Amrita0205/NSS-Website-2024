from app.utils.extensions import mongo
from datetime import datetime
from bson.objectid import ObjectId
from bson.errors import InvalidId


class Team:
    @staticmethod
    def add_member(data):
        """
        Add a new team member to the database.
        Automatically adds created_at and last_updated timestamps.
        """
        data['created_at'] = datetime.utcnow()
        data['last_updated'] = datetime.utcnow()
        result = mongo.db.team.insert_one(data)
        return str(result.inserted_id)

    @staticmethod
    def get_all_members():
        """
        Retrieve all team members sorted by priority (ascending).
        Converts ObjectId to string for serialization.
        """
        members = list(mongo.db.team.find().sort("priority", 1))  # Sort by priority
        for member in members:
            member["_id"] = str(member["_id"])
            member["created_at"] = member["created_at"].isoformat() if "created_at" in member else None
            member["last_updated"] = member["last_updated"].isoformat() if "last_updated" in member else None
        return members

    @staticmethod
    def get_member_by_id(member_id):
        """
        Retrieve a single team member by their ID.
        Converts ObjectId to string for serialization.
        """
        try:
            member = mongo.db.team.find_one({"_id": ObjectId(member_id)})
            if member:
                member["_id"] = str(member["_id"])
                member["created_at"] = member["created_at"].isoformat() if "created_at" in member else None
                member["last_updated"] = member["last_updated"].isoformat() if "last_updated" in member else None
            return member
        except InvalidId:
            return {"error": "Invalid member ID"}

    @staticmethod
    def update_member(member_id, data):
        """
        Update a team member's details.
        Automatically updates the last_updated timestamp.
        """
        try:
            data['last_updated'] = datetime.utcnow()
            result = mongo.db.team.update_one({"_id": ObjectId(member_id)}, {"$set": data})
            return {"modified_count": result.modified_count}
        except InvalidId:
            return {"error": "Invalid member ID"}

    @staticmethod
    def delete_member(member_id):
        """
        Delete a team member by their ID.
        """
        try:
            result = mongo.db.team.delete_one({"_id": ObjectId(member_id)})
            return {"deleted_count": result.deleted_count}
        except InvalidId:
            return {"error": "Invalid member ID"}

    @staticmethod
    def bulk_delete_members(member_ids):
        """
        Delete multiple team members by their IDs.
        """
        try:
            object_ids = [ObjectId(member_id) for member_id in member_ids]
            result = mongo.db.team.delete_many({"_id": {"$in": object_ids}})
            return {"deleted_count": result.deleted_count}
        except InvalidId:
            return {"error": "One or more invalid member IDs"}
