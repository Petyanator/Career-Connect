from flask import request, jsonify, Blueprint
from app import app, db
from flask_socketio import SocketIO, emit
from models.models import Notification  # Import your Notification model
from flask_jwt_extended import get_jwt_identity, jwt_required

socketio = SocketIO(app)

notifications_bp = Blueprint("notifications", __name__)


@notifications_bp.route("/api/notifications", methods=["POST"])
@jwt_required()
def send_notification():
    user_id = get_jwt_identity()
    print(f"user_id from JWT: {user_id}")
    
    employer = Employer.query.filter_by(user_id=user_id).first()

    # Get the data from the request
    data = request.get_json()

    # Check for required fields
    job_seeker_id = data.get("job_seeker_id")
    application_id = data.get("application_id")
    employer_id = data.get("employer_id")
    message = data.get("message", "New job application received")

    if not all([job_seeker_id, application_id, employer_id]):
        return jsonify({"error": "Missing required fields"}), 400

    # Create the notification
    notification = Notification(
        application_id=application_id,
        employer_id=employer_id,
        job_seeker_id=job_seeker_id,
        message=message,
        is_read=False,
    )

    db.session.add(notification)
    db.session.commit()

    # Emit a real-time notification to the employer via Socket.IO
    socketio.emit(
        "notification",
        {
            "employer_id": employer_id,
            "message": message,
            "job_seeker_id": job_seeker_id,
            "application_id": application_id,
        },
        namespace=f"/notifications/{employer_id}",
    )

    return (
        jsonify(
            {"message": "Notification sent", "notification": notification.to_json()}
        ),
        201,
    )
