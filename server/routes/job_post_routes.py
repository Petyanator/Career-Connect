# /server/routes/job_post_routes.py
from flask import Blueprint, request, jsonify
from models.models import JobPosting, Employer  # Assuming your JobPosting model is defined here
from flask_jwt_extended import get_jwt_identity, jwt_required
from app import app, db

job_post_routes = Blueprint('job_post_routes', __name__)



@app.route('/api/jobs', methods=['POST'])
def create_job_posting():
    data = request.get_json()

    #grab the user id using JWT locaed from the login route.
    user_id = get_jwt_identity()
    print(f"user_id is this from JWT: {user_id}")

    #get the employer attached to the user_id.
    employer = Employer.query.filter_by(user_id=user_id).first()
    print(f"employer is this: {employer}")

    if not employer:
        return jsonify({'message': 'Employer not found for this user'}), 404

    # Simple validation (you can enhance this)
    required_fields = ['title', 'salary', 'location', 'skills', 'description']
    for field in required_fields:
        if not data.get(field):
            return jsonify({'message': f'Missing required field: {field}'}), 400

    # Create a new job posting instance using SQLAlchemy
    new_job_post = JobPosting(
        employer_id = employer.employer_id, #Assign the Employer_id
        title=data['jobTitle'],  # Match to 'title' in model
        salary=data['salaryRange'],  # Match to 'salary' in model
        location=data['location'],
        skills=data['requiredSkills'],  # Match to 'skills' in model
        description=data['description']
    )

    # Save to the database
    try:
        db.session.add(new_job_post)  # Add the new job posting to the current session
        db.session.commit()            # Commit the session to save changes to the database

        return jsonify({'message': 'Job posted successfully!', 'job': new_job_post.to_json()}), 201
    except Exception as e:
        db.session.rollback()           # Rollback the session in case of error
        return jsonify({'message': f'Error occurred: {str(e)}'}), 500




# Function to fetch all job postings
@app.route('/api/jobs', methods=['GET'])
def get_job_postings():
    try:
        # Query all job postings
        jobs = JobPosting.query.all()

        # Serialize the job postings
        jobs_list = [job.to_json() for job in jobs]

        # Return the list of jobs
        return jsonify(jobs_list), 200

    except Exception as e:
        return jsonify({'message': f'Error occurred: {str(e)}'}), 500
