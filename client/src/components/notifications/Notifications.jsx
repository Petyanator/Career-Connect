import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Notification() {
    const [notifications, setNotifications] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch notifications from backend
        async function fetchNotifications() {
            const token = localStorage.getItem('token');

            if (!token) {
                setErrorMessage('No token found, please log in.');
                navigate('/login');  // Redirect to login if no token is found
                return;
            }

            try {
                const response = await axios.get('http://localhost:5000/notifications', {
                    headers: {
                        Authorization: `Bearer ${token}`  // Include token for authentication
                    }
                });
                setNotifications(response.data);
            } catch (error) {
                console.error("Error fetching notifications:", error);
                if (error.response && error.response.status === 422) {
                    setErrorMessage('Invalid request. Please check your token or request format.');
                } else {
                    setErrorMessage('Failed to fetch notifications.');
                }
            }
        }

        fetchNotifications();
    }, [navigate]);

    return (
        <div className="notification-container">
            {errorMessage ? (
                <p>{errorMessage}</p>
            ) : (
                notifications.length > 0 ? (
                    notifications.map((notification) => (
                        <div key={notification.id} className="notification-item">
                            <p>{notification.message}</p>
                            <small>{new Date(notification.created_at).toLocaleString()}</small>
                        </div>
                    ))
                ) : (
                    <p>No new notifications</p>
                )
            )}
        </div>
    );
}

export default Notification;