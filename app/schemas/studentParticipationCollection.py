from marshmallow import Schema, fields, validate, ValidationError, post_dump
from datetime import datetime
from bson import ObjectId

class ObjectIdField(fields.Field):
    """Custom ObjectId field for marshmallow"""
    def _serialize(self, value, attr, obj, **kwargs):
        if not value:
            return None
        return str(value)  # Convert ObjectId to string

    def _deserialize(self, value, attr, data, **kwargs):
        try:
            return ObjectId(value)  # Convert string to ObjectId
        except Exception:
            raise ValidationError("Invalid ObjectId.")



class ParticipationSchema(Schema):
    _id = ObjectIdField(dump_only=True)  # MongoDB ObjectId for the record
    student_id = ObjectIdField(required=True, error_messages={"required": "Student ID is required."})  # Reference to Users Collection
    event_id = ObjectIdField(required=True, error_messages={"required": "Event ID is required."})  # Reference to Events Collection
    category_id = ObjectIdField(required=True, error_messages={"required": "Category ID is required."})  # Reference to Category Collection
    hours = fields.Float(required=True, validate=validate.Range(min=0), error_messages={"required": "Hours are required."})
    created_at = fields.DateTime(dump_only=True, default=datetime.utcnow)

    @post_dump
    def convert_fields(self, data, many=False):
        """Helper method to convert ObjectId and datetime fields."""
        if "_id" in data:
            data["_id"] = str(data["_id"])
        for field in ["student_id", "event_id", "category_id"]:
            if field in data:
                data[field] = str(data[field])
        if "created_at" in data and isinstance(data["created_at"], datetime):
            data["created_at"] = data["created_at"].isoformat()
        return data

participation_schema = ParticipationSchema()
