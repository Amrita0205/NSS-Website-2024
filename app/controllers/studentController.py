from flask import request, jsonify, Blueprint, abort
from bson.objectid import ObjectId
from app.utils.extensions import mongo
from datetime import datetime
from flask.views import MethodView

student_bp = Blueprint('student', __name__)

class StudentAPI(MethodView):
    # Get all students
    def get(self):
        try:
            # Query all students with role 'student' and active status
            students = mongo.db.users.find({"role": "student", "active": True})

            # If no students found, return an empty list
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
    def post(self):
        try:
            data = request.json
            # Ensure required fields are present
            required_fields = ["first_name", "last_name", "email", "role"]
            if not all(field in data for field in required_fields):
                abort(400, description="Missing required fields")

            # Prepare the student document
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

            # Insert into MongoDB
            result = mongo.db.users.insert_one(student)
            return jsonify({"message": "Student added successfully", "id": str(result.inserted_id)}), 201

        except Exception as e:
            return jsonify({
                "error": "Internal Server Error",
                "message": f"An error occurred: {str(e)}"
            }), 500


class StudentDetailAPI(MethodView):
    # Get a specific student by ID
    def get(self, student_id):
        try:
            # Find the student by ID, role, and active status
            student = mongo.db.users.find_one({"_id": ObjectId(student_id), "role": "student", "active": True})

            # If student not found, return 404
            if not student:
                abort(404, description="Student not found")

            # Prepare student data for response
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
    def put(self, student_id):
        try:
            data = request.json
            # Update only valid fields
            update_fields = {k: v for k, v in data.items() if k in ["first_name", "last_name", "roll_no", "email", "active"]}
            if not update_fields:
                abort(400, description="No valid fields to update")

            # Update the student
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

    # Delete a specific student
    def delete(self, student_id):
        try:
            # Soft delete: Set `active` to False
            result = mongo.db.users.update_one({"_id": ObjectId(student_id)}, {"$set": {"active": False, "last_updated": datetime.utcnow()}})
            if result.matched_count == 0:
                abort(404, description="Student not found")

            return jsonify({"message": "Student deleted (soft delete)"}), 200

        except Exception as e:
            return jsonify({
                "error": "Internal Server Error",
                "message": f"An error occurred: {str(e)}"
            }), 500
