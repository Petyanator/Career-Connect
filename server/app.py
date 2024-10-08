from flask import Flask
from flask_cors import CORS
<<<<<<< HEAD
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from config import Config, register_routes, register_models
from flask_jwt_extended import JWTManager

app = Flask(__name__)
CORS(app, supports_credentials = True)
=======
from flask_bcrypt import Bcrypt
from flask_sqlachemy import SQLAlchemy
from config import Config
from flask_jwt_extended import JWTManager

app = Flask(__name__)

CORS(app, supports_credentials=True)

>>>>>>> 10b6022 (initial commit)
bcrypt = Bcrypt(app)

app.config.from_object(Config)

<<<<<<< HEAD
db = SQLAlchemy(app)

jwt = JWTManager(app)

register_routes(app)

register_models(app)

if __name__ == "__main__":
    app.run(debug=True, port=5000)
=======
jwt = JWTManager(app)

db = SQLAlchemy(app)

import routes


if __name__=="__main__":
    app.run(debug=True)
>>>>>>> 10b6022 (initial commit)
