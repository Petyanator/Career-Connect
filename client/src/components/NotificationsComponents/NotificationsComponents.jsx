import React, { useEffect, useState } from 'react';

function NotificationsComponent() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getTokenFromLocalStorage = () => {
    return localStorage.getItem('token');
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      const token = getTokenFromLocalStorage();
      if (!token) {
        setError('Authorization token is missing');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/employer/notifications', {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch notifications');
        }

        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div>
      <h2>Notifications</h2>
      {notifications.length === 0 ? (
        <p>No notifications found.</p>
      ) : (
        <ul>
          {notifications.map((notification) => (
            <li key={notification.notification_id}>
              <p>Job Posting ID: {notification.job_posting_id}</p>
              <p>Job Seeker ID: {notification.job_seeker_id}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default NotificationsComponent;
