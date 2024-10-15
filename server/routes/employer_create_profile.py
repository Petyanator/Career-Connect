# routes/employer_create_profile.py
from flask import Blueprint, request, jsonify, current_app as app
from werkzeug.utils import secure_filename
import os
import base64
import pymysql as MySQLdb
from datetime import datetime

employer_create_profile_bp = Blueprint('employer_create_profile_bp', __name__)

def get_db_connection():
    return MySQLdb.connect(
        host='your_database_host',
        user='your_database_user',
        passwd='your_database_password',
        db='careerconnect',
        charset='utf8mb4'
    )

@employer_create_profile_bp.route('/api/employer/create_profile', methods=['POST'])
def create_employer_profile():
    try:
        data = request.get_json()

        # Extract and validate data
        required_fields = ['company_name', 'about_company', 'contact']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'Missing required field: {field}'}), 400

        company_name = data['company_name']
        company_logo = data.get('company_logo')  # Optional
        about_company = data['about_company']
        preferential_treatment = data.get('preferential_treatment', [])
        company_benefits = data.get('company_benefits', [])
        contact = data['contact']

        # Convert lists to comma-separated strings if necessary
        if isinstance(preferential_treatment, list):
            preferential_treatment = ','.join(preferential_treatment)
        if isinstance(company_benefits, list):
            company_benefits = ','.join(company_benefits)

        # Handle company logo upload
        company_logo_path = None
        if company_logo and company_logo.startswith('data:image/'):
            img_data = company_logo.split(',')[1]
            img_data = base64.b64decode(img_data)
            filename = secure_filename(f"{company_name}_{datetime.now().strftime('%Y%m%d%H%M%S')}.png")
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            with open(filepath, 'wb') as f:
                f.write(img_data)
            company_logo_path = filepath
        elif company_logo:
            company_logo_path = company_logo  # URL or existing path

        # Insert into database
        conn = get_db_connection()
        cursor = conn.cursor()

        insert_query = """
            INSERT INTO employers
            (company_name, company_logo, about_company, preferential_treatment, company_benefits, contact)
            VALUES (%s, %s, %s, %s, %s, %s)
        """
        cursor.execute(insert_query, (
            company_name,
            company_logo_path or '',
            about_company,
            preferential_treatment,
            company_benefits,
            contact
        ))
        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({'message': 'Employer profile created successfully'}), 201

    except Exception as e:
        # Log the exception (you can use logging module)
        print(f"Error: {e}")
        return jsonify({'error': 'An error occurred while creating the employer profile.'}), 500