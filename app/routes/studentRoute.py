from flask import Blueprint
from app.controllers import student_controller

# Create a Blueprint for student routes
student_bp = Blueprint('student', __name__)

# Route definitions
student_bp.route('/all', methods=['GET'])(student_controller.get_all_students)
student_bp.route('/id/<string:student_id>', methods=['GET'])(student_controller.get_student)
student_bp.route('/add', methods=['POST'])(student_controller.add_student)
student_bp.route('/update/<string:student_id>', methods=['PUT'])(student_controller.update_student)
student_bp.route('/delete/<string:student_id>', methods=['DELETE'])(student_controller.delete_student)
