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


# Total Hours Schema
class TotalHoursSchema(Schema):
    _id = ObjectIdField(dump_only=True)  # MongoDB ObjectId for the record, read-only
    student_id = ObjectIdField(required=True, error_messages={"required": "Student ID is required."})  # Reference to Users Collection

    # Categories as an array of objects
    categories = fields.List(
        fields.Dict(
            keys=fields.String(validate=validate.Length(min=1), error_messages={"required": "Category name is required."}),  # Category name
            values=fields.Float(validate=validate.Range(min=0), error_messages={"required": "Hours must be a positive value."})  # Hours for that category
        ),
        required=True,
        error_messages={"required": "Categories are required."}
    )

    total_hours = fields.Float(required=True, validate=validate.Range(min=0), error_messages={"required": "Total hours must be a positive value."})  # Total hours accumulated
    last_updated = fields.DateTime(dump_only=True)  # Timestamp for the last update
    created_at = fields.DateTime(dump_only=True)  # Timestamp when the record was created

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
        if "student_id" in data:
            data["student_id"] = str(data["student_id"])
        for date_field in ["created_at", "last_updated"]:
            if isinstance(data.get(date_field), (datetime, date)):
                data[date_field] = data[date_field].isoformat()
