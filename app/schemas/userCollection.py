from marshmallow import Schema, fields, validate, ValidationError, post_dump
from bson import ObjectId
from datetime import datetime, date

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

# User Schema
class UserSchema(Schema):
    _id = ObjectIdField(dump_only=True)  # MongoDB ObjectId, read-only
    first_name = fields.String(required=True, validate=validate.Length(min=1), error_messages={"required": "First name is required."})
    last_name = fields.String(required=True, validate=validate.Length(min=1), error_messages={"required": "Last name is required."})
    roll_number = fields.String(required=True, validate=validate.Length(min=1), error_messages={"required": "Roll number is required."})
    password = fields.String(required=True, validate=validate.Length(min=6), error_messages={"required": "Password is required and must be at least 6 characters."})
    role = fields.String(required=True, validate=validate.OneOf(["admin", "user"]), error_messages={"required": "Role is required and must be 'admin' or 'user'."})
    email = fields.Email(required=True, error_messages={"required": "A valid email is required."})
    created_by = ObjectIdField(required=True, error_messages={"required": "Created by is required."})
    created_at = fields.DateTime(dump_only=True)
    last_updated = fields.DateTime(dump_only=True)
    active = fields.Boolean(required=True, error_messages={"required": "Active status is required."})

    @post_dump
    def convert_objectid_and_dates(self, data, many=False):
        """
        Convert ObjectId and date fields to strings after dumping.
        """
        if many:
            for item in data:
                self._convert_fields(item)
        else:
            self._convert_fields(data)
        return data

    def _convert_fields(self, data):
        if "_id" in data:
            data["_id"] = str(data["_id"])
        if "created_by" in data:
            data["created_by"] = str(data["created_by"])
        for date_field in ["created_at", "last_updated"]:
            if isinstance(data.get(date_field), (datetime, date)):
                data[date_field] = data[date_field].isoformat()