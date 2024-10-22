import React, { useEffect, useState } from "react";
import './NotificationsComponents.scss'

function NotificationsComponent() {
  const [notifications, setNotifications] = useState([]);
  const [detailedNotifications, setDetailedNotifications] = useState([]);

  const getTokenFromLocalStorage = () => localStorage.getItem("token");

  const fetchNotifications = async () => {
    const token = getTokenFromLocalStorage();
    try {
      const response = await fetch("http://localhost:5000/api/employer/notifications", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch notifications");
      }

      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const fetchJobPostingDetails = async (jobPostingId) => {
    const token = getTokenFromLocalStorage();
    try {
      const response = await fetch(`http://localhost:5000/api/job_posting/${jobPostingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error("Error fetching job posting details:", error);
    }
    return null;
  };

  const fetchJobSeekerDetails = async (jobSeekerId) => {
    const token = getTokenFromLocalStorage();
    try {
      const response = await fetch(`http://localhost:5000/api/job_seekers/${jobSeekerId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error("Error fetching job seeker details:", error);
    }
    return null;
  };

  const handleEmployerResponse = async (applicationId, status) => {
    const token = getTokenFromLocalStorage();
    try {
      const response = await fetch(`http://localhost:5000/api/employer/update_application`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ application_id: applicationId, employer_status: status }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update employer status");
      }

      const data = await response.json();
      alert(data.message); // Show confirmation to the employer

      // Refetch notifications after updating the status
      fetchNotifications();
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const loadDetailedNotifications = async () => {
    const detailedData = await Promise.all(
      notifications.map(async (notification) => {
        const jobPostingDetails = await fetchJobPostingDetails(notification.job_posting_id);
        const jobSeekerDetails = await fetchJobSeekerDetails(notification.job_seeker_id);
        return {
          ...notification,
          jobPostingDetails,
          jobSeekerDetails,
        };
      })
    );
    setDetailedNotifications(detailedData);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    if (notifications.length > 0) {
      loadDetailedNotifications();
    }
  }, [notifications]);

  return (
    <div className="notifications-container">
      <h2>Notifications</h2>
      {detailedNotifications.length === 0 ? (
        <p>No notifications to display</p>
      ) : (
        <ul className="list-group">
          {detailedNotifications.map((notification) => (
            <li key={notification.notification_id} className="list-group-item">
              <p className="job-posting-title">
                <strong>Job Posting:</strong> {notification.jobPostingDetails?.title}
              </p>
              <p className="job-description">
                <strong>Description:</strong> {notification.jobPostingDetails?.description}
              </p>
              <p className="job-seeker-name">
                <strong>Job Seeker:</strong> {notification.jobSeekerDetails?.first_name}{" "}
                {notification.jobSeekerDetails?.last_name}
              </p>
              <p className="skills-list">
                <strong>Skills:</strong> {notification.jobSeekerDetails?.skills?.join(", ")}
              </p>

              {/* Accept and Reject buttons */}
              <div className="button-group">
                <button
                  className="btn btn-success me-2"
                  onClick={() => handleEmployerResponse(notification.application_id, 1)} // 1 for Accept
                >
                  Accept
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleEmployerResponse(notification.application_id, 2)} // 2 for Reject
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default NotificationsComponent;
