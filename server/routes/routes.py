from app import app,db, bcrypt
from flask import jsonify, request
from models.models import JobPosting
from datetime import datetime
import re

@app.route("/api/search", methods=["GET"])
def get_job_type():
    search_term = request.args.get("job_title", "")

    if not search_term:
        return jsonify({"error": "Search term missing"}), 400

    # Perform case-insensitive search using ilike
    job_titles = JobPosting.query.filter(JobPosting.job_title.ilike(f"%{search_term}%")).all()

    if not job_titles:
        return jsonify({"error": "No job types found"}), 404

    # Return the found job types with a 200 status code
    return jsonify([job.job_title for job in job_titles]), 200


@app.route("/api/filter", methods=["GET"])
def get_filters():
    salary_range = request.args.get("salary_range", "")
    location = request.args.get("location", "")
    required_skills = request.args.get("required_skills", "")

    print(f"Received salary_range: {salary_range}, location: {location}, required_skills: {required_skills}")

    # Parse the salary range to extract the minimum salary
    min_salary = parse_salary_range(salary_range)

    query = JobPosting.query

    # Filter by minimum salary if provided
    if min_salary is not None:
        query = query.filter(JobPosting.salary_range.contains(str(min_salary)))
        print(f"Filtering by minimum salary: {min_salary}")

    # Filter by location if provided
    if location:
        query = query.filter(JobPosting.location.ilike(f"%{location}%"))
        print(f"Filtering by location: {location}")

    # Filter by required skills if provided
    if required_skills:
        query = query.filter(JobPosting.required_skills.ilike(f"%{required_skills}%"))
        print(f"Filtering by required skills: {required_skills}")

    results = query.all()
    print(f"Query results: {[job.to_dict() for job in results]}")

    jobs = [job.to_dict() for job in results]

    return jsonify(jobs)

def parse_salary_range(salary_range):
    # Extract the minimum salary from the salary range
    match = re.match(r'(\d+)([KkMm]?)', salary_range)
    if match:
        base_salary = int(match.group(1))
        # Return the base salary without multiplication
        return base_salary  
    return None
