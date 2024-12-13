from flask import Blueprint
from app.controllers.user_controller import UserAPI, UserDetailAPI

# Create a Blueprint for user routes
user_bp = Blueprint('user', __name__)

# Route definitions using MethodView for user-related endpoints
user_bp.add_url_rule('/users', view_func=UserAPI.as_view('users'))  # Handles GET and POST for all users
user_bp.add_url_rule('/users/<string:user_id>', view_func=UserDetailAPI.as_view('user_detail'))  # Handles GET, PUT, DELETE for specific user by ID
