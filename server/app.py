from flask import Flask
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_sqlachemy import SQLAlchemy
from config import Config
from flask_jwt_extended import JWTManager

app = Flask(__name__)

CORS(app, supports_credentials=True)

bcrypt = Bcrypt(app)

app.config.from_object(Config)

jwt = JWTManager(app)

db = SQLAlchemy(app)

import routes


if __name__=="__main__":
    app.run(debug=True)