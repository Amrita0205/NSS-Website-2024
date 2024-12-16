from flask import Blueprint
from app.controllers import category_controller

# Create a Blueprint for category routes
category_bp = Blueprint('category', __name__)

# Route definitions
category_bp.route('/all', methods=['GET'])(category_controller.get_all_categories)
category_bp.route('/id/<string:category_id>', methods=['GET'])(category_controller.get_category)
category_bp.route('/add', methods=['POST'])(category_controller.create_category)
category_bp.route('/update/<string:category_id>', methods=['PUT'])(category_controller.update_category)
category_bp.route('/delete/<string:category_id>', methods=['DELETE'])(category_controller.delete_category)
