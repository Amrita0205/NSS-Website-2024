from flask import Blueprint
from app.controllers import admin_controller

# Create a Blueprint for admin routes
admin_bp = Blueprint('admin', __name__, url_prefix='/api/v1/admin')

# Route definitions
admin_bp.route('/all', methods=['GET'])(admin_controller.get_all_admins)
admin_bp.route('/id/<string:admin_id>', methods=['GET'])(admin_controller.get_admin_by_id)
admin_bp.route('/filter', methods=['GET'])(admin_controller.get_admin_by_role)
admin_bp.route('/add', methods=['POST'])(admin_controller.add_admin)
admin_bp.route('/update/<string:admin_id>', methods=['PUT'])(admin_controller.update_admin)
admin_bp.route('/delete/<string:admin_id>', methods=['DELETE'])(admin_controller.delete_admin)
admin_bp.route("/login", methods=["POST"])(admin_controller.login)
admin_bp.route("/logout", methods=["POST"])(admin_controller.logout)

# admin_bp.route("/faculty", methods=["POST"])(admin_controller.add_faculty)
