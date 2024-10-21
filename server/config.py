import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY")
    SQLALCHEMY_DATABASE_URI = os.getenv("DEV_DATABASE")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = True
    CORS_HEADERS = "Content-Type"
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")

def register_routes(app):
    # Import and register each blueprint
    from routes.login_route import login_bp
    from routes.job_post_routes import job_post_bp
    from routes.job_seeker_create_profile import job_seeker_create_profile_bp
    from routes.employer_create_profile import employer_create_profile_bp
    from routes.routes import routes_bp  # If you have a general routes file

    app.register_blueprint(login_bp)
    app.register_blueprint(job_post_bp)
    app.register_blueprint(job_seeker_create_profile_bp)
    app.register_blueprint(employer_create_profile_bp)
    app.register_blueprint(routes_bp) 


def register_models(app):
    routes_dir = os.path.join(os.path.dirname(__file__), "models")
    for filename in os.listdir(routes_dir):
        if filename.endswith(".py") and not filename.startswith("__"):
            module_name = f"models.{filename[:-3]}"
            __import__(module_name)
