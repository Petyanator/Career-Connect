from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_socketio import SocketIO
from models import db
from routes import notifications_bp
from events import setup_socket_events

app = Flask(__name__)

# Configuration for SQLAlchemy and Socket.IO
app.config['SQLALCHEMY_DATABASE_URI'] = 'mariadb+pymysql://root:@localhost:3306/career_connectdb'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize database and SocketIO
db.init_app(app)
socketio = SocketIO(app)

# Register blueprints
app.register_blueprint(notifications_bp)

# Setup Socket.IO events
setup_socket_events(app)

# Run the app with SocketIO support
if __name__ == '__main__':
    socketio.run(app, debug=True)
