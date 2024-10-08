from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from config import Config
from flask_jwt_extended import JWTManager

app = Flask(__name__)
CORS(app, supports_credentials = True)
bcrypt = Bcrypt(app)

app.config.from_object(Config)

db = SQLAlchemy(app)

jwt = JWTManager(app)

from routes import routes
from models.models import Search

if __name__ == "__main__":
    app.run(debug=True, port=5000)
