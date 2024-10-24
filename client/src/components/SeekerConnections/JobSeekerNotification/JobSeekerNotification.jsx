import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported
import "./JobSeekerNotification.scss"; // Import your custom SCSS
import JobSeekerNotificationDelete from "./JobSeekerNotificationDelete";

function JobSeekerNotification() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:5000/api/job_seeker/notifications",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      setNotifications(data);
    };

    fetchNotifications();
  }, []);

  const handleDeleteNotification = (applicationId) => {
    // Filter out the deleted notification from the state
    setNotifications(
      notifications.filter(
        (notification) => notification.application_id !== applicationId
      )
    );
  };

  return (
    <div className="container my-5 jobseeker-notifications">
      {notifications.length > 0 ? (
        notifications.map((notification, index) => (
          <div key={index} className="card notification-card mb-3 shadow">
            <div className="card-body">
              <h5 className="card-title text-primary">
                {notification.job_posting_title}
              </h5>
              <p className="card-text">
                {notification.job_posting_description}
              </p>
              {notification.employer_status !== null && (
                <p className="card-text">
                  <strong>Status: </strong>
                  {notification.employer_status === 1 ? "Accepted" : "Rejected"}
                </p>
              )}
              <p className="card-text">
                <small className="text-muted">
                  Submitted on{" "}
                  {new Date(notification.created_at).toLocaleDateString()}
                </small>
              </p>
              <JobSeekerNotificationDelete
                applicationId={notification.application_id}
                onDelete={handleDeleteNotification}
              />
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-light">No notifications yet.</p>
      )}
    </div>
  );
}

export default JobSeekerNotification;
