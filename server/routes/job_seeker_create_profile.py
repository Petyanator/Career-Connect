from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import os
import base64
from datetime import datetime
from flask_jwt_extended import get_jwt_identity, jwt_required, create_access_token
from models.models import db, JobSeeker, Application, Employer, User
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
        # print test
        print(f"data = {data}")

        # Get user_id from JWT
        user_id = get_jwt_identity()

        #print test
        print(f"user_id from JWT: {user_id}")

        # Validate required fields
        required_fields = ['first_name', 'last_name', 'dob', 'gender', 'nationality', 'education', 'skills']
        for field in required_fields:
            if not data.get(field):
                print(f"Missing the fields: {field}")
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



        # Handle profile picture (if provided)
        profile_pic = data.get('profile_pic')
        profile_pic_path = None
        if profile_pic and profile_pic.startswith('data:image/'):
            img_data = profile_pic.split(',')[1]
            img_data = base64.b64decode(img_data)
            filename = secure_filename(f"{user_id}_{datetime.now().strftime('%Y%m%d%H%M%S')}.png")
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
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



# Route for job seekers to view their own profile
@app.route('/api/job_seekers/me', methods=['GET'])
@jwt_required()
def get_my_profile():
    user_id = get_jwt_identity()
    job_seeker = JobSeeker.query.filter_by(user_id=user_id).first()
    if job_seeker:
        return jsonify(job_seeker.to_json()), 200
    return jsonify({"message": "Profile not found"}), 404

# Route for employers to view a specific job seeker profile
@app.route('/api/job_seekers/<int:job_seeker_id>', methods=['GET'])
@jwt_required()
def get_job_seeker_profile(job_seeker_id):
    job_seeker = JobSeeker.query.get(job_seeker_id)
    if job_seeker:
        return jsonify(job_seeker.to_json()), 200
    return jsonify({"message": "Profile not found"}), 404

@app.route("/api/update_job_seeker_profile",methods = ["PUT"])
@jwt_required()
def update_job_seeker():

    user_id = get_jwt_identity()
    
    job_seeker = JobSeeker.query.filter_by(user_id= user_id).first()

    data = request.get_json()

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
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        with open(filepath, 'wb') as f:
            f.write(img_data)
        profile_pic_path = filepath
    elif profile_pic:
        profile_pic_path = profile_pic

    job_seeker.first_name = data.get("first_name", job_seeker.first_name)
    job_seeker.last_name = data.get("last_name", job_seeker.last_name)
    job_seeker.dob = data.get("dob", job_seeker.dob)
    job_seeker.gender = data.get("gender", job_seeker.gender)
    job_seeker.nationality = data.get("nationality", job_seeker.nationality)



    db.session.commit()


    return jsonify({"message": "Profile was updated successfully"})

@app.route("/api/delete_job_seeker_profile", methods = ["DELETE"])
@jwt_required()
def delete_job_seeker():
   
    user_id = get_jwt_identity()

    job_seeker = JobSeeker.query.filter_by(user_id = user_id).first()
    
    if not job_seeker:
        return jsonify({"message": "Job seeker not found"})
    
    job_seeker_id = job_seeker.job_seeker_id
    
    Application.query.filter_by(job_seeker_id=job_seeker_id).delete()
    db.session.commit()

    db.session.delete(job_seeker)
    db.session.commit()
    return jsonify({"message": "Job seeker profile was deleted successfully"})

@app.route("/api/update_employer_profile", methods = ["PUT"])
@jwt_required()    
def update_employer():
    user_id = get_jwt_identity()
    employer = Employer.query.filter_by(user_id=user_id).first()

    data = request.get_json()

    employer.company_name = data.get("company_namez", employer.company_name)

    db.session.commit()

    return jsonify({"message": "Profile was successfully updated"})


@app.route("/api/delete_employer_profile", methods = ["DELETE"])
@jwt_required()
def delete_employer():
   
    user_id = get_jwt_identity()

    employer = Employer.query.filter_by(user_id = user_id).first()
    
    if not employer:
        return jsonify({"message": "Employer was not found"})
    
    
    db.session.delete(employer)
    db.session.commit()
    return jsonify({"message": "Employer profile was deleted successfully"})

