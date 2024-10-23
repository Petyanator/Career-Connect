<<<<<<< HEAD
from flask import request, jsonify, Blueprint
from flask_jwt_extended import create_access_token, unset_jwt_cookies
from models.models import User
from extensions import db, bcrypt
from flask_cors import cross_origin

login_bp = Blueprint('login_bp', __name__)
=======
from app import app, bcrypt
from flask import request, jsonify
from flask_jwt_extended import create_access_token, unset_jwt_cookies
from datetime import datetime
from models.models import db, User
>>>>>>> main

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
<<<<<<< HEAD
=======



@app.route("/logout", methods=["POST"])
def logout_user():
    response = jsonify({"message": "Logout successful"})
    unset_jwt_cookies(response)

    return response, 200


@app.route("/token", methods=["POST"])
def create_token():
    data = request.get_json()

    user = User.query.filter_by(username=data.get("username")).first()

    if user is None:
        return jsonify({"error": "Invalid username"}), 401
    if not bcrypt.check_password_hash(user.password, data.get("password")):
        return jsonify({"error": "Invalid password"}), 401

    access_token = create_access_token(identity=user.user_id)  # Use user_id as identity

    return jsonify({"access_token": access_token}), 200
>>>>>>> main
