from flask import Flask
from app.utils.extensions import mongo,cors
# import certifi
# from app.routes.user_routes import user_blueprint
from app.routes.admin_routes import admin_bp



def create_app():
    app=Flask(__name__)
    
    app.config.from_object('app.config.Config')

    mongo.init_app(app)
    cors.init_app(app)

    # app.register_blueprint(user_blueprint,url_prefix='/api/users')
    app.register_blueprint(admin_bp)

    return app