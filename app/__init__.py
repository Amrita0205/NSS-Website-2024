from flask import Flask
import certifi
from app.utils.extensions import mongo,cors
# from app.routes.user_routes import user_blueprint

def create_app():
    app=Flask(__name__)
    #Load configuration
    app.config.from_object('app.config.Config')
    # Initialize extensions
    mongo.init_app(app)
    cors.init_app(app)
    #Register blueprints
    # app.register_blueprint(user_blueprint,url_prefix='/api/users') #similar to app.use
    return app