import React from "react";
import "./Notifications.css";

const NotificationItem = ({ jobTitle, count }) => {
  return (
    <div className="notification-item">
      <div className="job-title">{jobTitle}</div>
      <div className="notification-count">{count}</div>
    </div>
  );
};

export default NotificationItem;
