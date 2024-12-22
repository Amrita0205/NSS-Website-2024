from flask import Blueprint
from app.controllers import student_participation_controller

# Create a Blueprint for student participation routes
student_participation_bp = Blueprint('student_participation', __name__)

# Route definitions
student_participation_bp.route('/create', methods=['POST'])(student_participation_controller.create_participation)
student_participation_bp.route('/all', methods=['GET'])(student_participation_controller.get_participations)
student_participation_bp.route('/student/<string:student_id>', methods=['GET'])(student_participation_controller.get_participation_by_student)
student_participation_bp.route('/update', methods=['PUT'])(student_participation_controller.update_participation)
student_participation_bp.route('/event/<event_id>', methods=['GET'])(student_participation_controller.get_participations_by_event)
student_participation_bp.route('/category/<category_id>', methods=['GET'])(student_participation_controller.get_participations_by_category)
student_participation_bp.route('/delete', methods=['DELETE'])(student_participation_controller.delete_participation)
