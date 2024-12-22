from marshmallow import Schema, fields, validates, ValidationError, post_dump
from datetime import datetime
from bson import ObjectId

class ObjectIdField(fields.Field):
    """Custom ObjectId field for marshmallow"""         
    def _serialize(self, value, attr, obj, **kwargs):
        if not value:
            return None
        return str(value)  

    def _deserialize(self, value, attr, data, **kwargs):
        try:
            return ObjectId(value)  
        except Exception:
            raise ValidationError("Invalid ObjectId.")  


class AnnouncementSchema(Schema):
    title = fields.Str(required=True, error_messages={"required": "Title is required."})
    description = fields.Str(required=True, error_messages={"required": "Description is required."})
    created_by = ObjectIdField(required=True, error_messages={"required": "Created by is required."})
    image_url = fields.Str(required=False)
    created_at = fields.DateTime(default=datetime.utcnow, error_messages={"required": "Created at is required."})
    last_updated = fields.DateTime(default=datetime.utcnow, error_messages={"required": "Last updated is required."})

    @post_dump
    def convert_objectid_and_dates(self, data, many=False):
        """Helper method to convert ObjectId and datetime to string."""
        if isinstance(data, list):
            for item in data:
                self._convert_fields(item)
        else:
            self._convert_fields(data)
        return data

    def _convert_fields(self, data):
        """Converts ObjectId to string and datetime to ISO format."""
        if "_id" in data:
            data["_id"] = str(data["_id"])  
        if "created_by" in data:
            data["created_by"] = str(data["created_by"])  
        for date_field in ["created_at", "last_updated"]:
            if isinstance(data.get(date_field), datetime):
                data[date_field] = data[date_field].isoformat()  
        return data
