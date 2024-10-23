from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import os
import base64
from datetime import datetime
from flask_jwt_extended import get_jwt_identity, jwt_required, create_access_token
from models.models import db, JobSeeker, Application, Employer, JobPosting
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

@app.route("/api/update_job_seeker_profile", methods=["PUT"])
@jwt_required()
def update_job_seeker_profile():

    user_id = get_jwt_identity()
    job_seeker = JobSeeker.query.filter_by(user_id=user_id).first()
    if not job_seeker:
        return jsonify({"message": "Job seeker not found."}), 404
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
    return jsonify({"message": "Profile updated successfully."}), 200



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


@app.route('/api/job_seeker/notifications', methods=['GET'])
@jwt_required()
def get_job_seeker_notifications():
    user_id = get_jwt_identity()

    # Find the job seeker associated with the current user
    job_seeker = JobSeeker.query.filter_by(user_id=user_id).first()

    if not job_seeker:
        return jsonify({"message": "Job seeker not found"}), 404

    # Get all applications where the job seeker has made a request (job_seeker_status is 1)
    applications = Application.query.filter_by(job_seeker_id=job_seeker.job_seeker_id, job_seeker_status=1).all()

    if not applications:
        return jsonify({"message": "No notifications found"}), 404

    # Prepare a response including job posting and employer status info
    notifications = []
    for app in applications:
        job_posting = JobPosting.query.get(app.job_posting_id)
        notifications.append({
            "job_posting_title": job_posting.title,
            "job_posting_description": job_posting.description,
            "employer_status": app.employer_status,  # 1 = Accepted, 2 = Rejected, None = Pending
            "created_at": app.created_at.isoformat()
        })

    return jsonify(notifications), 200















@app.route("/api/update_employer_profile", methods = ["PUT"])
@jwt_required()
def update_employer():
    try:
        # Get the user ID from JWT
        user_id = get_jwt_identity()

        # Fetch the existing employer profile from the database
        employer = Employer.query.filter_by(user_id=user_id).first()

        if not employer:
            return jsonify({"message": "Employer not found."}), 404

        # Get JSON data from the request
        data = request.get_json()
        
        # Extract fields from request data
        company_name = data.get('company_name')
        about_company = data.get('about_company')
        preferential_treatment = data.get('preferential_treatment')
        company_benefits = data.get('company_benefits')
        email = data.get('email')

        # Handle company logo (keep existing if no new one is uploaded)
        company_logo_path = employer.company_logo
        if 'company_logo' in request.files:
            logo_file = request.files['company_logo']
            filename = secure_filename(f"{user_id}_{datetime.now().strftime('%Y%m%d%H%M%S')}.png")
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            logo_file.save(filepath)
            company_logo_path = filepath

        # Update the employer object with the provided or existing data
        employer.company_name = company_name if company_name else employer.company_name
        employer.about_company = about_company if about_company else employer.about_company
        employer.preferential_treatment = preferential_treatment if preferential_treatment else employer.preferential_treatment
        employer.company_benefits = company_benefits if company_benefits else employer.company_benefits
        employer.email = email if email else employer.email
        employer.company_logo = company_logo_path

        # Commit changes to the database
        db.session.commit()
        
        return jsonify({"message": "Employer profile updated successfully."}), 200

    except Exception as e:
        db.session.rollback()
        print(f"Error: {e}")
        return jsonify({"message": str(e)}), 500



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
