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

class CategorySchema(Schema):
    _id = ObjectIdField(dump_only=True)  # Read-only MongoDB ObjectId
    name = fields.Str(required=True, error_messages={"required": "Name is required."})
    description = fields.Str(required=True, error_messages={"required": "Description is required."})
    min_hours = fields.Int(required=True, validate=validate.Range(min=0), error_messages={"required": "Minimum hours are required."})
    created_at = fields.DateTime(dump_only=True, default=datetime.utcnow)

    @post_dump
    def convert_fields(self, data, many=False):
        """Helper method to convert ObjectId and datetime fields."""
        if "_id" in data:
            data["_id"] = str(data["_id"])
        if "created_at" in data and isinstance(data["created_at"], datetime):
            data["created_at"] = data["created_at"].isoformat()
        return data

category_schema = CategorySchema()