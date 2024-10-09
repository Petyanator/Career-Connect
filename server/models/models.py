
from app import db
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


class Search(db.Model):
    __tablename__ = "job_postings"

    id = db.Column(db.Integer, primary_key = True)
    job_title = db.Column(db.String(255), nullable = False)
    company = db.Column(db.String(255), nullable = False)
    salary_range = db.Column(db.String(255), nullable = False)
    location = db.Column(db.String(255), nullable = False)
    required_skills = db.Column(db.String(255), nullable = False)
    description = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())


def to_json(self):
    return {
        "id": self.id,
        "job_title": self.job_title,
        "company": self.company,
        "salary_range": self.salary_range,
        "location": self.location,
        "required_skills": self.required_skills,
        "description": self.description,
        "created_at": self.created_at.strftime('%Y-%m-%d %H:%M:%S')  # Formatting timestamp
    }

