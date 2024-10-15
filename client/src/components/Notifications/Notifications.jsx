import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./notifications.css";

const socket = io("http://localhost:5000");

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch("/api/notifications");
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error("Failed to fetch notifications", error);
      }
    };

    fetchNotifications();

    socket.on("connect_request", (newNotification) => {
      setNotifications((prev) => [newNotification, ...prev]);
    });

    return () => {
      socket.off("connect_request");
      socket.disconnect();
    };
  }, []);

  return (
    <div className="notifications-container">
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>
            <p>{notification.sender_name} sent you a connect request.</p>
            <small>{new Date(notification.created_at).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
