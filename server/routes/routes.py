from app import app, db, bcrypt
from flask import jsonify, request
from models import User
from login_route import register_user, login_user, logout_user, create_token
from flask_jwt_extended import (
    create_access_token,
    unset_access_cookies,
    jwt_required,
    unset_access_cookies,
)

db.init_app(app)

register_user(app)
login_user(app)
logout_user(app)
create_token(app)