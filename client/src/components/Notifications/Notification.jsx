// // src/components/Notification.jsx
// import React, { useEffect, useState } from "react";
// import io from "socket.io-client";
// import axios from "axios";
// import "./Notification.css"; // Import the SASS stylesheet

// const Notification = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [newNotification, setNewNotification] = useState(null);

//   // Get token from localStorage
//   const token = localStorage.getItem("token");

//   // Socket connection
//   useEffect(() => {
//     if (!token) {
//       console.error("No token found, please log in");
//       return;
//     }

//     const socket = io("http://localhost:5000", {
//       query: { token }, // Send token as query param
//     });

//     // Listening for "notification" event from server
//     socket.on("notification", (data) => {
//       setNewNotification(data);
//     });

//     // Cleanup when component unmounts
//     return () => {
//       socket.disconnect();
//     };
//   }, [token]);

//   // Fetch existing notifications using Axios
//   useEffect(() => {
//     if (!token) {
//       console.error("No token found, cannot fetch notifications");
//       return;
//     }

//     axios
//       .get("http://localhost:5000/api/notifications", {
//         headers: {
//           Authorization: `Bearer ${token}`, // Send token in request header
//         },
//       })
//       .then((response) => {
//         setNotifications(response.data);
//       })
//       .catch((error) => console.error("Error fetching notifications:", error));
//   }, [token]);

//   // Add the new notification to the state
//   useEffect(() => {
//     if (newNotification) {
//       setNotifications((prev) => [newNotification, ...prev]);
//     }
//   }, [newNotification]);

//   return (
//     <div className="notification-page">
//       <h1>Notifications</h1>
//       <ul className="notification-list">
//         {notifications.map((notification, index) => (
//           <li key={index} className="notification-item">
//             {notification.message}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Notification;

// src / components / Notifications / Notification.jsx;

// src/components/Notifications/Notification.jsx
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import "./Notification.css"; // CSS for styling

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [newNotification, setNewNotification] = useState(null);

  // Get the token from localStorage
  const token = localStorage.getItem("token");

  // Socket connection
  useEffect(() => {
    const socket = io("http://localhost:5000"); // Update to your backend URL

    // Listening for "notification" event from server for connection requests
    socket.on("connection_request", (data) => {
      setNewNotification(data);
    });

    // Cleanup when component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  // Fetch existing connection request notifications using Axios
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/notifications", {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in request headers
        },
      })
      .then((response) => {
        setNotifications(response.data);
      })
      .catch((error) => console.error("Error fetching notifications:", error));
  }, [token]);

  // Add the new connection request notification to the state
  useEffect(() => {
    if (newNotification) {
      setNotifications((prev) => [newNotification, ...prev]);
    }
  }, [newNotification]);

  return (
    <div className="notification-page">
      <h1>Connection Requests</h1>
      <ul className="notification-list">
        {notifications.map((notification, index) => (
          <li key={index} className="notification-item">
            <div className="notification-message">
              {notification.job_seeker_name} wants to connect with you for the
              job: {notification.job_title}
            </div>
            <div className="notification-actions">
              <button className="accept-btn">Accept</button>
              <button className="reject-btn">Reject</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notification;
