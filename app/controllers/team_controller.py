from flask import Blueprint, request, jsonify
from app.models.team import Team
from app.Schemas.team_schema import TeamSchema
from marshmallow.exceptions import ValidationError
import jwt
import os
from datetime import datetime

team_blueprint = Blueprint("team", __name__)
team_schema = TeamSchema()


#check
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

@team_blueprint.route('/team/create', methods=['POST'])
@admin_required
def add_member():
    try:
        data = request.json
        data['created_at'] = data.get('created_at', datetime.utcnow())
        data['last_updated'] = data.get('last_updated', datetime.utcnow())

        validated_data = team_schema.load(data)
        member_id = Team.add_member(validated_data)
        return jsonify({"message": "Team member added successfully!", "id": member_id}), 201
    except ValidationError as e:
        return jsonify({"error": e.messages}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@team_blueprint.route('/team', methods=['GET'])
def get_all_members():
    try:
        members = Team.get_all_members()
        return jsonify({"team": members}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@team_blueprint.route('/team/<member_id>', methods=['GET'])
def get_member(member_id):
    try:
        member = Team.get_member_by_id(member_id)
        if not member:
            return jsonify({"error": "Team member not found"}), 404
        return jsonify({"team_member": member}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@team_blueprint.route('/team/update/<member_id>', methods=['PUT'])
@admin_required
def update_member(member_id):
    try:
        data = request.json
        validated_data = team_schema.load(data, partial=True)

        validated_data['last_updated'] = datetime.utcnow()

        updated = Team.update_member(member_id, validated_data)
        if updated:
            return jsonify({"message": "Team member updated successfully!"}), 200
        return jsonify({"error": "No updates made."}), 400
    except ValidationError as e:
        return jsonify({"error": e.messages}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@team_blueprint.route('/team/delete/<member_id>', methods=['DELETE'])
@admin_required
def delete_member(member_id):
    try:
        deleted = Team.delete_member(member_id)
        if deleted:
            return jsonify({"message": "Team member deleted successfully!"}), 200
        return jsonify({"error": "Team member not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
