from marshmallow import Schema, fields, validate
class TotalHoursSchema(Schema):
    _id = fields.String(dump_only=True)  # MongoDB ObjectId for the record, read-only
    student_id = fields.String(required=True)  # Reference to Users Collection
    
    # Categories as an array of objects
    categories = fields.List(
        fields.Dict(
            keys=fields.String(validate=validate.Length(min=1)),  # Category name
            values=fields.Float(validate=validate.Range(min=0))  # Hours for that category
        ),
        required=True
    )
    
    total_hours = fields.Float(required=True, validate=validate.Range(min=0))  # Total hours accumulated
    
    last_updated = fields.DateTime(dump_only=True)  # Timestamp for the last update
    created_at = fields.DateTime(dump_only=True)  # Timestamp when the record was created