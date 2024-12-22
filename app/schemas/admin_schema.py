from marshmallow import Schema, fields, validate

class AdminSchema(Schema):
    name = fields.String(required=True, validate=validate.Length(min=1, max=100))
    email = fields.Email(required=True, validate=validate.Email())
    password = fields.String(
        required=True,
        validate=validate.Length(min=6, error="Password must be at least 6 characters long.")
    )
    role = fields.String(
        required=True,
        validate=validate.OneOf(["member", "admin", "student", "teacher"], error="Invalid role.")
    )

