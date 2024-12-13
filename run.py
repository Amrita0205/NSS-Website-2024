from flask import Flask, jsonify, Response
from app.utils.extensions import mongo
from app.controllers.events_controller import event_blueprint
from app.controllers.announcements_controller import announcement_blueprint  
from app.routes.studentRoute import student_bp
from app.routes.user_routes import user_bp
from app.routes.admin_routes import admin_bp
import os

app = Flask(__name__)

# Load configuration
app.config.from_object('app.utils.config.Config')

# Initialize MongoDB
mongo.init_app(app)

# Register blueprints
app.register_blueprint(event_blueprint, url_prefix='/api')
app.register_blueprint(announcement_blueprint, url_prefix='/api')
app.register_blueprint(student_bp, url_prefix='/api')
app.register_blueprint(user_bp, url_prefix='/api')
app.register_blueprint(admin_bp, url_prefix='/api')

@app.route('/')
def home():
    return "Welcome to the NSS Website!"

@app.route('/test_db')
def test_db():
    try:
        # Test the database connection
        mongo.db.command('ping')
        
        # Try to fetch a document
        users = mongo.db.users.find_one()
        if users:
            # Convert ObjectId to string for JSON serialization
            users['_id'] = str(users['_id'])
            return jsonify(users)
        else:
            return jsonify({"message": "No users found"})
            
    except Exception as e:
        app.logger.error(f"Database error: {str(e)}")
        return jsonify({
            "error": "Database connection error",
            "message": str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True)