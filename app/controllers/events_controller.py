from flask import Blueprint, request, jsonify
from app.models.events import Event
from app.schemas.event_schema import EventSchema
import jwt
from marshmallow.exceptions import ValidationError
from datetime import datetime, date
import os

event_blueprint = Blueprint('events', __name__)

event_schema = EventSchema()

SECRET_KEY = os.getenv('SECRET_KEY', 'your_secret_key')  

def admin_required(f):
    def wrapper(*args, **kwargs):
        token = request.headers.get("Authorization")
        if not token:
            return jsonify({"error": "Token is missing"}), 403

        try:
            # Extract JWT token from "Bearer <token>"
            token = token.split(" ")[1]
            decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            request.admin = decoded["username"]  # Store admin username in the request object
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token has expired"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Invalid token"}), 401

        return f(*args, **kwargs)

    wrapper.__name__ = f.__name__
    return wrapper


@event_blueprint.route('/events/create', methods=['POST'])
@admin_required
def create_event():
    try:
        data = request.json
        if isinstance(data, list):  
            validated_data = [event_schema.load(event) for event in data]
        else:  
            validated_data = event_schema.load(data)

        result = Event.create_event(validated_data)
        return jsonify({"message": "Event(s) created successfully!", "result": result}), 201
    except ValidationError as e:
        return jsonify({"error": e.messages}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@event_blueprint.route('/events', methods=['GET'])
def get_events():
    try:
        events = Event.get_events()

        for event in events:
            event['_id'] = str(event['_id'])  
            if isinstance(event.get('date'), (datetime, date)):  
                event['date'] = event['date'].isoformat()   

        return jsonify({"events": events}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@event_blueprint.route('/events/<event_id>', methods=['GET'])
def get_event_by_id(event_id):
    try:
        event = Event.get_event_by_id(event_id)
        if not event:
            return jsonify({"error": "Event not found"}), 404

        event['_id'] = str(event['_id'])  
        if isinstance(event.get('date'), (datetime, date)):  
            event['date'] = event['date'].isoformat()  

        return jsonify({"event": event}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@event_blueprint.route('/events/update', methods=['PUT'])
@admin_required
def update_events():
    try:
        event_updates = request.json 
        result = Event.update_events(event_updates)
        return jsonify({"message": "Event(s) updated successfully!", "result": result}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@event_blueprint.route('/events/delete', methods=['DELETE'])
@admin_required
def delete_events():
    try:
        event_ids = request.json.get("event_ids")  
        if not event_ids or not isinstance(event_ids, list):
            return jsonify({"error": "A list of event IDs is required"}), 400

        result = Event.delete_events(event_ids)
        return jsonify({"message": "Event(s) deleted successfully!", "result": result}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
