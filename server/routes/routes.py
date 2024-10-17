
from app import app,db, bcrypt
from flask import jsonify, request
from models.models import JobPosting,Application,JobSeeker
from datetime import datetime
import re
from flask_jwt_extended import jwt_required, get_jwt_identity
@app.route("/demo")
def hello():
    return "hello"

@app.route('/api/filter', methods=['GET'])
@jwt_required()  # Ensure that this route requires authentication
def filter_job_postings():
    job_title = request.args.get('job_title')
    salary_range = request.args.get('salary_range')
    location = request.args.get('location')
    required_skills = request.args.get('required_skills')

    query = JobPosting.query

    if job_title:
        query = query.filter(JobPosting.title.ilike(f"%{job_title}%"))
    if salary_range:
        min_salary, max_salary = extract_salary_range(salary_range)
        if min_salary is not None and max_salary is not None:
            query = query.filter(JobPosting.salary.between(min_salary, max_salary))
    if location:
        query = query.filter(JobPosting.location.ilike(f"%{location}%"))
    if required_skills:
        query = query.filter(JobPosting.skills.ilike(f"%{required_skills}%"))
    if not job_title and not salary_range and not location and not required_skills:
        query = query  # No filters applied, return all job postings.

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