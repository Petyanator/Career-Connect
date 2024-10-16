
from app import app,db, bcrypt
from flask import jsonify, request
from models.models import JobPosting
from datetime import datetime


@app.route("/api/filter", methods=["GET"])
def get_filters():
    job_title = request.args.get("job_title", "")
    salary_range = request.args.get("salary_range", "")
    location = request.args.get("location", "")
    required_skills = request.args.get("required_skills", "")

    query = JobPosting.query

    # Filter by job title if provided
    if job_title:
        query = query.filter(JobPosting.title.ilike(f"%{job_title}%"))

    # Filter by salary range if provided
    if salary_range:
        min_salary = extract_min_salary(salary_range)
        query = query.filter(JobPosting.salary.ilike(f"%{min_salary}%"))

    # Filter by location if provided
    if location:
        query = query.filter(JobPosting.location.ilike(f"%{location}%"))

    # Filter by required skills if provided
    if required_skills:
        query = query.filter(JobPosting.skills.ilike(f"%{required_skills}%"))

    # Get filtered results
    results = query.all()

    # Convert results to a list of dictionaries
    jobs = [job.to_json() for job in results]  # Use to_json for consistent formatting

    return jsonify(jobs)

# Helper function to extract minimum salary
def extract_min_salary(salary_str):
    # Extract the first part (before dash) of the salary string
    salary_parts = salary_str.split('-')
    return salary_parts[0].strip() if salary_parts else salary_str
