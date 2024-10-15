from flask import Blueprint, request, jsonify
from models import db, ConnectRequest, Notification
from flask_socketio import emit

# Create one notification blueprint
notifications_bp = Blueprint('notifications_bp', __name__)

# Route to fetch notifications for job seekers
@notifications_bp.route('/api/notifications/job-seeker', methods=['GET'])
def job_seeker_notifications():
    notifications = Notification.query.filter_by(user_type='job_seeker').all()
    return jsonify([n.to_dict() for n in notifications]), 200

# Route to fetch notifications for employers
@notifications_bp.route('/api/notifications/employer', methods=['GET'])
def employer_notifications():
    notifications = Notification.query.filter_by(user_type='employer').all()
    return jsonify([n.to_dict() for n in notifications]), 200

# Create a connect request
@notifications_bp.route('/api/connect_request', methods=['POST'])
def create_connect_request():
    data = request.get_json()
    sender_id = data.get('sender_id')
    receiver_id = data.get('receiver_id')
    
    # Create a new connect request
    connect_request = ConnectRequest(sender_id=sender_id, receiver_id=receiver_id)
    db.session.add(connect_request)
    db.session.commit()

    # Create a notification related to the connect request
    notification = Notification(
        notification_type='Connect Request',
        sender_id=sender_id,
        receiver_id=receiver_id,
        message=f'You have a new connect request from User {sender_id}.'
    )
    db.session.add(notification)
    db.session.commit()

    # Emit real-time notification via Socket.IO to all connected clients
    emit('connect_request', {
        'notification_type': 'Connect Request',
        'sender_name': f'User {sender_id}',
        'message': f'You have a new connect request from User {sender_id}.'
    }, broadcast=True)

    return jsonify({'message': 'Connect request sent and notification created'}), 201

# Fetch all notifications for a specific receiver (both Job Seeker and Employer)
@notifications_bp.route('/api/notifications/<int:receiver_id>', methods=['GET'])
def get_notifications(receiver_id):
    notifications = Notification.query.filter_by(receiver_id=receiver_id).all()
    result = [{
        'notification_id': n.notification_id,
        'notification_type': n.notification_type,
        'message': n.message,
        'created_at': n.created_at
    } for n in notifications]

    return jsonify(result), 200
