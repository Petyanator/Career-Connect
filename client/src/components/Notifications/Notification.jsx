// src/components/Notification.jsx
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import "./Notification.css"; // Import the SASS stylesheet

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [newNotification, setNewNotification] = useState(null);

  // Get token from localStorage
  const token = localStorage.getItem("token");

  // Socket connection
  useEffect(() => {
    if (!token) {
      console.error("No token found, please log in");
      return;
    }

    const socket = io("http://localhost:5000", {
      query: { token }, // Send token as query param
    });

    // Listening for "notification" event from server
    socket.on("notification", (data) => {
      setNewNotification(data);
    });

    // Cleanup when component unmounts
    return () => {
      socket.disconnect();
    };
  }, [token]);

  // Fetch existing notifications using Axios
  useEffect(() => {
    if (!token) {
      console.error("No token found, cannot fetch notifications");
      return;
    }

    axios
      .get("http://localhost:5000/api/notifications", {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in request header
        },
      })
      .then((response) => {
        setNotifications(response.data);
      })
      .catch((error) => console.error("Error fetching notifications:", error));
  }, [token]);

  // Add the new notification to the state
  useEffect(() => {
    if (newNotification) {
      setNotifications((prev) => [newNotification, ...prev]);
    }
  }, [newNotification]);

  return (
    <div className="notification-page">
      <h1>Notifications</h1>
      <ul className="notification-list">
        {notifications.map((notification, index) => (
          <li key={index} className="notification-item">
            {notification.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notification;
