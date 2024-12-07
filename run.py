from flask import Flask, jsonify
from app.utils.extensions import mongo
from app.controllers.events_controller import event_blueprint
import json

app = Flask(__name__)

app.config.from_object('app.utils.config.Config')

mongo.init_app(app)

app.register_blueprint(event_blueprint, url_prefix='/api')

@app.route('/')
def home():
    return "Welcome to the NSS Website!"

if __name__ == '__main__':
    app.run(debug=True)
