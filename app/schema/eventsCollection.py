from marshmallow import Schema, fields, validate

class EventsSchema(Schema):
    _id = fields.String(dump_only=True)
    event_name = fields.String(required=True)
    category_id = fields.ObjectId(required=True)
    description = fields.String(required=True)
    date = fields.DateTime(required=True)
    created_by = fields.ObjectId(required=True)
    created_at = fields.DateTime(required=True)
    last_updated = fields.DateTime(required=True)
    participants = fields.List(fields.ObjectId(), required=True)
    total_hours = fields.Integer(required=True)
events_schema = EventsSchema()