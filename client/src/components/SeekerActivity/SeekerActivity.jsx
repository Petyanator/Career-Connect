import { useEffect, useState } from "react";

function SeekerActivity() {
  const [activeTab, setActiveTab] = useState("accepted");
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

  // Filter applications based on the active tab (Accepted or Rejected)
  const filteredApplications = applications.filter((app) =>
    activeTab === "accepted"
      ? app.job_seeker_status === 1
      : app.job_seeker_status === 2
  );

  return (
    <div>
      <div>
        <button onClick={() => setActiveTab("accepted")}>Accepted</button>
        <button onClick={() => setActiveTab("rejected")}>Rejected</button>
      </div>
      <div>
        {filteredApplications.length > 0 ? (
          filteredApplications.map((application) => (
            <div key={application.application_id}>
              <p>Job Title: {application.job_title}</p>
              <p>Company Name: {application.company_name}</p>
              <p>
                Status:{" "}
                {application.job_seeker_status === 1 ? "Accepted" : "Rejected"}
              </p>
              <p>
                Applied on: {new Date(application.created_at).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p>No applications found.</p>
        )}
      </div>
    </div>
  );
}

export default SeekerActivity;
