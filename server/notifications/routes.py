from flask import Blueprint, request, jsonify
from models import db, ConnectRequest, Notification, Users, Employer
from flask_socketio import emit


employers_bp = Blueprint('employers_bp', __name__)
# Create a notification blueprint
notifications_bp = Blueprint('notifications_bp', __name__)

# Route to fetch notifications for a specific user
@notifications_bp.route('/api/notifications/<int:user_id>', methods=['GET'])
def user_notifications(user_id):
    notifications = Notification.query.filter_by(receiver_id=user_id).all()
    return jsonify([n.to_dict() for n in notifications]), 200

# Route to fetch notifications for all users
@notifications_bp.route('/api/notifications', methods=['GET'])
def all_notifications():
    notifications = Notification.query.all()
    return jsonify([n.to_dict() for n in notifications]), 200

# Route to create a new employer
@employers_bp.route('/api/employers', methods=['POST'])
def create_employer():
    data = request.get_json()
    company_name = data.get('company_name')
    email = data.get('email')
    user_id = data.get('user_id')  # Assuming you want to link an employer to a user

    new_employer = Employer(company_name=company_name, email=email, user_id=user_id)
    db.session.add(new_employer)
    db.session.commit()

    return jsonify({'message': 'Employer created successfully', 'employer_id': new_employer.employer_id}), 201

# Route to fetch all employers
@employers_bp.route('/api/employers', methods=['GET'])
def get_all_employers():
    employers = Employer.query.all()
    return jsonify([e.to_dict() for e in employers]), 200

# Route to fetch a specific employer by ID
@employers_bp.route('/api/employers/<int:employer_id>', methods=['GET'])
def get_employer(employer_id):
    employer = Employer.query.get_or_404(employer_id)
    return jsonify(employer.to_dict()), 200

# Route to update an employer's details
@employers_bp.route('/api/employers/<int:employer_id>', methods=['PUT'])
def update_employer(employer_id):
    employer = Employer.query.get_or_404(employer_id)
    data = request.get_json()

    employer.company_name = data.get('company_name', employer.company_name)
    employer.email = data.get('email', employer.email)

    db.session.commit()
    return jsonify({'message': 'Employer updated successfully'}), 200

# Route to delete an employer
@employers_bp.route('/api/employers/<int:employer_id>', methods=['DELETE'])
def delete_employer(employer_id):
    employer = Employer.query.get_or_404(employer_id)
    db.session.delete(employer)
    db.session.commit()
    return jsonify({'message': 'Employer deleted successfully'}), 200




# Route to create a connect request
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

# Fetch all notifications for a specific receiver (either user)
@notifications_bp.route('/api/notifications/user/<int:receiver_id>', methods=['GET'])
def get_user_notifications(receiver_id):
    notifications = Notification.query.filter_by(receiver_id=receiver_id).all()
    result = [{
        'notification_id': n.notification_id,
        'notification_type': n.notification_type,
        'message': n.message,
        'created_at': n.created_at
    } for n in notifications]

    return jsonify(result), 200
