
from app import db
from datetime import datetime

""" class User(db.Model):
    __tablename__ = "users"
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    email = db.Column(db.String(100), nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=False)
    full_name = db.Column(db.String(100), nullable=True)
    profile_picture = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now())
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(), onupdate=lambda: datetime.now())
    
    def to_json(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "full_name": self.full_name,
            "profile_picture": self.profile_picture,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat(),
        }
 """
class JobSeeker(db.Model):
    __tablename__ = "job_seekers"
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    profile_pic = db.Column(db.String(255), nullable=True)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    dob = db.Column(db.Date, nullable=False)
    gender = db.Column(db.String(30), nullable=False)
    nationality = db.Column(db.String(255), nullable=False)
    education = db.Column(db.Text, nullable=True)
    skills = db.Column(db.Text, nullable=True)

    def to_json(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "profile_pic": self.profile_pic,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "dob": self.dob.isoformat(),
            "gender": self.gender,
            "nationality": self.nationality,
            "education": self.education,
            "skills": self.skills,
        }

class Employer(db.Model):
    __tablename__ = "employer"
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    company_name = db.Column(db.String(255), nullable=False)
    company_logo = db.Column(db.LargeBinary, nullable=False)
    about = db.Column(db.Text, nullable=True)
    preferential_treatment = db.Column(db.Text, nullable=True)
    company_benefits = db.Column(db.Text, nullable=True)
    contact_information = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now())
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(), onupdate=lambda: datetime.now())

    def to_json(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "company_name": self.company_name,
            "company_logo": self.company_logo,
            "about": self.about,
            "preferential_treatment": self.preferential_treatment,
            "company_benefits": self.company_benefits,
            "contact_information": self.contact_information,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat(),
        }

class JobPosting(db.Model):
    __tablename__ = "job_posting"
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    employer_id = db.Column(db.Integer, db.ForeignKey('employer.id'), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    salary = db.Column(db.String(255), nullable=False)
    location = db.Column(db.String(255), nullable=False)
    skills = db.Column(db.Text, nullable=True)
    description = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now())
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(), onupdate=lambda: datetime.now())


from app import db
from datetime import datetime

class JobPosting(db.Model):
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

            "employer_id": self.employer_id,
            "title": self.title,
            "salary": self.salary,
            "location": self.location,
            "skills": self.skills,
            "description": self.description,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat(),
        }

class Application(db.Model):
    __tablename__ = "applications"
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    job_posting_id = db.Column(db.Integer, db.ForeignKey('job_posting.id'), nullable=False)
    job_seeker_id = db.Column(db.Integer, db.ForeignKey('job_seekers.id'), nullable=False)
    job_seeker_status = db.Column(db.Boolean, nullable=False)
    employer_status = db.Column(db.Boolean, nullable=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now())

    def to_json(self):
        return {
            "id": self.id,
            "job_posting_id": self.job_posting_id,
            "job_seeker_id": self.job_seeker_id,
            "job_seeker_status": self.job_seeker_status,
            "employer_status": self.employer_status,
            "created_at": self.created_at.isoformat(),
        }

class Notification(db.Model):
    __tablename__ = "notifications"
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    application_id = db.Column(db.Integer, db.ForeignKey('applications.id'), nullable=False)
    employer_id = db.Column(db.Integer, db.ForeignKey('employer.id'), nullable=False)
    accepted = db.Column(db.Boolean, nullable=False)

    def to_json(self):
        return {
            "id": self.id,
            "application_id": self.application_id,
            "employer_id": self.employer_id,
            "accepted": self.accepted,
        }

            "job_title": self.job_title,
            "company": self.company,
            "salary_range": self.salary_range,
            "location": self.location,
            "required_skills": self.required_skills,
            "description": self.description,
            "created_at": self.created_at.strftime('%Y-%m-%d %H:%M:%S')  # Formatting timestamp
        }
    def __repr__(self):
        return f'<JobPosting {self.job_title}>'
    def to_dict(self):
        return {
            'id': self.id,
            'job_title': self.job_title,
            'salary_range': self.salary_range,
            'location': self.location,
            'required_skills': self.required_skills,
        }

