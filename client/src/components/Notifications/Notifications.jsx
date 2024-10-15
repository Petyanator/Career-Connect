import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./notification.css"; // Import your notification.css

// Initialize Socket.IO connection
const socket = io("http://localhost:5000");

const Notification = () => {
  const [jobSeekerNotifications, setJobSeekerNotifications] = useState([]);
  const [employerNotifications, setEmployerNotifications] = useState([]);

  // Fetch notifications and listen to new notifications via Socket.IO
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const jobSeekerResponse = await fetch("/api/notifications/job-seeker");
        const jobSeekerData = await jobSeekerResponse.json();
        setJobSeekerNotifications(jobSeekerData);

        const employerResponse = await fetch("/api/notifications/employer");
        const employerData = await employerResponse.json();
        setEmployerNotifications(employerData);
      } catch (error) {
        console.error("Failed to fetch notifications", error);
      }
    };

    fetchNotifications();

    // Listen for real-time notifications
    socket.on("connect_request", (newNotification) => {
      if (newNotification.user_type === "job_seeker") {
        setJobSeekerNotifications((prev) => [newNotification, ...prev]);
      } else if (newNotification.user_type === "employer") {
        setEmployerNotifications((prev) => [newNotification, ...prev]);
      }
    });

    return () => {
      socket.off("connect_request");
      socket.disconnect();
    };
  }, []);

  return (
    <div className="notification-container">
      {/* Job Seeker Notifications Section */}
      <div className="job-seeker-notifications">
        <h2>Job Seeker Notifications</h2>
        <div className="notification-tabs">
          <button className="tab">Connect</button>
          <button className="tab">Pending</button>
          <button className="tab">! (Alert)</button>
        </div>
        <div className="notification-list">
          {jobSeekerNotifications.map((notification, index) => (
            <div key={index} className="notification-item">
              {notification.message}
              <small>
                {new Date(notification.created_at).toLocaleString()}
              </small>
            </div>
          ))}
        </div>
      </div>

      {/* Employer Notifications Section */}
      <div className="employer-notifications">
        <h2>Employer Notifications</h2>
        <div className="notification-list">
          {employerNotifications.map((notification, index) => (
            <div key={index} className="notification-item">
              Job Post Application{" "}
              <span className="notification-number">{index + 1}</span>
              <small>
                {new Date(notification.created_at).toLocaleString()}
              </small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notification;
