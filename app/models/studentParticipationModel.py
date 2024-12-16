from app.utils.extensions import mongo
from bson import ObjectId
from datetime import datetime

class StudentParticipation:
    @staticmethod
    def create_participation(data):
        if isinstance(data, list):
            # Handle multiple participation records at once
            for participation in data:
                participation['created_at'] = datetime.utcnow().isoformat()
                # Fetch event details and auto-fill the hours
                event = mongo.db.events.find_one({"_id": ObjectId(participation['event_id'])})
                if event:
                    participation['hours'] = event.get('total_hours', 0)  # Assuming total_hours stores the event's hours

            result = mongo.db.student_participation.insert_many(data)
            return {"inserted_ids": [str(id) for id in result.inserted_ids]}

        elif isinstance(data, dict):
            # Handle a single participation record
            data['created_at'] = datetime.utcnow().isoformat()
            # Fetch event details and auto-fill the hours
            event = mongo.db.events.find_one({"_id": ObjectId(data['event_id'])})
            if event:
                data['hours'] = event.get('total_hours', 0)  # Assuming total_hours stores the event's hours

            result = mongo.db.student_participation.insert_one(data)
            return {"inserted_id": str(result.inserted_id)}

        else:
            raise ValueError("Input data must be a dictionary or a list of dictionaries.")

    @staticmethod
    def get_participations():
        participations = mongo.db.student_participation.find()
        result = []
        for participation in participations:
            participation['_id'] = str(participation['_id'])
            participation['student_id'] = str(participation['student_id'])
            participation['event_id'] = str(participation['event_id'])
            participation['category_id'] = str(participation['category_id'])
            result.append(participation)
        return result

    @staticmethod
    def get_participation_by_student(student_id):
        participations = mongo.db.student_participation.find({"student_id": ObjectId(student_id)})
        result = []
        for participation in participations:
            participation['_id'] = str(participation['_id'])
            participation['student_id'] = str(participation['student_id'])
            participation['event_id'] = str(participation['event_id'])
            participation['category_id'] = str(participation['category_id'])
            result.append(participation)
        return result

    @staticmethod
    def update_participation(participation_updates):
        updated_ids = []
        for update in participation_updates:
            participation_id = update.get("participation_id")
            data = update.get("data", {})
            result = mongo.db.student_participation.update_one(
                {"_id": ObjectId(participation_id)}, {"$set": data}
            )
            if result.modified_count > 0:
                updated_ids.append(str(participation_id))
        return {"updated_ids": updated_ids}

    @staticmethod
    def delete_participation(participation_ids):
        object_ids = [ObjectId(id) for id in participation_ids]
        result = mongo.db.student_participation.delete_many({"_id": {"$in": object_ids}})
        return {"deleted_count": result.deleted_count}

    @staticmethod
    def calculate_total_hours(event_id):
        # Fetch event details and calculate total hours for all participants
        event = mongo.db.events.find_one({"_id": ObjectId(event_id)})
        total_hours = event['total_hours'] if event else 0

        # Fetch all participation records for the event
        participations = mongo.db.student_participation.find({"event_id": ObjectId(event_id)})

        total_participation_hours = 0
        for participation in participations:
            total_participation_hours += participation['hours']

        return total_participation_hours
    @staticmethod
    def get_participations_by_event(event_id):
        participations = mongo.db.student_participation.find({"event_id": ObjectId(event_id)})
        result = []
        for participation in participations:
            participation['_id'] = str(participation['_id'])
            participation['student_id'] = str(participation['student_id'])
            participation['event_id'] = str(participation['event_id'])
            participation['category_id'] = str(participation['category_id'])
            result.append(participation)
        return result

    @staticmethod
    def get_participations_by_category(category_id):
                participations = mongo.db.student_participation.find({"category_id": ObjectId(category_id)})
                result = []
                for participation in participations:
                    participation['_id'] = str(participation['_id'])
                    participation['student_id'] = str(participation['student_id'])
                    participation['event_id'] = str(participation['event_id'])
                    participation['category_id'] = str(participation['category_id'])
                    result.append(participation)
                return result