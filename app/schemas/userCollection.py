from marshmallow import Schema, fields, validate

class UserSchema(Schema):
    _id = fields.ObjectId(dump_only=True)   
    first_name = fields.String(required=True)
    last_name = fields.String(required=True)
    roll_number = fields.String(required=True)
    password = fields.String(required=True)
    role = fields.String(required=True)
    email = fields.Email(required=True)
    created_by = fields.ObjectId(required=True)
    created_at = fields.DateTime(required=True)
    last_updated = fields.DateTime(required=True)
    active = fields.Boolean(required=True)

user_schema = UserSchema()
