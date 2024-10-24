import { useEffect, useState } from "react";
import "./SeekerApplied.scss";

function SeekerApplied() {
  const [applications, setApplications] = useState([]);

  // Fetch applications from the server
  const fetchApplications = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://127.0.0.1:5000/api/applications", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      setApplications(data);
    } else {
      alert("Failed to fetch applications");
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // Filter applications to show only accepted ones (job_seeker_status === 1)
  const applied = applications.filter((app) => app.job_seeker_status === 1);

  return (
    <div className="applied-container">
      <div>
        {applied.length > 0 ? (
          applied.map((application) => (
            <div className="job-listing" key={application.application_id}>
              <p>Job Title: {application.job_title}</p>
              <p>Company Name: {application.company_name}</p>

              <p>
                Applied on: {new Date(application.created_at).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="no-applications">
            You have not sent any connection requests.
          </p>
        )}
      </div>
    </div>
  );
}

export default SeekerApplied;
