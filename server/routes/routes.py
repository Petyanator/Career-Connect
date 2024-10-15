
from app import app,db, bcrypt
from flask import jsonify, request
from models.models import JobPosting,Application
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