from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_socketio import SocketIO
from models import db
from routes import notifications_bp
from events import setup_socket_events
from dotenv import load_dotenv
import os
from flask_cors import CORS

# Load environment variables from .env file
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))

app = Flask(__name__)
CORS(app)
db = SQLAlchemy()
app.register_blueprint(notifications_bp)
# Configuration for SQLAlchemy and Socket.IO
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')  # Use the correct variable name
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize database and SocketIO
db.init_app(app)
socketio = SocketIO(app)
# Setup Socket.IO events
setup_socket_events(app)

# Run the app with SocketIO support
if __name__ == '__main__':
    socketio.run(app, debug=True)
