from flask import Flask
from app.extensions import mongo,cors
from app.routes.user_routes import user_blueprint

def create_app():
    app=Flask(__name__)
    #Load configuration
    app.config.from_object('app.config.COnfig')
    # Initialize extensions
    mongo.init_app(app)
    cors.init_app(app)
    #Register blueprints
    app.register_blueprint(user_blueprint,url_prefix='/api/users')
    return app