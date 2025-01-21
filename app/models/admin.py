from app.utils.extensions import mongo
from pydantic import BaseModel, EmailStr, Field, field_validator
from enum import Enum
from bson.objectid import ObjectId
from typing import Union, List
import jwt
import bcrypt

# Utility function to convert ObjectId to string
def to_str_id(doc):
    if doc and "_id" in doc:
        doc["_id"] = str(doc["_id"])
    return doc

class Role(str, Enum):
    FACULTY = "faculty"
    SECRETARY = "secretary"
    BOYS_RPR = "boys_rpr"
    GIRLS_RPR = "girls_rpr"
    EVENT_COORD = "event_coord"
    MEMBER = "member"

class Admin(BaseModel):
    name: str = Field(..., min_length=2, max_length=50)
    email: EmailStr
    password: str
    role: Union[Role, List[Role]] = Field(..., description="Single role or a list of roles")
    active: bool = True

    @field_validator("role")
    def validate_role(cls, v):
        if isinstance(v, list):
            if not all(isinstance(role, Role) for role in v):
                raise ValueError("All roles must be valid predefined roles.")
        return v

class AdminModel:
    @staticmethod
    def get_all_admins():
        return [to_str_id(admin) for admin in mongo.db.admins.find()]

    @staticmethod
    def get_admin_by_id(admin_id: ObjectId):
        return to_str_id(mongo.db.admins.find_one({"_id": admin_id}))
    
    @staticmethod
    def get_admin_by_role(role: Role):
        return [to_str_id(admin) for admin in mongo.db.admins.find({"role": role})]
    
    @staticmethod
    def get_user_role_by_id(user_id):
        try:
            user = mongo.db.admins.find_one({'_id': ObjectId(user_id)})
            if user:
                return user.get('role')
            else:
                return None  

        except Exception as e:
            raise Exception(f"Error while fetching user role: {str(e)}")

    
    @staticmethod
    def update_faculty(data: dict):
        data["password"] = bcrypt.hashpw(data["password"].encode("utf-8"), bcrypt.gensalt())
        if not mongo.db.admins.find_one({"role": "faculty"}):
            return mongo.db.admins.insert_one(data)
        return mongo.db.admins.update_one({"role": "faculty"}, {"$set": data})
    

    @staticmethod
    def update_secretary(data: dict):
        data["password"] = bcrypt.hashpw(data["password"].encode("utf-8"), bcrypt.gensalt())
        if not mongo.db.admins.find_one({"role": "secretary"}):
            return mongo.db.admins.insert_one(data)
        return mongo.db.admins.update_one({"role": "secretary"}, {"$set": data})
    
    @staticmethod
    def add_member(data: dict):
        # Check if email already exists
        if mongo.db.admins.find_one({"email": data["email"]}):
            raise ValueError("Email already registered")
        # Hash password
        data["password"] = bcrypt.hashpw(data["password"].encode("utf-8"), bcrypt.gensalt())
        return mongo.db.admins.insert_one(data)

    @staticmethod
    def update_admin(admin_id: ObjectId, data: dict):
        # Check if 'password' exists and has a value
        if data.get("password"):  # Use .get() to avoid KeyError
            data["password"] = bcrypt.hashpw(data["password"].encode("utf-8"), bcrypt.gensalt())
        
        # Perform the partial update
        return mongo.db.admins.update_one({"_id": admin_id}, {"$set": data})

    
    @staticmethod
    def authenticate_admin(email: str, password: str):
        admin = mongo.db.admins.find_one({"email": email})
        if not admin:
            raise ValueError("Invalid email or password")
        
        # Verify password
        if not bcrypt.checkpw(password.encode("utf-8"), admin["password"]):
            raise ValueError("Invalid email or password")
        
        return to_str_id(admin)

    @staticmethod
    def delete_admin(admin_id: ObjectId):
        return mongo.db.admins.delete_one({"_id": admin_id})
