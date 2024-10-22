import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const Notifications = ({ employerId }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const socket = io(`http://localhost:5000/notifications/${employerId}`);

    socket.on('notification', (notification) => {
      setNotifications((prev) => [...prev, notification]);
      alert(`New notification: ${notification.message}`);
    });

    return () => {
      socket.disconnect();
    };
  }, [employerId]);

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notif, index) => (
          <li key={index}>{notif.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;