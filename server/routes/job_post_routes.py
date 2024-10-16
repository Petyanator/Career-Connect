# /server/routes/job_post_routes.py
from flask import Blueprint, request, jsonify
from models.models import JobPosting  # Assuming your JobPosting model is defined here
from app import app, db

job_post_routes = Blueprint('job_post_routes', __name__)



@app.route('/api/jobs', methods=['POST'])
def create_job_posting():
    data = request.get_json()

    # Simple validation (you can enhance this)
    required_fields = ['jobTitle', 'company', 'salaryRange', 'location', 'requiredSkills', 'description']
    if not all(field in data and data[field] for field in required_fields):
        return jsonify({'message': 'Missing required fields'}), 400

    # Create a new job posting instance using SQLAlchemy (Make sure to install)
    new_job_post = JobPosting(
        title=data['jobTitle'],  # Match to 'title' in model
        salary=data['salaryRange'],  # Match to 'salary' in model
        location=data['location'],
        skills=data['requiredSkills'],  # Match to 'skills' in model
        description=data['description']
    )

    # Save to the database
    try:
        db.session.add(new_job_post)
        db.session.commit()
        return jsonify({'message': 'Job posted successfully!'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Error occurred: {str(e)}'}), 500


# /server/routes/job_post_routes.py
@app.route('/api/jobs', methods=['GET'])
def get_job_postings():
    try:
        jobs = JobPosting.query.all()
        jobs_list = [{
            'id': job.id,
            'job_title': job.job_title,
            'company': job.company,
            'salary_range': job.salary_range,
            'location': job.location,
            'required_skills': job.required_skills,
            'description': job.description
        } for job in jobs]
        return jsonify(jobs_list), 200
    except Exception as e:
        return jsonify({'message': f'Error occurred: {str(e)}'}), 500
