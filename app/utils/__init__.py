from flask import Flask
from app.utils.extensions import mongo, cors
from app.routes.admin_routes import admin_bp
from app.routes.user_routes import user_bp 
from app.routes.studentRoute import student_bp

def create_app():
    app = Flask(__name__)
    
    app.config.from_object('app.config.Config')  # Ensure this is correctly defined

    mongo.init_app(app)  # Initialize MongoDB connection
    cors.init_app(app)   # Initialize CORS support
    
    # Register blueprints with optional URL prefixes
    # app.register_blueprint(user_blueprint, url_prefix='/api/users')  # Uncomment if needed
    app.register_blueprint(admin_bp)  # Admin routes without prefix
    app.register_blueprint(student_bp)  # Student routes with prefix
    app.register_blueprint(user_bp)  # Student routes with prefix

    return app
