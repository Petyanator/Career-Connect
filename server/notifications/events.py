from flask_socketio import SocketIO

socketio = SocketIO()

def setup_socket_events(app):
    @socketio.on('connect_request')
    def handle_connect_request(data):
        print('New connect request:', data)
        # You can handle real-time updates to other users here

    @socketio.on('connect')
    def handle_connect():
        print('Client connected')

    @socketio.on('disconnect')
    def handle_disconnect():
        print('Client disconnected')
