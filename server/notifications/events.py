from flask_socketio import SocketIO

# Initialize SocketIO instance
socketio = SocketIO()

# Function to send a new notification using Socket.IO
def send_notification(notification_data):
    """
    Emit a real-time notification to all connected clients.
    :param notification_data: Dictionary containing notification details.
    """
    socketio.emit('new_notification', notification_data)

# Function to set up all socket events
def setup_socket_events(app):
    """
    Set up Socket.IO event handlers.
    :param app: Flask application instance
    """
    @socketio.on('connect_request')
    def handle_connect_request(data):
        """
        Handle a new connect request emitted by the client.
        :param data: Dictionary containing connect request details.
        """
        print('New connect request:', data)
        # Send real-time notification for connect requests
        send_notification({
            'notification_type': 'Connect Request',
            'message': f'You have a new connect request from User {data["sender_id"]}.',
            'receiver_id': data['receiver_id'],
        })

    @socketio.on('connect')
    def handle_connect():
        """
        Handle a client connection event.
        """
        print('Client connected')

    @socketio.on('disconnect')
    def handle_disconnect():
        """
        Handle a client disconnection event.
        """
        print('Client disconnected')

# Assuming the setup_socket_events is called from your app setup process
