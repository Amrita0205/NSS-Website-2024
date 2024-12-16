# app/schemas/student_participation_schema.py
from marshmallow import Schema, fields, validates, ValidationError
from bson import ObjectId
from app.utils.extensions import mongo
from datetime import datetime
class ObjectIdField(fields.Field):
    def _serialize(self, value, attr, obj, **kwargs):
        return str(value) if value else None

    def _deserialize(self, value, attr, data, **kwargs):
        try:
            return ObjectId(value)
        except Exception:
            raise ValidationError("Invalid ObjectId.")

class StudentParticipationSchema(Schema):
    _id = ObjectIdField(dump_only=True)
    student_id = ObjectIdField(
        required=True, 
        error_messages={"required": "Student ID is required."}
    )
    event_id = ObjectIdField(
        required=True, 
        error_messages={"required": "Event ID is required."}
    )
    category_id = ObjectIdField(
        required=True, 
        error_messages={"required": "Category ID is required."}
    )
    hours = fields.Int(
        dump_only=True,  # The hours will be fetched from the event
    )
    created_at = fields.DateTime(
        dump_only=True,
        default=datetime.utcnow
    )

    @validates("student_id")
    def validate_student_id(self, value):
        student = mongo.db.users.find_one({"_id": value})
        if not student:
            raise ValidationError("Invalid Student ID. No matching student found.")

    @validates("event_id")
    def validate_event_id(self, value):
        event = mongo.db.events.find_one({"_id": value})
        if not event:
            raise ValidationError("Invalid Event ID. No matching event found.")

    @validates("category_id")
    def validate_category_id(self, value):
        category = mongo.db.categories.find_one({"_id": value})
        if not category:
            raise ValidationError("Invalid Category ID. No matching category found.")
