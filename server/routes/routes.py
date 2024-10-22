from app import app, db, bcrypt
from flask import jsonify, request
from models.models import JobPosting, Application, JobSeeker, Employer
from datetime import datetime
import re
from flask_jwt_extended import jwt_required, get_jwt_identity
import base64
from werkzeug.utils import secure_filename
import os
import json

@app.route("/")
def testing():
    return "routes are working"

@app.route('/api/filter', methods=['GET'])
@jwt_required()  # Ensure that this route requires authentication
def filter_job_postings():
    # Get query parameters
    job_title = request.args.get('job_title', type=str)
    salary_range = request.args.get('salary_range', type=str)
    location = request.args.get('location', type=str)
    required_skills = request.args.get('required_skills', type=str)

    # Start with the base query
    query = JobPosting.query

    # Apply filters if parameters are provided
    if job_title:
        query = query.filter(JobPosting.title.ilike(f"%{job_title}%"))
    
    if salary_range:
        min_salary, max_salary = extract_salary_range(salary_range)
        if min_salary is not None and max_salary is not None:
            query = query.filter(JobPosting.salary.between(min_salary, max_salary))

    if location:
        query = query.filter(JobPosting.location.ilike(f"%{location}%"))

    if required_skills:
        skills_list = [skill.strip() for skill in required_skills.split(',')]
        query = query.filter(
            db.or_(*[JobPosting.skills.ilike(f"%{skill}%") for skill in skills_list])
        )

    # Execute the query and format the results
    results = query.all()
    jobs = [job.to_json() for job in results]

    if not jobs:
        return jsonify({"message": "No job postings found."}), 404

    return jsonify(jobs), 200

def extract_salary_range(salary_str):
    try:
        salary_parts = salary_str.split('-')
        min_salary = int(salary_parts[0].strip().replace('K', '').replace('$', '').replace(',', '')) * 1000
        max_salary = int(salary_parts[1].strip().replace('K', '').replace('$', '').replace(',', '')) * 1000 if len(salary_parts) > 1 else None
        return min_salary, max_salary
    except (IndexError, ValueError):
        return None, None  # Return None for both if parsing fails

@app.route('/api/update_status', methods=['PUT'])
def update_application_status():
    data = request.json
    application_id = data.get('application_id')
    new_status = data.get('job_seeker_status')

    application = Application.query.get(application_id)
    if not application:
        return jsonify({"message": "Application not found"}), 404

    application.job_seeker_status = new_status
    db.session.commit()
    return jsonify({"message": "Status updated successfully"}), 200

@app.route('/api/apply', methods=['POST'])
@jwt_required()
def apply_to_job():
    data = request.json
    job_posting_id = data.get('job_posting_id')
    action = data.get('action')  # Accept or Reject

    if not job_posting_id or action not in ['accept', 'reject']:
        return jsonify({"message": "Invalid data"}), 400

    # Get the current user's ID from the JWT token
    user_id = get_jwt_identity()

    # Find the job_seeker_id associated with this user
    job_seeker = JobSeeker.query.filter_by(user_id=user_id).first()
    if not job_seeker:
        return jsonify({"message": "Job seeker not found"}), 404

    # Check if the application already exists
    application = Application.query.filter_by(
        job_posting_id=job_posting_id, job_seeker_id=job_seeker.job_seeker_id
    ).first()

    if application:
        # Update the existing application status
        application.job_seeker_status = 1 if action == 'accept' else 2
    else:
        # Create a new application if it doesn't exist
        new_application = Application(
            job_posting_id=job_posting_id,
            job_seeker_id=job_seeker.job_seeker_id,
            job_seeker_status=1 if action == 'accept' else 2,
            created_at=datetime.utcnow()
        )
        db.session.add(new_application)

    db.session.commit()
    return jsonify({"message": f"Job {action}ed successfully"}), 200



# -------------------------------------------
# Employer Profile Routes
# -------------------------------------------

# Profile creation route for employers
@app.route('/api/employer/create_profile', methods=['POST'])
@jwt_required()
def create_employer_profile():
    try:
        # Get JSON data from request
        data = request.get_json()
        print(f"Received data: {data}")

        # Get user_id from JWT
        user_id = get_jwt_identity()

        # Validate required fields
        required_fields = ['company_name', 'about_company', 'email']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'Missing required field: {field}'}), 400

        # Extract fields from request data
        company_name = data.get('company_name')
        about_company = data.get('about_company')
        preferential_treatment = data.get('preferential_treatment')
        email = data.get('email')
        company_benefits = data.get('company_benefits')

        if isinstance(company_benefits, list):
            company_benefits = json.dumps(company_benefits)

        # Handle company logo (if provided)
        company_logo = data.get('company_logo')
        company_logo_path = None  # Default to None

        if company_logo and company_logo.startswith('data:image/'):
            try:
                # Decode base64 logo and save it
                img_data = company_logo.split(',')[1]
                img_data = base64.b64decode(img_data)
                filename = secure_filename(f"{user_id}_{datetime.now().strftime('%Y%m%d%H%M%S')}.png")
                filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                with open(filepath, 'wb') as f:
                    f.write(img_data)
                company_logo_path = filepath
            except (IndexError, binascii.Error) as decode_error:
                print(f"Error decoding company logo: {decode_error}")
                company_logo_path = None  # Keep it None if decoding fails
        elif company_logo:
            company_logo_path = company_logo  # Assume it’s a URL or valid path

        # Create a new Employer object
        new_employer = Employer(
            user_id=user_id,
            company_name=company_name,
            company_logo=company_logo_path,  # This will be None if not provided
            about_company=about_company,
            preferential_treatment=preferential_treatment,
            company_benefits=company_benefits,
            email=email
        )

        # Save new profile to the database
        db.session.add(new_employer)
        db.session.commit()

        return jsonify({
            'message': 'Employer profile created successfully',
            'profile': new_employer.to_json()
        }), 201

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': 'An error occurred while creating the employer profile.'}), 500



# Route for employers to view their own profile
@app.route('/api/employer/me', methods=['GET'])
@jwt_required()
def get_my_employer_profile():
    user_id = get_jwt_identity()
    employer = Employer.query.filter_by(user_id=user_id).first()
    if employer:
        return jsonify(employer.to_json()), 200
    return jsonify({"message": "Employer profile not found"}), 404


# Route for job seekers or others to view a specific employer profile
@app.route('/api/employer/<int:employer_id>', methods=['GET'])
@jwt_required()
def get_employer_profile(employer_id):
    employer = Employer.query.get(employer_id)
    if employer:
        return jsonify(employer.to_json()), 200
    return jsonify({"message": "Employer profile not found"}), 404



@app.route("/api/job_seekers_search", methods=["GET"])
@jwt_required()
def find_jobseekers():
    try:
        jobseekers = JobSeeker.query.all()
        people = [person.to_json() for person in jobseekers]

        if not people:
            return jsonify({"message": "No job seekers found"}), 404

        return jsonify(people), 200

    except Exception as e:
        return jsonify({"message": str(e)}), 500
