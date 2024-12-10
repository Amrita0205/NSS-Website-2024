from app.utils.extensions import mongo
from datetime import datetime
from bson.objectid import ObjectId

class Announcement:
    @staticmethod
    def create_announcements(data):
        """
        Add multiple announcements to the database.
        """
        for announcement in data:
            announcement['created_at'] = datetime.utcnow()
            announcement['last_updated'] = datetime.utcnow()
        result = mongo.db.announcements.insert_many(data)
        return {"inserted_ids": [str(inserted_id) for inserted_id in result.inserted_ids]}

    @staticmethod
    def get_announcements():
        """
        Retrieve all announcements from the database.
        """
        announcements = list(mongo.db.announcements.find({}, {"_id": 1, "title": 1, "description": 1, "date": 1, "category_id": 1}))
        
        for announcement in announcements:
            announcement["_id"] = str(announcement["_id"])
            if isinstance(announcement.get('date'), datetime):
                announcement['date'] = announcement['date'].isoformat()  # Convert to ISO format
        
        return announcements

    @staticmethod
    def get_announcement_by_id(announcement_id):
        """
        Retrieve a single announcement by its ID.
        """
        announcement = mongo.db.announcements.find_one({"_id": ObjectId(announcement_id)}, {"_id": 1, "title": 1, "description": 1, "date": 1, "category_id": 1})
        
        if announcement:
            announcement["_id"] = str(announcement["_id"])
            if isinstance(announcement.get('date'), datetime):
                announcement['date'] = announcement['date'].isoformat()  # Convert to ISO format

        return announcement

    @staticmethod
    def update_announcements(announcement_updates):
        """
        Update multiple announcements. Accepts a list of {announcement_id, data}.
        """
        updated_ids = []
        for update in announcement_updates:
            announcement_id = update.get("announcement_id")
            data = update.get("data", {})
            data['last_updated'] = datetime.utcnow()

            result = mongo.db.announcements.update_one({"_id": ObjectId(announcement_id)}, {"$set": data})
            if result.modified_count > 0:
                updated_ids.append(announcement_id)
        return {"updated_ids": updated_ids}

    @staticmethod
    def delete_announcements(announcement_ids):
        """
        Delete multiple announcements by their IDs.
        """
        object_ids = [ObjectId(announcement_id) for announcement_id in announcement_ids]
        result = mongo.db.announcements.delete_many({"_id": {"$in": object_ids}})
        return {"deleted_count": result.deleted_count}
