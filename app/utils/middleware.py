from flask import request, jsonify
import jwt
from functools import wraps
from bson.objectid import ObjectId
from app.utils.extensions import mongo
from app.models.admin import Role
from app.utils.config import Config

def check_permission(allowed_roles):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            token = request.cookies.get("token")
            if not token:
                return jsonify({"error": "Authentication token is missing"}), 401
            try:
                decoded_token = jwt.decode(token, Config.SECRET_KEY, algorithms=["HS256"])
                admin_id = decoded_token.get("admin_id")

                # Fetch admin from the database
                admin = mongo.db.admins.find_one({"_id": ObjectId(admin_id)})
                if not admin:
                    return jsonify({"error": "Admin not found"}), 401

                # Check if the admin's role is in the allowed roles
                admin_roles = admin.get("role")
                if isinstance(admin_roles, str):
                    admin_roles = [admin_roles]
                if not any(role in allowed_roles for role in admin_roles):
                    return jsonify({"error": "Unauthorized: Insufficient role permissions"}), 403

                return func(*args, **kwargs)
            except jwt.ExpiredSignatureError:
                return jsonify({"error": "Token has expired"}), 401
            except jwt.InvalidTokenError:
                return jsonify({"error": "Invalid token"}), 401
            except Exception as e:
                return jsonify({"error": str(e)}), 500
        return wrapper
    return decorator
