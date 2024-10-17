import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Notification() {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // Fetch notifications from backend
        async function fetchNotifications() {
            try {
                const response = await axios.get('http://localhost:5000/notifications', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}` // Include token for authentication
                    }
                });
                setNotifications(response.data);
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        }

        fetchNotifications();
    }, []);

    return (
        <div className="notification-container">
            {notifications.length > 0 ? (
                notifications.map((notification) => (
                    <div key={notification.id} className="notification-item">
                        <p>{notification.message}</p>
                        <small>{new Date(notification.created_at).toLocaleString()}</small>
                    </div>
                ))
            ) : (
                <p>No new notifications</p>
            )}
        </div>
    );
}

export default Notification;