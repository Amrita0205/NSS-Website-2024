# app/controllers/student_participation_controller.py
from flask import Blueprint, request, jsonify
from app.models.studentParticipationModel import StudentParticipation
from app.schemas.studentParticipationCollection import StudentParticipationSchema
from marshmallow.exceptions import ValidationError
from app.utils.middleware import check_permission
from app.models.admin import Role

student_participation_blueprint = Blueprint('student_participation', __name__)
student_participation_schema = StudentParticipationSchema()

@student_participation_blueprint.route('/create', methods=['POST'])
@check_permission([Role.FACULTY, Role.SECRETARY])
def create_participation():
    try:
        data = request.json
        if isinstance(data, list):
            validated_data = [student_participation_schema.load(participation) for participation in data]
        else:
            validated_data = student_participation_schema.load(data)

        result = StudentParticipation.create_participation(validated_data)
        return jsonify({"message": "Participation record(s) created successfully!", "result": result}), 201
    except ValidationError as e:
        return jsonify({"error": e.messages}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@student_participation_blueprint.route('/all', methods=['GET'])
def get_participations():
    try:
        participations = StudentParticipation.get_participations()
        return jsonify({"participations": participations}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@student_participation_blueprint.route('/student/<student_id>', methods=['GET'])
def get_participation_by_student(student_id):
    try:
        participations = StudentParticipation.get_participation_by_student(student_id)
        return jsonify({"participations": participations}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@student_participation_blueprint.route('/update', methods=['PUT'])
@check_permission([Role.FACULTY, Role.SECRETARY])
def update_participation():
    try:
        participation_updates = request.json
        result = StudentParticipation.update_participation(participation_updates)
        return jsonify({"message": "Participation record(s) updated successfully!", "result": result}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@student_participation_blueprint.route('/delete', methods=['DELETE'])
@check_permission([Role.FACULTY, Role.SECRETARY])
def delete_participation():
    try:
        participation_ids = request.json.get("participation_ids")
        if not participation_ids or not isinstance(participation_ids, list):
            return jsonify({"error": "A list of participation IDs is required"}), 400

        result = StudentParticipation.delete_participation(participation_ids)
        return jsonify({"message": "Participation record(s) deleted successfully!", "result": result}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@student_participation_blueprint.route('/event/<string:event_id>', methods=['GET'])
def get_participations_by_event(event_id):
    try:
        participations = StudentParticipation.get_participations_by_event(event_id)
        return jsonify({"participations": participations}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@student_participation_blueprint.route('/category/<string:category_id>', methods=['GET'])
def get_participations_by_category(category_id):
    try:
        participations = StudentParticipation.get_participations_by_category(category_id)
        return jsonify({"participations": participations}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500