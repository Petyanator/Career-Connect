from app import app, bcrypt
from flask import request, jsonify
from flask_jwt_extended import create_access_token
from datetime import datetime
from models.models import db, User
from flask_jwt_extended import unset_jwt_cookies, jwt_required


@app.route("/register", methods=["POST"])
def register_user():
    data = request.get_json()

    # Check if username or email already exists
    user_exists = User.query.filter_by(username=data.get("username")).first()
    email_exists = User.query.filter_by(email=data.get("email")).first()

    if user_exists:
        return jsonify({"error": "Username already exists"}), 409
    if email_exists:
        return jsonify({"error": "Email already exists"}), 409

    # Get user input
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")
    full_name = data.get("full_name")
    user_type = data.get("user_type")  # Extract user_type from request

    if user_type not in ["job_seeker", "employer"]:
        return jsonify({"error": "Invalid user type"}), 400

    # Hash the password
    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")

    # Create a new user object
    new_user = User(
        username=username,
        email=email,
        password=hashed_password,
        full_name=full_name,
        user_type=user_type  # Store user_type in the database
    )

    # Add the new user to the database
    db.session.add(new_user)
    db.session.commit()

    # Create an access token for the new user
    access_token = create_access_token(identity=new_user.user_id)  # Use user_id as identity

    # Return the new user and access token
    return jsonify({"user": new_user.to_json(), "access_token": access_token}), 201


@app.route("/login", methods=["POST"])
def login_user():
    data = request.get_json()  # Get the JSON payload from the request
    username = data.get("username")
    password = data.get("password")

    # Check if the username exists
    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({"error": "Invalid username or password"}), 401

    # Check if the password matches the hashed password in the database
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Invalid username or password"}), 401

    # Generate access token after successful login
    access_token = create_access_token(identity=user.user_id)  # Use user_id as identity
    print(access_token)
    return jsonify({"access_token": access_token, "message": "Login successful"}), 200


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
