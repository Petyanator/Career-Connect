from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import os
import base64
from datetime import datetime
from flask_jwt_extended import get_jwt_identity, jwt_required, create_access_token
from models.models import db, JobSeeker
from app import app
import json

job_seeker_create_profile_bp = Blueprint('job_seeker_create_profile_bp', __name__)

# Profile creation route
@app.route('/api/job_seeker/create_profile', methods=['POST'])
@jwt_required()
def create_profile():
    try:
        # Get JSON data from request
        data = request.get_json()

        # Debug print the received data
        print(f"Received data: {data}")

        # Get user_id from JWT
        user_id = get_jwt_identity()
        print(f"user_id from JWT: {user_id}")

        # Validate required fields
        required_fields = ['first_name', 'last_name', 'dob', 'gender', 'nationality', 'education', 'skills']
        for field in required_fields:
            if not data.get(field):
                print(f"Missing field: {field}")
                return jsonify({'error': f'Missing required field: {field}'}), 400

        # Extract and log all fields
        first_name = data.get('first_name')
        last_name = data.get('last_name')
        dob_str = data.get('dob')
        dob = datetime.strptime(dob_str, '%Y-%m-%d').date()
        gender = data.get('gender')
        nationality = data.get('nationality')
        education = data.get('education')
        skills = data.get('skills')

        # Check if education and skills are valid JSON strings
        print(f"Education: {education}, Skills: {skills}")

        profile_pic = data.get('profile_pic')
        if profile_pic and profile_pic.startswith('data:image/'):
            img_data = profile_pic.split(',')[1]
            img_data = base64.b64decode(img_data)
            filename = secure_filename(f"{user_id}_{datetime.now().strftime('%Y%m%d%H%M%S')}.jpg")
            profile_pic_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)

            # Save profile picture to the disk
            with open(profile_pic_path, 'wb') as f:
                f.write(img_data)
            print(f"Profile picture saved at: {profile_pic_path}")
        
        # Log successful data handling before saving it to DB
        print(f"All fields validated and processed successfully")

        # Handle saving the profile to DB (code to insert into database goes here)

        return jsonify({'message': 'Profile created successfully!'}), 201

    except Exception as e:
        print(f"Error occurred: {str(e)}")
        return jsonify({'error': 'An internal error occurred'}), 500

