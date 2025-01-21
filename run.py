from flask import Flask, jsonify
from app.utils.extensions import mongo
from flask_cors import CORS
from app.controllers.event_controller import event_blueprint
from app.controllers.announcements_controller import announcement_blueprint
from app.controllers.team_controller import team_blueprint  
from app.routes.admin_routes import admin_bp
from app.routes.studentRoute import student_bp
from app.routes.studentParticipation_routes import student_participation_bp
from app.routes.category_routes import category_bp
import json

app = Flask(__name__)
CORS(app)

app.config.from_object('app.utils.config.Config')

mongo.init_app(app)

app.register_blueprint(admin_bp, url_prefix='/api/v1/admin')
app.register_blueprint(event_blueprint, url_prefix='/api/v1/event')
app.register_blueprint(announcement_blueprint, url_prefix='/api/v1/announcement')
app.register_blueprint(team_blueprint, url_prefix='/api/v1/team') 
app.register_blueprint(student_bp, url_prefix='/api/v1/student')
app.register_blueprint(student_participation_bp, url_prefix='/api/v1/student_participation')
app.register_blueprint(category_bp, url_prefix='/api/v1/category')

@app.route('/')
def home():
    return "Welcome to the NSS Website!"

if __name__ == '__main__':
    app.run(debug=True)