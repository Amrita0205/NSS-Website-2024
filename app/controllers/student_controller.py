from flask import request, jsonify, Blueprint, abort
from bson.objectid import ObjectId
from app import mongo
from app.utils.middleware import check_permission
from app.models.admin import Role
from app.utils.config import Config
from datetime import datetime

student_bp = Blueprint('student', __name__)

# Get all students
# @student_bp.route('/all', methods=['GET'])
def get_all_students():
    try:
        students = mongo.db.users.find({"role": "student", "active": True})
        students_list = [
            {
                "id": str(student["_id"]),
                "first_name": student["first_name"],
                "last_name": student["last_name"],
                "roll_no": student.get("roll_no"),
                "email": student.get("email"),
                "created_at": student["created_at"].isoformat() if isinstance(student.get("created_at"), datetime) else None,
                "last_updated": student["last_updated"].isoformat() if isinstance(student.get("last_updated"), datetime) else None
            } for student in students
        ]
        return jsonify(students_list), 200
    except Exception as e:
        return jsonify({
            "error": "Internal Server Error",
            "message": f"An error occurred: {str(e)}"
        }), 500

# Add a new student
# @student_bp.route('/add', methods=['POST'])
@check_permission([Role.FACULTY, Role.SECRETARY])
def add_student():
    try:
        data = request.json
        required_fields = ["first_name", "last_name", "email", "role"]
        if not all(field in data for field in required_fields):
            abort(400, description="Missing required fields")

        student = {
            "first_name": data["first_name"],
            "last_name": data["last_name"],
            "roll_no": data.get("roll_no"),
            "email": data["email"],
            "role": data["role"],
            "created_at": datetime.utcnow(),
            "last_updated": datetime.utcnow(),
            "active": True
        }
        result = mongo.db.users.insert_one(student)
        return jsonify({"message": "Student added successfully", "id": str(result.inserted_id)}), 201
    except Exception as e:
        return jsonify({
            "error": "Internal Server Error",
            "message": f"An error occurred: {str(e)}"
        }), 500

# Get a specific student by ID
# @student_bp.route('/id/<student_id>', methods=['GET'])
def get_student(student_id):
    try:
        student = mongo.db.users.find_one({"_id": ObjectId(student_id), "role": "student", "active": True})
        if not student:
            abort(404, description="Student not found")

        return jsonify({
            "id": str(student["_id"]),
            "first_name": student["first_name"],
            "last_name": student["last_name"],
            "roll_no": student.get("roll_no"),
            "email": student.get("email"),
            "created_by": str(student.get("created_by")) if student.get("created_by") else None,
            "created_at": student["created_at"].isoformat() if isinstance(student.get("created_at"), datetime) else None,
            "last_updated": student["last_updated"].isoformat() if isinstance(student.get("last_updated"), datetime) else None,
            "active": student["active"]
        }), 200
    except Exception as e:
        return jsonify({
            "error": "Internal Server Error",
            "message": f"An error occurred: {str(e)}"
        }), 500

# Update a specific student
# @student_bp.route('/update/<student_id>', methods=['PUT'])
@check_permission([Role.FACULTY, Role.SECRETARY])
def update_student(student_id):
    try:
        data = request.json
        update_fields = {k: v for k, v in data.items() if k in ["first_name", "last_name", "roll_no", "email", "active"]}
        if not update_fields:
            abort(400, description="No valid fields to update")

        update_fields["last_updated"] = datetime.utcnow()
        result = mongo.db.users.update_one({"_id": ObjectId(student_id)}, {"$set": update_fields})
        
        if result.matched_count == 0:
            abort(404, description="Student not found")

        return jsonify({"message": "Student updated successfully"}), 200
    except Exception as e:
        return jsonify({
            "error": "Internal Server Error",
            "message": f"An error occurred: {str(e)}"
        }), 500

# Soft delete a specific student
# @student_bp.route('/delete/<student_id>', methods=['DELETE'])
@check_permission([Role.FACULTY, Role.SECRETARY])
def delete_student(student_id):
    try:
        result = mongo.db.users.update_one(
            {"_id": ObjectId(student_id)},
            {"$set": {"active": False, "last_updated": datetime.utcnow()}}
        )
        
        if result.matched_count == 0:
            abort(404, description="Student not found")

        return jsonify({"message": "Student deleted (soft delete)"}), 200
    except Exception as e:
        return jsonify({
            "error": "Internal Server Error",
            "message": f"An error occurred: {str(e)}"
        }), 500
