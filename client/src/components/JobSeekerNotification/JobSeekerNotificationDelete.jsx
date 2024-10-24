import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './JobSeekerNotification.scss';  // Your global styles

function JobSeekerNotificationDelete({ applicationId, onDelete }) {
  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5000/api/job_seeker/delete_application/${applicationId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete the application');
      }

      const data = await response.json();
      alert(data.message);
      onDelete(applicationId);  // Notify parent to remove the notification from the list
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <button className="btn btn-danger" onClick={handleDelete}>
      Delete
    </button>
  );
}

export default JobSeekerNotificationDelete;
