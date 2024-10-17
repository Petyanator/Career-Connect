from app import app, bcrypt
from flask import request, jsonify
from flask_jwt_extended import create_access_token
from models.notification_model import db, Notification
from flask import jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

# Create a notification (this would be triggered by some action in the app)
@app.route("/notification", methods=["POST"])
@jwt_required()
def create_notification():
    data = request.get_json()
    user_id = get_jwt_identity()  # get user from token
    message = data.get("message")

    new_notification = Notification(user_id=user_id, message=message)
    db.session.add(new_notification)
    db.session.commit()

    return jsonify({"message": "Notification created"}), 201

# Get all notifications for a user
@app.route("/notifications", methods=["GET"])
@jwt_required()
def get_notifications():
    user_id = get_jwt_identity()
    notifications = Notification.query.filter_by(user_id=user_id).all()

    return jsonify([notification.to_json() for notification in notifications]), 200
