from marshmallow import Schema, fields, validates, ValidationError, post_dump
from datetime import datetime, date
from bson import ObjectId  

class EventSchema(Schema):
    event_name = fields.Str(required=True, error_messages={"required": "Event name is required."})
    description = fields.Str(required=True, error_messages={"required": "Description is required."})
    date = fields.Date(required=True, error_messages={"required": "Date is required."})
    category = fields.Str(required=True, error_messages={"required": "Category is required."})
    created_by = fields.Str(required=True, error_messages={"required": "Created by is required."})

    @validates("category")
    def validate_category(self, value):
        allowed_categories = ['Category 1', 'Category 2', 'Category 3', 'Category 4']
        if value not in allowed_categories:
            raise ValidationError(f"Category must be one of {allowed_categories}.")

    def handle_date(self, value):
        if isinstance(value, (datetime, date)):
            return value.isoformat() 
        return value

    @post_dump
    def convert_objectid(self, data, many=False):
        """ This method will ensure ObjectId is converted to string. """
        if isinstance(data, list):
            for item in data:
                if "_id" in item:
                    item["_id"] = str(item["_id"]) 
        else:
            if "_id" in data:
                data["_id"] = str(data["_id"])  

        if isinstance(data.get('date'), (datetime, date)):
            data['date'] = data['date'].isoformat()  
        return data
