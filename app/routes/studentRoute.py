# # from flask import Blueprint
# # from app.controllers import studentController

# # # Create a Blueprint for student routes
# # student_bp = Blueprint('student', __name__)

# # # Route definitions
# # student_bp.route('/students', methods=['GET'])(studentController.get_students)
# # student_bp.route('/students/<string:student_id>', methods=['GET'])(studentController.get_student)
# # student_bp.route('/students', methods=['POST'])(studentController.add_student)
# # student_bp.route('/students/<string:student_id>', methods=['PUT'])(studentController.update_student)
# # student_bp.route('/students/<string:student_id>', methods=['DELETE'])(studentController.delete_student)
# from flask import Blueprint
# from app.controllers.studentController import StudentAPI, StudentDetailAPI

# # Create a Blueprint for student routes
# student_bp = Blueprint('student', __name__)

# # Route definitions using MethodView
# student_bp.add_url_rule('/students', view_func=StudentAPI.as_view('students'))  # Handles GET and POST
# student_bp.add_url_rule('/students/<string:student_id>', view_func=StudentDetailAPI.as_view('student_detail'))  # Handles GET, PUT, DELETE
from flask import Blueprint
from app.controllers.studentController import StudentAPI, StudentDetailAPI

# Create a Blueprint for student routes
student_bp = Blueprint('student', __name__)

# Route definitions using MethodView for student-related endpoints
student_bp.add_url_rule('/students', view_func=StudentAPI.as_view('students'))  # Handles GET and POST for all students
student_bp.add_url_rule('/students/<string:student_id>', view_func=StudentDetailAPI.as_view('student_detail'))  # Handles GET, PUT, DELETE for specific student by ID
