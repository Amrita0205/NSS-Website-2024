from flask import request, jsonify, Blueprint, abort
from bson.objectid import ObjectId
from app.utils.extensions import mongo
from datetime import datetime
from flask.views import MethodView

user_bp = Blueprint('user', __name__)

class UserAPI(MethodView):
    # Get all users
    def get(self):
        try:
            users = mongo.db.users.find({"active": True})  # Fetch all active users

            users_list = [
                {
                    "id": str(user["_id"]),
                    "first_name": user["first_name"],
                    "last_name": user["last_name"],
                    "email": user.get("email"),
                    "role": user.get("role"),
                    "created_at": user["created_at"].isoformat() if isinstance(user.get("created_at"), datetime) else None,
                    "last_updated": user["last_updated"].isoformat() if isinstance(user.get("last_updated"), datetime) else None,
                    "active": user.get("active")
                } for user in users
            ]
            return jsonify(users_list), 200

        except Exception as e:
            return jsonify({
                "error": "Internal Server Error",
                "message": f"An error occurred: {str(e)}"
            }), 500

    # Add a new user
    def post(self):
        try:
            data = request.json
            required_fields = ["first_name", "last_name", "email", "role"]
            if not all(field in data for field in required_fields):
                abort(400, description="Missing required fields")

            user = {
                "first_name": data["first_name"],
                "last_name": data["last_name"],
                "email": data["email"],
                "role": data["role"],
                "created_at": datetime.utcnow(),
                "last_updated": datetime.utcnow(),
                "active": True
            }

            result = mongo.db.users.insert_one(user)
            return jsonify({"message": "User added successfully", "id": str(result.inserted_id)}), 201

        except Exception as e:
            return jsonify({
                "error": "Internal Server Error",
                "message": f"An error occurred: {str(e)}"
            }), 500


class UserDetailAPI(MethodView):
    # Get a specific user by ID
    def get(self, user_id):
        try:
            user = mongo.db.users.find_one({"_id": ObjectId(user_id), "active": True})
            if not user:
                abort(404, description="User not found")

            return jsonify({
                "id": str(user["_id"]),
                "first_name": user["first_name"],
                "last_name": user["last_name"],
                "email": user.get("email"),
                "role": user.get("role"),
                "created_at": user["created_at"].isoformat() if isinstance(user.get("created_at"), datetime) else None,
                "last_updated": user["last_updated"].isoformat() if isinstance(user.get("last_updated"), datetime) else None,
                "active": user.get("active")
            }), 200

        except Exception as e:
            return jsonify({
                "error": "Internal Server Error",
                "message": f"An error occurred: {str(e)}"
            }), 500

    # Update a user
    def put(self, user_id):
        try:
            data = request.json
            update_fields = {k: v for k, v in data.items() if k in ["first_name", "last_name", "email", "role", "active"]}
            if not update_fields:
                abort(400, description="No valid fields to update")

            update_fields["last_updated"] = datetime.utcnow()
            result = mongo.db.users.update_one({"_id": ObjectId(user_id)}, {"$set": update_fields})
            if result.matched_count == 0:
                abort(404, description="User not found")

            return jsonify({"message": "User updated successfully"}), 200

        except Exception as e:
            return jsonify({
                "error": "Internal Server Error",
                "message": f"An error occurred: {str(e)}"
            }), 500

    # Delete a user
    def delete(self, user_id):
        try:
            result = mongo.db.users.update_one({"_id": ObjectId(user_id)}, {"$set": {"active": False, "last_updated": datetime.utcnow()}})
            if result.matched_count == 0:
                abort(404, description="User not found")

            return jsonify({"message": "User deleted (soft delete)"}), 200

        except Exception as e:
            return jsonify({
                "error": "Internal Server Error",
                "message": f"An error occurred: {str(e)}"
            }), 500


# Register the user API routes
user_view = UserAPI.as_view('user_api')
user_detail_view = UserDetailAPI.as_view('user_detail_api')

user_bp.add_url_rule('/users', view_func=user_view, methods=['GET', 'POST'])
user_bp.add_url_rule('/users/<string:user_id>', view_func=user_detail_view, methods=['GET', 'PUT', 'DELETE'])
