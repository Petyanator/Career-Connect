from flask import Blueprint, request, jsonify
<<<<<<< HEAD
from models.models import JobPosting 
from extensions import db

job_post_bp = Blueprint('job_post_bp', __name__)

@job_post_bp.route('/api/jobs', methods=['POST'])
def create_job_posting():
    data = request.get_json()

    
    required_fields = ['jobTitle', 'company', 'salaryRange', 'location', 'requiredSkills', 'description']
    if not all(field in data and data[field] for field in required_fields):
        return jsonify({'message': 'Missing required fields'}), 400

    
    new_job_post = JobPosting(
        job_title=data['jobTitle'],
        company=data['company'],
        salary_range=data['salaryRange'],
        location=data['location'],
        required_skills=data['requiredSkills'],
        description=data['description']
    )

    
=======
from models.models import JobPosting, Employer  # Import your JobPosting and Employer models
from flask_jwt_extended import get_jwt_identity, jwt_required
from app import app, db

job_post_routes = Blueprint('job_post_routes', __name__)

# Route to create a job posting
@app.route('/api/jobs', methods=['POST'])
@jwt_required()  # Ensure the user is authenticated before creating a job
def create_job_posting():
>>>>>>> main
    try:
        # Extract the user_id from the JWT token
        user_id = get_jwt_identity()
        print(f"user_id from JWT: {user_id}")

        # Fetch the employer based on the user_id
        employer = Employer.query.filter_by(user_id=user_id).first()
        print(f"Employer fetched: {employer}")

        if not employer:
            return jsonify({'message': 'Employer not found for this user'}), 404

        # Extract data from request
        data = request.get_json()

        # Validate required fields
        required_fields = ['jobTitle', 'salaryRange', 'location', 'requiredSkills', 'description']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'message': f'Missing required field: {field}'}), 400

        # Create a new JobPosting instance
        new_job_post = JobPosting(
            employer_id=employer.employer_id,  # Associate with employer
            title=data['jobTitle'],  # Use the fields from the payload
            salary=data['salaryRange'],
            location=data['location'],
            skills=data['requiredSkills'],
            description=data['description']
        )

        # Save the new job posting to the database
        db.session.add(new_job_post)
        db.session.commit()

        # Return a success message and the new job posting
        return jsonify({'message': 'Job posted successfully!', 'job': new_job_post.to_json()}), 201

    except Exception as e:
        db.session.rollback()  # Rollback the session in case of error
        return jsonify({'message': f'Error occurred: {str(e)}'}), 500

<<<<<<< HEAD
@job_post_bp.route('/api/jobs', methods=['GET'])
=======
# Route to get all job postings
@app.route('/api/jobs', methods=['GET'])
>>>>>>> main
def get_job_postings():
    try:
        # Query all job postings from the database
        jobs = JobPosting.query.all()

        # Serialize the job postings to JSON
        jobs_list = [job.to_json() for job in jobs]

        # Return the list of jobs
        return jsonify(jobs_list), 200

    except Exception as e:
        return jsonify({'message': f'Error occurred: {str(e)}'}), 500

