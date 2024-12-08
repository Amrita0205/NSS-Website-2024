from marshmallow import Schema, fields, validates, ValidationError, post_dump
from datetime import datetime, date
from bson import ObjectId
from app.utils.extensions import mongo  # Import MongoDB instance for validation


# Custom ObjectId field for Marshmallow
class ObjectIdField(fields.Field):
    def _serialize(self, value, attr, obj, **kwargs):
        if not value:
            return None
        return str(value)  

    def _deserialize(self, value, attr, data, **kwargs):
        try:
            return ObjectId(value) 
        except Exception:
            raise ValidationError("Invalid ObjectId.")


# Participant Schema
class ParticipantSchema(Schema):
    student_id = ObjectIdField(required=True, error_messages={"required": "Student ID is required."})
    category_id = ObjectIdField(required=True, error_messages={"required": "Category ID is required."})
    event_id = ObjectIdField(required=True, error_messages={"required": "Event ID is required."})
    hours = fields.Int(required=True, validate=lambda x: x > 0, error_messages={"required": "Hours must be greater than 0."})
    created_at = fields.DateTime(required=True, error_messages={"required": "Created at is required."})


# Event Schema
class EventSchema(Schema):
    event_name = fields.Str(required=True, error_messages={"required": "Event name is required."})
    description = fields.Str(required=True, error_messages={"required": "Description is required."})
    date = fields.Date(required=True, error_messages={"required": "Date is required."})
    category_id = ObjectIdField(required=True, error_messages={"required": "Category ID is required."})
    created_by = ObjectIdField(required=True, error_messages={"required": "Created by is required."})
    created_at = fields.DateTime(required=True, error_messages={"required": "Created at is required."})
    total_hours = fields.Int(required=True, error_messages={"required": "Total Hours is required."})
    last_updated = fields.DateTime(required=True, error_messages={"required": "Last updated is required."})
    participants = fields.List(fields.Nested(ParticipantSchema), required=True)

    @validates("category_id")
    def validate_category_id(self, value):
        """
        Validate that the provided category_id exists in the categories collection.
        """
        if not mongo.db.categories.find_one({"_id": value}):
            raise ValidationError("Invalid Category ID. No matching category found.")

    @post_dump
    def convert_objectid_and_dates(self, data, many=False):
        """
        Convert ObjectId and date fields to strings after dumping.
        Ensures the data is serialized correctly for JSON responses.
        """
        if many:
            for item in data:
                self._convert_fields(item)
        else:
            self._convert_fields(data)
        return data

    def _convert_fields(self, data):
        """Helper method to convert ObjectId and date fields to strings."""
        if "_id" in data:
            data["_id"] = str(data["_id"])  
        if "created_by" in data:
            data["created_by"] = str(data["created_by"])  
        if "category_id" in data:
            data["category_id"] = str(data["category_id"])  
        if "participants" in data and isinstance(data["participants"], list):
            for participant in data["participants"]:
                if "student_id" in participant:
                    participant["student_id"] = str(participant["student_id"])  
                if "category_id" in participant:
                    participant["category_id"] = str(participant["category_id"]) 
                if "event_id" in participant:
                    participant["event_id"] = str(participant["event_id"]) 
        for date_field in ["date", "created_at", "last_updated"]:
            if isinstance(data.get(date_field), (datetime, date)):
                data[date_field] = data[date_field].isoformat()  
