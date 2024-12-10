from app.utils.extensions import db
from datetime import datetime

class Participation:
    collection = db['participations']  # Replace 'participations' with your MongoDB collection name

    @staticmethod
    def create_participation(data):
        """
        Add a new participation entry to the database.
        """
        data['created_at'] = datetime.utcnow()
        data['last_updated'] = datetime.utcnow()
        result = Participation.collection.insert_one(data)
        return {"inserted_id": str(result.inserted_id)}

    @staticmethod
    def find_participation(query):
        """
        Retrieve a single participation entry based on the query.
        """
        participation = Participation.collection.find_one(query)
        if participation:
            participation["_id"] = str(participation["_id"])
            if isinstance(participation.get("created_at"), datetime):
                participation["created_at"] = participation["created_at"].isoformat()
            if isinstance(participation.get("last_updated"), datetime):
                participation["last_updated"] = participation["last_updated"].isoformat()
        return participation

    @staticmethod
    def update_participation(query, new_data):
        """
        Update a participation entry's details based on the query.
        """
        new_data['last_updated'] = datetime.utcnow()
        result = Participation.collection.update_one(query, {"$set": new_data})
        return {"modified_count": result.modified_count}

    @staticmethod
    def delete_participation(query):
        """
        Delete a participation entry from the database.
        """
        result = Participation.collection.delete_one(query)
        return {"deleted_count": result.deleted_count}

    @staticmethod
    def get_all_participations():
        """
        Retrieve all participations from the database.
        """
        participations = list(Participation.collection.find({}, {"_id": 1, "event_name": 1, "user_id": 1}))
        for participation in participations:
            participation["_id"] = str(participation["_id"])
        return participations
