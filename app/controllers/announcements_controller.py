from flask import Blueprint, request, jsonify
from app.models.announcements import Announcement
from app.Schemas.announcements_schema import AnnouncementSchema
from marshmallow.exceptions import ValidationError
from datetime import datetime
import jwt
import os

announcement_blueprint = Blueprint('announcements', __name__)

announcement_schema = AnnouncementSchema()

# Middleware to ensure the admin is authenticated
# def admin_required(f):
#     def wrapper(*args, **kwargs):
#         admin_password = request.headers.get("Admin-Password")
#         if admin_password != "your_admin_password":  # Replace with secure password storage
#             return jsonify({"error": "Unauthorized"}), 403
#         return f(*args, **kwargs)
#     wrapper.__name__ = f.__name__
#     return wrapper

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

@announcement_blueprint.route('/announcements/create', methods=['POST'])
@admin_required
def create_announcements():
    try:
        data = request.json
        if isinstance(data, list):  
            for announcement in data:
                announcement['created_at'] = announcement.get('created_at', datetime.utcnow())
                announcement['last_updated'] = announcement.get('last_updated', datetime.utcnow())
        else:
            data['created_at'] = data.get('created_at', datetime.utcnow())
            data['last_updated'] = data.get('last_updated', datetime.utcnow())

        validated_data = [announcement_schema.load(announcement) for announcement in data] if isinstance(data, list) else [announcement_schema.load(data)]
        result = Announcement.create_announcements(validated_data)
        return jsonify({"message": "Announcements created successfully!", "result": result}), 201
    except ValidationError as e:
        return jsonify({"error": e.messages}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@announcement_blueprint.route('/announcements', methods=['GET'])
def get_announcements():
    try:
        announcements = Announcement.get_announcements()
        return jsonify({"announcements": announcements}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@announcement_blueprint.route('/announcements/<announcement_id>', methods=['GET'])
def get_announcement_by_id(announcement_id):
    try:
        announcement = Announcement.get_announcement_by_id(announcement_id)
        if not announcement:
            return jsonify({"error": "Announcement not found"}), 404
        return jsonify({"announcement": announcement}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@announcement_blueprint.route('/announcements/update', methods=['PUT'])
@admin_required
def update_announcements():
    try:
        announcement_updates = request.json
        
        if not isinstance(announcement_updates, list):
            return jsonify({"error": "Expected a list of announcements to update."}), 400
        
        updated_ids = []
        for update in announcement_updates:
            if not isinstance(update, dict) or "announcement_id" not in update or "data" not in update:
                return jsonify({"error": "Each update must contain 'announcement_id' and 'data'."}), 400
            
            announcement_id = update.get("announcement_id")
            data = update.get("data", {})
            
            data['last_updated'] = datetime.utcnow()
            
            result = Announcement.update_announcements(announcement_id, data)
            if result:
                updated_ids.append(announcement_id)
        
        return jsonify({"message": "Announcements updated successfully!", "updated_ids": updated_ids}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@announcement_blueprint.route('/announcements/delete', methods=['DELETE'])
@admin_required
def delete_announcements():
    try:
        announcement_ids = request.json.get("announcement_ids")
        if not announcement_ids or not isinstance(announcement_ids, list):
            return jsonify({"error": "A list of announcement IDs is required"}), 400

        result = Announcement.delete_announcements(announcement_ids)
        return jsonify({"message": "Announcements deleted successfully!", "result": result}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
