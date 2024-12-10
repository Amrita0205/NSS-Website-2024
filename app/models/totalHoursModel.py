from app.utils.extensions import db
from datetime import datetime

class TotalHours:
    collection = db['total_hours']  # Replace 'total_hours' with your MongoDB collection name

    @staticmethod
    def create_total_hours(data):
        """
        Add a new total hours entry to the database.
        """
        data['created_at'] = datetime.utcnow()
        data['last_updated'] = datetime.utcnow()
        result = TotalHours.collection.insert_one(data)
        return {"inserted_id": str(result.inserted_id)}

    @staticmethod
    def find_total_hours(query):
        """
        Retrieve a single total hours entry based on the query.
        """
        total_hours = TotalHours.collection.find_one(query)
        if total_hours:
            total_hours["_id"] = str(total_hours["_id"])
            if isinstance(total_hours.get("created_at"), datetime):
                total_hours["created_at"] = total_hours["created_at"].isoformat()
            if isinstance(total_hours.get("last_updated"), datetime):
                total_hours["last_updated"] = total_hours["last_updated"].isoformat()
        return total_hours

    @staticmethod
    def update_total_hours(query, new_data):
        """
        Update a total hours entry's details based on the query.
        """
        new_data['last_updated'] = datetime.utcnow()
        result = TotalHours.collection.update_one(query, {"$set": new_data})
        return {"modified_count": result.modified_count}

    @staticmethod
    def delete_total_hours(query):
        """
        Delete a total hours entry from the database.
        """
        result = TotalHours.collection.delete_one(query)
        return {"deleted_count": result.deleted_count}

    @staticmethod
    def get_all_total_hours():
        """
        Retrieve all total hours entries from the database.
        """
        total_hours_list = list(TotalHours.collection.find({}, {"_id": 1, "user_id": 1, "hours": 1}))
        for total_hours in total_hours_list:
            total_hours["_id"] = str(total_hours["_id"])
        return total_hours_list
