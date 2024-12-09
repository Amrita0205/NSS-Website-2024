from marshmallow import Schema, fields, validate

class ParticipationSchema(Schema):
    _id = fields.String(dump_only=True)  # MongoDB ObjectId for the record, read-only
    student_id = fields.String(required=True)  # Reference to Users Collection
    event_id = fields.String(required=True)  # Reference to Events Collection
    category_id = fields.String(required=True)  # Reference to Category Collection
    hours = fields.Float(required=True)  # Number of hours earned
    created_at = fields.DateTime(dump_only=True)  # Timestamp when attendance was recorded

participation_schema = ParticipationSchema()
