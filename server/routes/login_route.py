from flask import request, jsonify, Blueprint
from flask_jwt_extended import create_access_token, unset_jwt_cookies
from models.models import User
from extensions import db, bcrypt
from flask_cors import cross_origin

login_bp = Blueprint('login_bp', __name__)

@login_bp.route("/login", methods=["POST"])
@cross_origin(origin='http://localhost:5173', supports_credentials=True)
def login_user():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    # Fetch the user from the database
    user = User.query.filter_by(username=username).first()
    if not user or not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Invalid username or password"}), 401

    # Create JWT token
    access_token = create_access_token(identity=user.user_id)
    user_type = user.user_type

    return jsonify({"access_token": access_token, "user_type": user_type, "message": "Login successful"}), 200
