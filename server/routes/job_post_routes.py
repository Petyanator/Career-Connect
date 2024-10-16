# /server/routes/job_post_routes.py
from flask import Blueprint, request, jsonify
from models.models import JobPosting  # Assuming your JobPosting model is defined here
from app import app, db
from flask_jwt_extended import get_jwt_identity, jwt_required


job_post_routes = Blueprint('job_post_routes', __name__)



@app.route('/api/jobs', methods=['POST'])
@jwt_required()
def create_job_posting():
    data = request.get_json()
    print(f"data from request.get_json()= {data}")

    employer_id = get_jwt_identity()  # Get the employer_id from the JWT

    print(f"employer_id from JWT Identity is: {employer_id}")

    # Simple validation (you can enhance this)
    required_fields = ['title', 'salary', 'location', 'skills', 'description']
    if not all(field in data and data[field] is not None for field in required_fields):
        return jsonify({'message': 'Missing required fields'}), 400

    # Create a new job posting instance using SQLAlchemy
    new_job_post = JobPosting(
        employer_id=employer_id,  # Assign employer_id to the job posting
        title=data['title'],      # Match to 'title' in model
        salary=data['salary'],    # Match to 'salary' in model
        location=data['location'],
        skills=data['skills'],    # Match to 'skills' in model
        description=data['description']
    )

    # Save to the database
    try:
        db.session.add(new_job_post)  # Add the new job posting to the current session
        db.session.commit()           # Commit the session to save changes to the database

        return jsonify({'message': 'Job posted successfully!', 'job': new_job_post.to_json()}), 201
    except Exception as e:
        db.session.rollback()          # Rollback the session in case of error
        return jsonify({'message': f'Error occurred: {str(e)}'}), 500





# /server/routes/job_post_routes.py
@app.route('/api/jobs', methods=['GET'])
def get_job_postings():
    try:
        jobs = JobPosting.query.all()
        jobs_list = [{
            'job_posting_id': job.job_posting_id,
            'job_title': job.job_title,
            'salary_range': job.salary_range,
            'location': job.location,
            'required_skills': job.required_skills,
            'description': job.description
        } for job in jobs]
        return jsonify(jobs_list), 200
    except Exception as e:
        return jsonify({'message': f'Error occurred: {str(e)}'}), 500
