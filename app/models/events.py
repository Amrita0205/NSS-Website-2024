from app.utils.extensions import mongo
from datetime import datetime, date
from bson.objectid import ObjectId


class Event:
    @staticmethod
    def create_event(data):
        # Prepare data for multiple events if a list is provided
        if isinstance(data, list):
            for event in data:
                if isinstance(event.get('date'), (datetime, date)):
                    event['date'] = event['date'].isoformat()  # Ensure correct date format
                event['last_updated'] = datetime.utcnow().isoformat()  # Set last updated time
                event['created_at'] = datetime.utcnow().isoformat()  # Set created at time
            result = mongo.db.events.insert_many(data)
            return {"inserted_ids": [str(id) for id in result.inserted_ids]}

        # Handle single event creation
        elif isinstance(data, dict):
            if isinstance(data.get('date'), (datetime, date)):
                data['date'] = data['date'].isoformat()  # Ensure correct date format
            data['last_updated'] = datetime.utcnow().isoformat()  # Set last updated time
            data['created_at'] = datetime.utcnow().isoformat()  # Set created at time
            result = mongo.db.events.insert_one(data)
            return {"inserted_id": str(result.inserted_id)}

        else:
            raise ValueError("Input data must be a dictionary or a list of dictionaries.")

    @staticmethod
    def get_events():
        events = list(mongo.db.events.find({}, {"_id": 1, "event_name": 1, "description": 1, "date": 1, "category_id": 1}))

        for event in events:
            event['_id'] = str(event['_id'])  # Convert ObjectId to string
            if isinstance(event.get('date'), str):  # Ensure date is correctly formatted
                event['date'] = datetime.fromisoformat(event['date'])

        return events

    @staticmethod
    def get_event_by_id(event_id):
        event = mongo.db.events.find_one({"_id": ObjectId(event_id)}, {"_id": 1, "event_name": 1, "description": 1, "date": 1, "category_id": 1, "participants": 1})

        if event:
            event['_id'] = str(event['_id'])  # Convert ObjectId to string
            if isinstance(event.get('date'), str):  # Ensure date is correctly formatted
                event['date'] = datetime.fromisoformat(event['date'])

        return event

    @staticmethod
    def update_events(event_updates):
        updated_ids = []
        for update in event_updates:
            event_id = update.get("event_id")
            data = update.get("data", {})
            data['last_updated'] = datetime.utcnow().isoformat()  # Update the last_updated time

            if isinstance(data.get('date'), (datetime, date)):
                data['date'] = data['date'].isoformat()  # Ensure date is correctly formatted

            result = mongo.db.events.update_one({"_id": ObjectId(event_id)}, {"$set": data})
            if result.modified_count > 0:
                updated_ids.append(str(event_id))
        return {"updated_ids": updated_ids}

    @staticmethod
    def delete_events(event_ids):
        object_ids = [ObjectId(event_id) for event_id in event_ids]
        result = mongo.db.events.delete_many({"_id": {"$in": object_ids}})
        return {"deleted_count": result.deleted_count}
