from flask import Flask
from app.utils.extensions import mongo,cors



def create_app():
    app=Flask(__name__)
    
    app.config.from_object('app.config.Config')

    mongo.init_app(app)
    cors.init_app(app)

    return app