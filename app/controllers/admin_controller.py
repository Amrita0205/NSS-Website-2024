from flask import request, jsonify, make_response
from bson.objectid import ObjectId
from app.utils.middleware import check_permission
from app.models.admin import Admin, AdminModel, Role
from app.utils.config import Config
import jwt
import datetime

def get_current_user_info():
    """Extract the current user's ID and role from the JWT token in the request cookies."""
    try:
        # Get the JWT token from the request cookies
        token = request.cookies.get('token')
        if not token:
            raise ValueError("Token is required")

        # Decode the token to get user data
        decoded_token = jwt.decode(token, Config.SECRET_KEY, algorithms=["HS256"])
        current_user_id = str(decoded_token.get('admin_id'))
        
        # Fetch the user's role from the database using the user ID
        current_user_role = AdminModel.get_user_role_by_id(current_user_id)
        
        return current_user_id, current_user_role
    except jwt.ExpiredSignatureError:
        raise ValueError("Token has expired")
    except jwt.InvalidTokenError:
        raise ValueError("Invalid token")
    except Exception as e:
        raise ValueError(f"Error extracting user information: {str(e)}")

def serialize_admins(admins):
    """Convert ObjectIds and bytes to strings in a list of admin dictionaries.
    Also deletes the password field."""
    for admin in admins:
        for key, value in list(admin.items()):  
            if isinstance(value, ObjectId):
                admin[key] = str(value)
            elif isinstance(value, bytes):
                admin[key] = value.decode('utf-8')
            if key == 'password':
                del admin[key]
    return admins

@check_permission([Role.FACULTY, Role.SECRETARY, Role.BOYS_RPR, Role.GIRLS_RPR, Role.EVENT_COORD, Role.MEMBER])
def get_all_admins():
    try:
        admins = AdminModel.get_all_admins()
        admins = serialize_admins(admins)
        return jsonify({'admins': admins}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@check_permission([Role.FACULTY, Role.SECRETARY, Role.BOYS_RPR, Role.GIRLS_RPR, Role.EVENT_COORD, Role.MEMBER])
def get_admin_by_id(admin_id):
    try:
        admin = AdminModel.get_admin_by_id(ObjectId(admin_id))
        if admin:
            serialize_admins([admin])
            return jsonify(admin), 200
        return jsonify({'message': 'Admin not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@check_permission([Role.FACULTY, Role.SECRETARY, Role.BOYS_RPR, Role.GIRLS_RPR, Role.EVENT_COORD, Role.MEMBER])
def get_admin_by_role():
    try:
        role = request.args.get('role')
        if not role:
            return jsonify({'error': 'Role query parameter is required'}), 400

        role_enum = Role(role)
        admins = AdminModel.get_admin_by_role(role_enum)
        admins = serialize_admins(admins)
        return jsonify({'admins': admins}), 200
    except ValueError:
        return jsonify({'error': f'Invalid role: {role}'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@check_permission([Role.FACULTY, Role.SECRETARY])
def add_admin():
    try:
        data = request.json
        admin = Admin(**data)

        # Fetch the user’s role based on the user ID
        current_user_id, current_user_role = get_current_user_info()

        # Check if a Secretary already exists
        secretary_exists = AdminModel.get_admin_by_role(Role.SECRETARY)

        if admin.role not in Role.__members__.values():
            return jsonify({'error': 'Invalid Role'}), 400

        # If Secretary exists, prevent adding a new one
        if secretary_exists and admin.role == Role.SECRETARY:
            return jsonify({'error': 'Secretary already exists, cannot add another Secretary'}), 400

        # Logic for Faculty adding any role except Faculty or Secretary
        if current_user_role == Role.FACULTY:
            if admin.role in [Role.FACULTY]:
                return jsonify({'error': 'Faculty cannot add another Faculty'}), 400
            # Proceed to add the admin
            result = AdminModel.add_member(admin.dict())
            return jsonify({'message': 'Admin added successfully', 'id': str(result.inserted_id)}), 201

        # Logic for Secretary adding non-Faculty and non-Secretary roles
        if current_user_role == Role.SECRETARY:
            if admin.role in [Role.FACULTY, Role.SECRETARY]:
                return jsonify({'error': 'Secretary cannot add Faculty or Secretary'}), 400
            # Proceed to add the admin
            result = AdminModel.add_member(admin.dict())
            return jsonify({'message': 'Admin added successfully', 'id': str(result.inserted_id)}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 400


@check_permission([Role.FACULTY, Role.SECRETARY, Role.BOYS_RPR, Role.GIRLS_RPR, Role.EVENT_COORD, Role.MEMBER])
def update_admin(admin_id):
    try:
        # Get the token from the cookie
        token = request.cookies.get('token')
        
        if not token:
            return jsonify({'error': 'Token is missing'}), 401
        
        try:
            # Decode the JWT token using the secret key
            current_user_id, current_user_role = get_current_user_info()
        except jwt.ExpiredSignatureError:
            return jsonify({'error': 'Token has expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'error': 'Invalid token'}), 401

        # Check if the current user is either the faculty or secretary, or is updating their own profile
        if current_user_id != admin_id and current_user_role not in [Role.FACULTY, Role.SECRETARY]:
            return jsonify({'error': 'You can only update your own profile'}), 403
        
        # Check if the current user is a secretary trying to update a faculty profile
        if current_user_role == Role.SECRETARY:
            admin_to_update = AdminModel.get_admin_by_id(ObjectId(admin_id))
            if admin_to_update and admin_to_update.get('role') == Role.FACULTY:
                return jsonify({'error': 'Secretary cannot update Faculty profile'}), 403

        # Get the data from the request
        data = request.json
        
        # Check if role update is attempted
        if 'role' in data:
            new_role = data['role']

            if new_role not in Role.__members__.values():
                return jsonify({'error': 'Invalid Role'}), 400
            
            # Faculty role restrictions
            if current_user_role == Role.FACULTY:
                if current_user_id == admin_id:
                    return jsonify({'error': 'Faculty cannot change their own role'}), 403
            
            # Secretary role restrictions
            if current_user_role == Role.SECRETARY:
                if current_user_id == admin_id:
                    return jsonify({'error': 'Secretary cannot change their own role'}), 403
                if new_role in [Role.FACULTY, Role.SECRETARY]:
                    return jsonify({'error': 'Secretary cannot assign Faculty or Secretary roles'}), 403
            
            # Other roles cannot change roles
            if current_user_role not in [Role.FACULTY, Role.SECRETARY]:
                return jsonify({'error': 'You are not authorized to change roles'}), 403

        # Proceed with the partial update
        result = AdminModel.update_admin(ObjectId(admin_id), data)
        
        if result.modified_count:
            return jsonify({'message': 'Admin updated successfully'}), 200
        return jsonify({'message': 'No changes made or admin not found'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 400



@check_permission([Role.FACULTY, Role.SECRETARY])
def delete_admin(admin_id):
    try:
        # Get the token from the cookie
        token = request.cookies.get('token')
        
        if not token:
            return jsonify({'error': 'Token is missing'}), 401
        
        try:
            # Decode the JWT token using the secret key
            current_user_id, current_user_role = get_current_user_info()
        except jwt.ExpiredSignatureError:
            return jsonify({'error': 'Token has expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'error': 'Invalid token'}), 401

        # Check if the current user is a secretary trying to delete a faculty profile
        if current_user_role == Role.SECRETARY:
            admin_to_delete = AdminModel.get_admin_by_id(ObjectId(admin_id))
            if admin_to_delete and admin_to_delete.get('role') == Role.FACULTY:
                return jsonify({'error': 'Secretary cannot delete Faculty profile'}), 403
        
        # Proceed to delete the admin if checks pass
        result = AdminModel.delete_admin(ObjectId(admin_id))
        
        if result.deleted_count:
            return jsonify({'message': 'Admin deleted successfully'}), 200
        return jsonify({'message': 'Admin not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def login():
    try:
        data = request.json
        email = data.get("email")
        password = data.get("password")
        
        if not email or not password:
            return jsonify({"error": "Email and password are required"}), 400
        
        admin = AdminModel.authenticate_admin(email, password)
        
        # Generate JWT token
        token = jwt.encode({
            "admin_id": admin["_id"],
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)
        }, Config.SECRET_KEY, algorithm="HS256")
        
        # Set token in cookie
        response = make_response(jsonify({"message": "Login successful", "token": token}))
        response.set_cookie("token", token, httponly=True)
        return response, 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 401
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def logout():
    try:
        # Clear the cookie
        response = make_response(jsonify({"message": "Logout successful"}))
        response.set_cookie("token", "", expires=0)
        return response, 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# def add_faculty():
#     try:
#         data = request.json
#         admin = Admin(**data)

#         result = AdminModel.add_member(admin.dict())
#         return jsonify({'message': 'Admin added successfully', 'id': str(result.inserted_id)}), 201

#     except Exception as e:
#         return jsonify({'error': str(e)}), 400
