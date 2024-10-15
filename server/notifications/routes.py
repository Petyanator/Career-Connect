from flask import Blueprint, request, jsonify
from models import db, ConnectRequest, Notification
from flask_socketio import emit

notifications_bp = Blueprint('notifications_bp', __name__)

# Create a connect request
@notifications_bp.route('/connect_request', methods=['POST'])
def create_connect_request():
    data = request.get_json()
    sender_id = data.get('sender_id')
    receiver_id = data.get('receiver_id')
    
    connect_request = ConnectRequest(sender_id=sender_id, receiver_id=receiver_id)
    db.session.add(connect_request)
    db.session.commit()

    # Create a notification
    notification = Notification(
        notification_type='Connect Request',
        sender_id=sender_id,
        receiver_id=receiver_id,
        message=f'You have a new connect request from User {sender_id}.'
    )
    db.session.add(notification)
    db.session.commit()

    # Send real-time notification using Socket.IO
    emit('connect_request', {
        'notification_type': 'Connect Request',
        'sender_name': f'User {sender_id}',
        'message': f'You have a new connect request from User {sender_id}.'
    }, broadcast=True)
    
    return jsonify({'message': 'Connect request sent and notification created'}), 201

# Get all notifications for a specific receiver (Employer)
@notifications_bp.route('/notifications/<int:receiver_id>', methods=['GET'])
def get_notifications(receiver_id):
    notifications = Notification.query.filter_by(receiver_id=receiver_id).all()
    result = [{
        'notification_id': n.notification_id,
        'notification_type': n.notification_type,
        'message': n.message,
        'created_at': n.created_at
    } for n in notifications]

    return jsonify(result), 200
