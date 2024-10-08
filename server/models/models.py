# /server/models/models.py
from models import db
from datetime import datetime

class JobPosting(db.Model):
    __tablename__ = 'job_postings'

    id = db.Column(db.Integer, primary_key=True)
    job_title = db.Column(db.String(100), nullable=False)
    company = db.Column(db.String(100), nullable=False)
    salary_range = db.Column(db.String(50), nullable=False)
    location = db.Column(db.String(100), nullable=False)
    required_skills = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<JobPosting {self.job_title}>'
