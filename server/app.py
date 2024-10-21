from flask import Flask
from flask_cors import CORS
from routes.employer_create_profile import employer_create_profile_bp

app = Flask(__name__)
CORS(app)

# Register the blueprint
app.register_blueprint(employer_create_profile_bp)

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5001, debug=True)
