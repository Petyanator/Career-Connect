import React, { useEffect, useState } from 'react';


function JobSeekerNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getTokenFromLocalStorage = () => {
    return localStorage.getItem("token");
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      const token = getTokenFromLocalStorage();

      try {
        const response = await fetch('http://localhost:5000/api/job_seeker/notifications', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch notifications');
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

  if (loading) {
    return <p>Loading notifications...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (notifications.length === 0) {
    return <p>No notifications found.</p>;
  }

  return (
    <div className="notifications-container">
      <h2>Your Connection Requests</h2>
      {notifications.map((notification, index) => (
        <div key={index} className="notification-card">
          <h3>{notification.job_posting_title}</h3>
          <p>{notification.job_posting_description}</p>

          {/* Display status based on employer_status */}
          {notification.employer_status === 1 ? (
            <p className="status accepted">Connection Made!</p>
          ) : notification.employer_status === 2 ? (
            <p className="status rejected">Your request was rejected...</p>
          ) : (
            <p className="status pending">Pending</p>
          )}

          <p>Applied on: {new Date(notification.created_at).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
}

export default JobSeekerNotifications;
