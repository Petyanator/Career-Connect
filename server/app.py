from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from config import Config, register_models, register_routes
from flask_jwt_extended import JWTManager

app = Flask(__name__)
CORS(app, supports_credentials = True)
bcrypt = Bcrypt(app)

app.config.from_object(Config)

db = SQLAlchemy(app)

jwt = JWTManager(app)

register_routes(app)

register_models(app)


if __name__ == "__main__":
    app.run(debug=True, port=500)