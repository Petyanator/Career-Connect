from app import app,db, bcrypt
from flask import jsonify, request
from models.models import JobPosting
from datetime import datetime



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
