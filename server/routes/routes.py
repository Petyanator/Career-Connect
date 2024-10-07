from app import app, db, bcrypt
from flask import jsonify, request
from models.models import Search_info
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import create_access_token, unset_jwt_cookies
# my_routes_bp = Blueprint("my_routes", __name__)

@app.route("/")
def hello():
    return "Hello World"

@app.route("/api/job_type", methods=["GET"])
def show_jobs():
    search_term = request.args.get('query')

    if search_term:
        job_types = Search_info.query.filter(Search_info.job_type.ilike(f"%{search_term}%")).all()

        job_type_list = [job.job_type for job in job_types]

        return jsonify(job_type_list)
    else:
        return jsonify([])