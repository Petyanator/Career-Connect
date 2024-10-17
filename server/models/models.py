from app import db
from datetime import datetime
import json  # Import json module

class User(db.Model):
    __tablename__ = "users"
    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(75), nullable=False)
    full_name = db.Column(db.String(100), nullable=False)
    user_type = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.TIMESTAMP, server_default=db.func.now())
    updated_at = db.Column(db.TIMESTAMP, server_default=db.func.now())

    def to_json(self):
        return {
        "username": self.username,
        "email": self.email,
        "password": self.password,
        "full_name": self.full_name,
        "user_type": self.user_type
        }

class Notification(db.Model):
    __tablename__ = "notifications"
    notification_id = db.Column(db.Integer, primary_key = True, autoincrement=True)
    application_id = db.Column(db.Integer)
    employer_id = db.Column(db.Integer)


    def to_json(self):
        return {
            "notification_id": self.notification_id,
            "application_id": self.application_id,
            "employer_id": self.employer_id,
        }

class JobSeeker(db.Model):
    __tablename__ = "job_seekers"
    job_seeker_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"), nullable=False)
    profile_pic = db.Column(db.String(255), nullable=True)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    dob = db.Column(db.Date, nullable=False)
    gender = db.Column(db.String(30), nullable=False)
    nationality = db.Column(db.String(255), nullable=False)
    education = db.Column(db.String(255), nullable=False)  # JSON string of education
    skills = db.Column(db.String(255), nullable=False)  # JSON string of skills

    def to_json(self):
        return {
            "job_seeker_id": self.job_seeker_id,
            "user_id": self.user_id,
            "profile_pic": self.profile_pic,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "dob": self.dob.isoformat(),  # Convert date to string
            "gender": self.gender,
            "nationality": self.nationality,
            "education": json.loads(self.education),  # Convert JSON string to Python list
            "skills": json.loads(self.skills)  # Convert JSON string to Python list
        }

class JobPosting(db.Model):
    __tablename__ = "job_posting"
    job_posting_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    employer_id = db.Column(db.Integer, db.ForeignKey("employer.employer_id"))
    title = db.Column(db.String(255), nullable = False)
    salary = db.Column(db.String(255), nullable = False)
    location = db.Column(db.String(255), nullable = False)
    skills = db.Column(db.Text, nullable = False)
    description = db.Column(db.Text, nullable = False)
    created_at = db.Column(db.TIMESTAMP, server_default = db.func.now())
    updated_at = db.Column(db.TIMESTAMP, server_default = db.func.now())

    def to_json(self):
        return {
            "job_posting_id": self.job_posting_id,
            "employer_id": self.employer_id,
            "title": self.title,
            "salary": self.salary,
            "location": self.location,
            "skills": self.skills,
            "description": self.description,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat(),
        }

    def __repr__(self):
        return f'<JobPosting {self.title}>'  # Corrected to access title

    def to_dict(self):
        return {
            'job_posting_id': self.job_posting_id,
            'employer_id': self.employer_id,
            'title': self.title,  # Corrected to match field name
            'salary': self.salary,  # Corrected to match field name
            'location': self.location,
            'skills': self.skills,  # Corrected to match field name
            'description': self.description
        }


class Employer(db.Model):
    __tablename__ = "employer"
    employer_id = db.Column(db.Integer, primary_key = True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"))
    company_name = db.Column(db.Integer)

    def to_json(self):
        return {
            "employer_id": self.employer_id,
            "user_id": self.user_id,
            "company_name": self.company_name,
        }

class Application(db.Model):
    __tablename__ = "applications"
    application_id = db.Column(db.Integer, primary_key = True, autoincrement=True)
    job_posting_id = db.Column(db.Integer, db.ForeignKey("job_posting.job_posting_id"))
    job_seeker_id = db.Column(db.Integer, db.ForeignKey("job_seekers.job_seeker_id"))
    job_seeker_status = db.Column(db.Integer)
    employer_status = db.Column(db.Integer)
    created_at = db.Column(db.TIMESTAMP, server_default = db.func.now())

    def to_json(self):
        return {
            "application_id": self.application_id,
            "job_posting_id": self.job_posting_id,
            "job_seeker_id": self.job_seeker_id,
            "job_seeker_status": self.job_seeker_status,
            "employer_status": self.employer_status,
            "created_at": self.created_at.isoformat(),
        }
