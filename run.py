from flask import Flask, jsonify
from app.utils.extensions import mongo
from app.controllers.events_controller import event_blueprint
from app.controllers.announcements_controller import announcement_blueprint
from app.controllers.team_controller import team_blueprint  
import json

app = Flask(__name__)

app.config.from_object('app.utils.config.Config')

mongo.init_app(app)

app.register_blueprint(event_blueprint, url_prefix='/api')
app.register_blueprint(announcement_blueprint, url_prefix='/api')
app.register_blueprint(team_blueprint, url_prefix='/api') 

@app.route('/')
def home():
    return "Welcome to the NSS Website!"

if __name__ == '__main__':
    app.run(debug=True)

#__init satyajeet
# from flask import Flask
# from app.extensions import mongo,cors
# from app.routes.user_routes import user_blueprint
# from app.routes.admin_routes import admin_bp

# def create_app():
#     app=Flask(__name__)

#     #Load configuration
#     app.config.from_object('app.config.Config')

#     # Initialize extensions
#     mongo.init_app(app)
#     cors.init_app(app)

#     #Register blueprints
#     app.register_blueprint(user_blueprint,url_prefix='/api/users')
#     app.register_blueprint(admin_bp)

#     return app
