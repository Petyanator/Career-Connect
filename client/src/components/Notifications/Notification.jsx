// // src/components/Notifications/Notification.jsx
// import React, { useEffect, useState } from "react";
// import io from "socket.io-client";
// import axios from "axios";
// import "./Notification.css"; // Import the CSS stylesheet

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

import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import "./Notification.css"; // Import the CSS stylesheet

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [newNotification, setNewNotification] = useState(null);

  // Get token from localStorage
  const token = localStorage.getItem("token");

  // Mock function to simulate fetching notifications from an API
  const fetchMockNotifications = () => {
    return [
      { message: "You have a new job application!" },
      { message: "Your application has been accepted." },
      { message: "You received a new message from an employer." },
      { message: "Interview scheduled for next week." },
    ];
  };

  useEffect(() => {
    if (!token) {
      console.error("No token found, please log in");
      return;
    }

    if (process.env.NODE_ENV === "development") {
      // Mocked socket.io connection for development
      console.log("Mocked socket connection established");

      // Simulate receiving a new notification via socket
      const mockNewNotification = {
        message: "You have a new interview invitation!",
      };
      setTimeout(() => setNewNotification(mockNewNotification), 3000); // Simulate a delay for the new notification

      // Cleanup when component unmounts (mocked)
      return () => {
        console.log("Mocked socket connection disconnected");
      };
    } else {
      // Actual socket.io connection in production
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
    }
  }, [token]);

  useEffect(() => {
    if (!token) {
      console.error("No token found, cannot fetch notifications");
      return;
    }

    if (process.env.NODE_ENV === "development") {
      // Use the mock function to simulate the API call
      const mockNotifications = fetchMockNotifications();
      setNotifications(mockNotifications);
    } else {
      // Fetch actual notifications using Axios in production
      axios
        .get("http://localhost:5000/api/notifications", {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in request header
          },
        })
        .then((response) => {
          setNotifications(response.data);
        })
        .catch((error) =>
          console.error("Error fetching notifications:", error)
        );
    }
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
