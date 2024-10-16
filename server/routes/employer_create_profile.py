# /server/routes/employer_create_profile.py
from flask import request, jsonify
from app import app, db
from models.models import Employer  
import base64
from werkzeug.utils import secure_filename
import os
from datetime import datetime

@app.route('/api/employer/create_profile', methods=['POST'])
def create_employer_profile():
    try:
        data = request.get_json()
        print("Received data:", data)
        
        # Simple validation for required fields
        required_fields = ['user_id', 'company_name', 'about_company', 'contact']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'Missing required field: {field}'}), 400

        # Extract and process data
        user_id = data['user_id']
        print("User ID:", user_id)

        # Check if user_id is missing or None
        if not user_id:
            return jsonify({'error': 'User ID is missing or None'}), 400

        company_name = data['company_name']
        company_logo = data.get('company_logo')  # Optional
        about_company = data['about_company']
        preferential_treatment = data.get('preferential_treatment', [])
        company_benefits = data.get('company_benefits', [])
        contact = data['contact']

        # Convert lists to comma-separated strings if necessary
        preferential_treatment = ','.join(preferential_treatment) if isinstance(preferential_treatment, list) else preferential_treatment
        company_benefits = ','.join(company_benefits) if isinstance(company_benefits, list) else company_benefits

        # Create a new Employer instance
        new_employer = Employer(
            user_id=user_id,  # Make sure user_id is passed
            company_name=company_name,
            company_logo=company_logo,
            about_company=about_company,
            preferential_treatment=preferential_treatment,
            company_benefits=company_benefits,
            contact=contact
        )

        # Save to the database
        db.session.add(new_employer)
        db.session.commit()
        return jsonify({'message': 'Employer profile created successfully!'}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Error occurred: {str(e)}'}), 500
