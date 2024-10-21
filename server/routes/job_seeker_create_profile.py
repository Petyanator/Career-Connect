from flask import Blueprint, request, jsonify, current_app
from werkzeug.utils import secure_filename
import os
import base64
from datetime import datetime
from flask_jwt_extended import get_jwt_identity, jwt_required, create_access_token
from models.models import JobSeeker
from extensions import db
import json

job_seeker_create_profile_bp = Blueprint('job_seeker_create_profile_bp', __name__)

# Profile creation route
@job_seeker_create_profile_bp.route('/api/job_seeker/create_profile', methods=['POST'])
@jwt_required()
def create_profile():
    try:
        # Get JSON data from request
        data = request.get_json()

        # Get user_id from JWT
        user_id = get_jwt_identity()
        print(f"user_id from JWT: {user_id}")
        print(f"Data received: {data}")

        # Validate required fields
        required_fields = ['first_name', 'last_name', 'dob', 'gender', 'nationality', 'education', 'skills']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'Missing required field: {field}'}), 400

        # Extract fields from request data
        first_name = data.get('first_name')
        last_name = data.get('last_name')
        dob_str = data.get('dob')
        dob = datetime.strptime(dob_str, '%Y-%m-%d').date()
        gender = data.get('gender')
        nationality = data.get('nationality')

        # Handle education (ensure it's stored as valid JSON)
        education = data.get('education')
        if isinstance(education, list):
            education = json.dumps(education)  # Convert list to JSON string

        # Handle skills (ensure it's stored as valid JSON)
        skills = data.get('skills')
        if isinstance(skills, list):
            skills = json.dumps(skills)  # Convert list to JSON string

        profile_pic = data.get('profile_pic')

        # Handle profile picture (if provided)
        profile_pic_path = None
        if profile_pic and profile_pic.startswith('data:image/'):
            img_data = profile_pic.split(',')[1]
            img_data = base64.b64decode(img_data)
            filename = secure_filename(f"{user_id}_{datetime.now().strftime('%Y%m%d%H%M%S')}.png")
            filepath = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
            with open(filepath, 'wb') as f:
                f.write(img_data)
            profile_pic_path = filepath
        elif profile_pic:
            profile_pic_path = profile_pic  # If it's a URL or existing file path

        # Create a new JobSeeker object
        new_job_seeker = JobSeeker(
            user_id=user_id,
            first_name=first_name,
            last_name=last_name,
            dob=dob,
            gender=gender,
            nationality=nationality,
            education=education,  # Properly formatted JSON string
            skills=skills,  # Properly formatted JSON string
            profile_pic=profile_pic_path or ''
        )

        # Save new profile to the database
        db.session.add(new_job_seeker)
        db.session.commit()

        return jsonify({'message': 'Profile created successfully', 'profile': new_job_seeker.to_json()}), 201

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': 'An error occurred while creating the profile.'}), 500
