from flask import Blueprint, request, jsonify, abort
from marshmallow import ValidationError
from app.models.categoryModel import Category
from app.schemas.categoryCollection import category_schema
from app.schemas.categoryCollection import CategorySchema 
from bson.objectid import ObjectId

# Create a Blueprint for category routes
category_bp = Blueprint('category', __name__)

# Route to create a new category
@category_bp.route('/add', methods=['POST'])
def create_category():
    try:
        # Validate and deserialize input
        data = category_schema.load(request.json)
        # Call the model to create the category
        result = Category.create_category(data)
        return jsonify({"message": "Category created successfully", "category_id": result["inserted_id"]}), 201
    except ValidationError as err:
        abort(400, description=err.messages)

# Route to get a single category by ID
@category_bp.route('/id/<string:category_id>', methods=['GET'])
def get_category(category_id):
    try:
        # Find the category in the database
        category = Category.find_category({"_id": ObjectId(category_id)})
        if not category:
            abort(404, description="Category not found")
        return jsonify(category_schema.dump(category)), 200
    except Exception:
        abort(400, description="Invalid category ID")

# Route to update a category by ID
@category_bp.route('/update/<string:category_id>', methods=['PUT'])
def update_category(category_id):
    try:
        # Validate and deserialize input
        new_data = category_schema.load(request.json, partial=True)
        # Call the model to update the category
        result = Category.update_category(category_id, new_data)
        if result["modified_count"] == 0:
            abort(404, description="Category not found or no changes made")
        return jsonify({"message": "Category updated successfully"}), 200
    except ValidationError as err:
        abort(400, description=err.messages)

# Route to delete a category by ID
@category_bp.route('/delete/<string:category_id>', methods=['DELETE'])
def delete_category(category_id):
    try:
        # Call the model to delete the category
        result = Category.delete_category(category_id)
        if result["deleted_count"] == 0:
            abort(404, description="Category not found")
        return jsonify({"message": "Category deleted successfully"}), 200
    except Exception:
        abort(400, description="Invalid category ID")
        
@category_bp.route('/all', methods=['GET'])
def get_all_categories():
    # Fetch all categories from the database
    categories = Category.get_all_categories()

    # Initialize the schema (many=True for a list of categories)
    category_schema = CategorySchema(many=True)

    # Serialize the list of categories
    return jsonify(category_schema.dump(categories)), 200
