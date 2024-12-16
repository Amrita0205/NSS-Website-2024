from marshmallow import Schema, fields, validates, ValidationError
from bson import ObjectId
from datetime import datetime, date
from app.utils.extensions import mongo  # MongoDB instance for validation


class ObjectIdField(fields.Field):
    def _serialize(self, value, attr, obj, **kwargs):
        return str(value) if value else None

    def _deserialize(self, value, attr, data, **kwargs):
        try:
            return ObjectId(value)
        except Exception:
            raise ValidationError("Invalid ObjectId.")


class EventSchema(Schema):
    _id = ObjectIdField(dump_only=True)  # Automatically handled by MongoDB
    event_name = fields.Str(
        required=True,
        error_messages={"required": "Event name is required."}
    )
    category_id = ObjectIdField(
        required=True,
        error_messages={"required": "Category ID is required."}
    )
    description = fields.Str(
        required=True,
        error_messages={"required": "Description is required."}
    )
    date = fields.Date(
        required=True,
        error_messages={"required": "Date is required."}
    )
    created_by = ObjectIdField(
        required=True,
        error_messages={"required": "Created by is required."}
    )
    created_at = fields.DateTime(
        dump_only=True,  # Automatically set when the event is created
        default=datetime.utcnow
    )
    participants = fields.List(
        fields.Dict(
            keys=fields.Str(validate=lambda x: x in ["roll_no", "hours"]),
            values=fields.Raw(),
        ),
        missing=[],  # Default empty list
    )
    total_hours = fields.Int(
        required=True,
        error_messages={"required": "Total hours are required."}
    )
    last_updated = fields.DateTime(
        dump_only=True,  # Automatically updated when modified
        default=datetime.utcnow
    )

    @validates("category_id")
    def validate_category_id(self, value):
        if not mongo.db.categories.find_one({"_id": value}):
            raise ValidationError("Invalid Category ID. No matching category found.")

    @validates("participants")
    def validate_participants(self, participants):
        if participants:
            for participant in participants:
                if not isinstance(participant.get("roll_no"), str):
                    raise ValidationError("Each participant must have a valid roll_no.")
                if not isinstance(participant.get("hours"), int) or participant["hours"] <= 0:
                    raise ValidationError("Hours for participants must be a positive integer.")
