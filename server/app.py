<<<<<<< HEAD

from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from config import Config, register_routes, register_models
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
    app.run(debug=True, port=5000)
=======
# /server/app.py (or main Flask file)
from flask import Flask
from routes.job_post_routes import job_post_routes
from models import db
from flask_cors import CORS


app = Flask(__name__)
CORS(app)  # Enable CORS

# Database configuration (MySQL example)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mariadb+pymysql://root:@localhost:3307/career_connect'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy
db.init_app(app)

# Register the job posting routes
app.register_blueprint(job_post_routes)

if __name__ == '__main__':
    app.run(debug=True)
>>>>>>> 32d0c73 (aded routes)
