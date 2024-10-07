# /server/routes/job_post_routes.py
from flask import Blueprint, request, jsonify
from models.models import JobPosting  # Assuming your JobPosting model is defined here
from models import db  # Assuming SQLAlchemy is initialized in models/__init__.py

job_post_routes = Blueprint('job_post_routes', __name__)


# Define a testing route for verifying the server is running
@job_post_routes.route('/jobtest')  # Map the URL '/hello' to the home function
def home():
    return 'Job Routes Working!'  # Return a simple greeting message




@job_post_routes.route('/api/jobs', methods=['POST'])
def create_job_posting():
    data = request.get_json()

    # Simple validation (you can enhance this)
    required_fields = ['jobTitle', 'company', 'salaryRange', 'location', 'requiredSkills', 'description']
    if not all(field in data and data[field] for field in required_fields):
        return jsonify({'message': 'Missing required fields'}), 400

    # Create a new job posting instance using SQLAlchemy (Make sure to install)
    new_job_post = JobPosting(
        job_title=data['jobTitle'],
        company=data['company'],
        salary_range=data['salaryRange'],
        location=data['location'],
        required_skills=data['requiredSkills'],
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
