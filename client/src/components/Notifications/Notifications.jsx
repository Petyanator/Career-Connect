import React, { useEffect, useState } from "react";
import NotificationItem from "./NotificationItem";
import io from "socket.io-client";
import "./Notifications.css";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const token = localStorage.getItem("token"); // Get the token from localStorage

  useEffect(() => {
    const socket = io("http://localhost:5000", {
      query: { token }, // Pass the token as a query parameter
    });

    socket.on("new_notification", (data) => {
      setNotifications((prev) => [...prev, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, [token]); // Add token as a dependency in case it changes

  return (
    <div className="notification-container">
      <h2>Employer Notifications</h2>
      {notifications.length > 0 ? (
        notifications.map((notification, index) => (
          <NotificationItem
            key={index}
            jobTitle={notification.jobTitle}
            count={notification.count}
          />
        ))
      ) : (
        <p>No notifications yet.</p>
      )}
    </div>
  );
};

export default Notifications;
