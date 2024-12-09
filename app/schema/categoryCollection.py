from marshmallow import Schema, fields, validate

class CategorySchema(Schema):
    _id = fields.String(dump_only=True)
    name = fields.String(required=True)
    description = fields.String(required=True)
    min_hours = fields.Integer(required=True)
    created_at = fields.DateTime(required=True)
    

category_schema = CategorySchema()
