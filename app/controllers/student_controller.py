from flask import make_response, request, jsonify, Blueprint, abort
from bson.objectid import ObjectId
from datetime import datetime
import bcrypt
import jwt
from app import mongo
from app.models.userModel import User
from app.utils.middleware import check_permission
from app.models.admin import Role
from app.utils.config import Config

student_bp = Blueprint('student', __name__)

# Get all students
@student_bp.route('/all', methods=['GET'])
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


@check_permission([Role.FACULTY, Role.SECRETARY])
@student_bp.route('/add', methods=['POST'])
def add_student():
    try:
        # Get JSON data from the request
        data = request.json

        # Check for required fields
        required_fields = ["first_name", "last_name", "email", "role", "password"]
        if not all(field in data for field in required_fields):
            abort(400, description="Missing required fields")

        # Hash the password using bcrypt
        hashed_password = bcrypt.hashpw(data["password"].encode('utf-8'), bcrypt.gensalt())

        # Prepare the student object
        student = {
            "first_name": data["first_name"],
            "last_name": data["last_name"],
            "roll_no": data.get("roll_no"),
            "email": data["email"],
            "role": data["role"],
            "password": hashed_password,  # Store the hashed password
            "created_at": datetime.utcnow(),
            "last_updated": datetime.utcnow(),
            "active": True
        }

        # Insert the student into the database
        result = mongo.db.users.insert_one(student)

        # Respond with success message
        return jsonify({"message": "Student added successfully", "id": str(result.inserted_id)}), 201

    except Exception as e:
        # Handle any exceptions
        return jsonify({
            "error": "Internal Server Error",
            "message": f"An error occurred: {str(e)}"
        }), 500

# Get a specific student by ID
@student_bp.route('/id/<student_id>', methods=['GET'])
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
@student_bp.route('/update/<student_id>', methods=['PUT'])
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
@student_bp.route('/delete/<student_id>', methods=['DELETE'])
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

@student_bp.route('/login', methods=['POST'])
def login():
    try:
        # Get JSON data from the request
        data = request.get_json()

        # Extract and validate email and password
        email = data.get("email")
        password = data.get("password")
        
        if not email or not password:
            return jsonify({"error": "Email and password are required"}), 400
        
        # Authenticate user (assuming `authenticate_user` is implemented correctly)
        user = User.authenticate_user(email, password)
        
        # Generate JWT token
        token = jwt.encode(
            {
                "user_id": user["_id"],
            },
            Config.SECRET_KEY,
            algorithm="HS256"
        )
        
        # Create response and set token in HttpOnly cookie
        response = make_response(jsonify({"message": "Login successful", "token": token}))
        response.set_cookie("token", token, httponly=True, samesite='Strict')  # Use SameSite for additional security

        return response, 200
    
    except ValueError as e:
        return jsonify({"error": str(e)}), 401  # Invalid credentials
    
    except jwt.PyJWTError as jwt_error:
        return jsonify({"error": "Token generation error", "details": str(jwt_error)}), 500  # Token-related errors
    
    except Exception as e:
        return jsonify({"error": "Internal Server Error", "details": str(e)}), 500


@student_bp.route('/logout', methods=['POST'])
def logout():
    try:
        # Clear the cookie
        response = make_response(jsonify({"message": "Logout successful"}))
        response.set_cookie("token", "", expires=0)
        return response, 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500