from flask import Flask, jsonify, request
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity
from models.models import User, JobSeeker, Application  # Import your models
from app import app, db  # Import your Flask app and database

@app.route('/dashboard', methods=['GET'])
@jwt_required()  # Ensure that this route requires authentication
def get_user_data():
    user_id = get_jwt_identity()  # This retrieves the user_id from the JWT
    user = User.query.get(user_id)  # Fetch the user from the database

    if not user:
        return jsonify({"error": "User not found"}), 404

    # Fetch the job seeker profile if it exists
    job_seeker_profile = JobSeeker.query.filter_by(user_id=user_id).first()

    # Create response data
    response_data = {
        "full_name": user.full_name,
        "user_type": user.user_type,
        "job_seeker_profile": job_seeker_profile.to_json() if job_seeker_profile else None  # Send None if no profile
    }

    return jsonify(response_data), 200

@app.route('/api/applications', methods=['GET'])
@jwt_required()
def get_applications():
    user_id = get_jwt_identity()
    job_seeker = JobSeeker.query.filter_by(user_id=user_id).first()

    if not job_seeker:
        return jsonify({"message": "Job seeker not found"}), 404

    applications = Application.query.filter_by(job_seeker_id=job_seeker.job_seeker_id).all()
    return jsonify([app.to_json() for app in applications]), 200