from flask import Blueprint, request, jsonify
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

    
    try:
        db.session.add(new_job_post)
        db.session.commit()
        return jsonify({'message': 'Job posted successfully!'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Error occurred: {str(e)}'}), 500

@job_post_bp.route('/api/jobs', methods=['GET'])
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
