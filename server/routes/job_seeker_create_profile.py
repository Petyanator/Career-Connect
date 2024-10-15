# routes/job_seeker_create_profile.py
from flask import Blueprint, request, jsonify, current_app as app
from werkzeug.utils import secure_filename
import os
import base64
import pymysql as MySQLdb
from datetime import datetime

job_seeker_create_profile_bp = Blueprint('job_seeker_create_profile_bp', __name__)

def get_db_connection():
    return MySQLdb.connect(
        host='your_database_host',
        user='your_database_user',
        passwd='your_database_password',
        db='careerconnect',
        charset='utf8mb4'
    )

@job_seeker_create_profile_bp.route('/api/job_seeker/create_profile', methods=['POST'])
def create_profile():
    try:
        data = request.get_json()

        # Extract and validate data
        required_fields = ['first_name', 'last_name', 'dob', 'gender', 'nationality', 'education', 'skills'] # no "user_id" just for testing purposes
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'Missing required field: {field}'}), 400

        user_id = data['user_id']
        profile_pic = data.get('profile_pic')  # Optional
        first_name = data['first_name']
        last_name = data['last_name']
        dob = data['dob']
        gender = data['gender']
        nationality = data['nationality']
        education = data['education']
        skills = data['skills']

        # Convert lists to comma-separated strings if necessary
        if isinstance(education, list):
            education = ','.join(education)
        if isinstance(skills, list):
            skills = ','.join(skills)

        # Handle profile picture upload
        profile_pic_path = None
        if profile_pic and profile_pic.startswith('data:image/'):
            img_data = profile_pic.split(',')[1]
            img_data = base64.b64decode(img_data)
            filename = secure_filename(f"{user_id}_{datetime.now().strftime('%Y%m%d%H%M%S')}.png")
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            with open(filepath, 'wb') as f:
                f.write(img_data)
            profile_pic_path = filepath
        elif profile_pic:
            profile_pic_path = profile_pic  # URL or existing path

        # Insert into database
        conn = get_db_connection()
        cursor = conn.cursor()

        insert_query = """
            INSERT INTO job_seekers
            (user_id, profile_pic, first_name, last_name, dob, gender, nationality, education, skills)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        cursor.execute(insert_query, (
            user_id,
            profile_pic_path or '',
            first_name,
            last_name,
            dob,
            gender,
            nationality,
            education,
            skills
        ))
        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({'message': 'Profile created successfully'}), 201

    except Exception as e:
        # Log the exception (you can use logging module)
        print(f"Error: {e}")
        return jsonify({'error': 'An error occurred while creating the profile.'}), 500
