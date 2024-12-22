from flask import Blueprint
from app.controllers import event_controller

# Create a Blueprint for event routes
event_bp = Blueprint('events', __name__)

# Route definitions
event_bp.route('/create', methods=['POST'])(event_controller.create_event)
event_bp.route('/all', methods=['GET'])(event_controller.get_events)
event_bp.route('/id/<string:event_id>', methods=['GET'])(event_controller.get_event_by_id)
event_bp.route('/update', methods=['PUT'])(event_controller.update_events)
event_bp.route('/delete', methods=['DELETE'])(event_controller.delete_events)
