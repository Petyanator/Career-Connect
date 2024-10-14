import os
from dotenv import load_dotenv

# pip install python-dotenv
# import redis

load_dotenv()


class Config:
    SECRET_KEY = os.getenv("SECRET_KEY")
    SQLALCHEMY_DATABASE_URI = os.getenv("DEV_DATABASE")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = True
    CORS_HEADERS = "Content-Type"
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")

def register_routes(app):
    routes_dir = os.path.join(os.path.dirname(__file__), "routes")
    for filename in os.listdir(routes_dir):
        if filename.endswith(".py") and not filename.startswith("__"):
            module_name = f"routes.{filename[:-3]}"
            __import__(module_name)


def register_models(app):
    routes_dir = os.path.join(os.path.dirname(__file__), "models")
    for filename in os.listdir(routes_dir):
        if filename.endswith(".py") and not filename.startswith("__"):
            module_name = f"models.{filename[:-3]}"
            __import__(module_name)



