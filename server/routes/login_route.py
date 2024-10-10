from app import app, bcrypt
from flask import request, jsonify
from flask_jwt_extended import create_access_token
from datetime import datetime
from models.user_model import db, User
from flask_jwt_extended import unset_jwt_cookies, jwt_required


@app.route("/register", methods=["POST"])
def register_user():
    data = request.get_json()

    user_exists = User.query.filter_by(username=data.get("username")).first()
    email_exists = User.query.filter_by(email=data.get("email")).first()

    if user_exists:
        return jsonify({"error": "Username already exists"}), 409
    if email_exists:
        return jsonify({"error": "Email already exists"}), 409

    username = data.get("username")
    email = data.get("email")
    password = data.get("password")
    full_name = data.get("full_name")
    # If profile_picture is not provided, use a default value
    profile_picture = data.get("profile_picture", "default_profile_picture.png")

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    current_time = datetime.utcnow()

    new_user = User(
        username=username,
        email=email,
        password=hashed_password,
        full_name=full_name,
        profile_picture=profile_picture,
        created_at=current_time,
        updated_at=current_time
    )

    db.session.add(new_user)
    db.session.commit()

    access_token = create_access_token(identity=username)

    return jsonify({"user": new_user.to_json(), "access_token": access_token}), 201


""" @app.route("/profile", methods=["GET"])
@jwt_required()
def my_profile():
    response_body = {"name": "Logged in user", "email": "loggedInUser@gmail.com"}

    return jsonify(response_body), 200 """

@app.route("/login", methods=["POST"])
def login_user():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    user = User.query.filter_by(username=username).first()

    if not user:
        return jsonify({"error": "Invalid username or password"}), 401

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Invalid username or password"}), 401

    return jsonify({"message": "Successful login", "user": user.to_json()}), 200



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
    
    access_token = create_access_token(identity=user.user_id)
    
    return jsonify({"access_token":  access_token}), 200