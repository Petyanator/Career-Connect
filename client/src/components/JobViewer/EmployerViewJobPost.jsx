import { useState, useEffect } from "react";

const EmployerViewJobPost = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchEmployerJobs = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/employer/jobs",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        // Check if the response is OK
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Unauthorized access - Please log in again");
          } else if (response.status === 404) {
            throw new Error("No job postings found for this employer");
          } else {
            throw new Error("Failed to fetch job postings");
          }
        }

        // Parse the response as JSON
        const data = await response.json();
        setJobs(data);
      } catch (err) {
        setError(err.message || "An error occurred while loading job postings");
        console.error(err);
      }
    };

    fetchEmployerJobs();
  }, [token]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>My Job Postings</h1>
      {jobs.length > 0 ? (
        <ul>
          {jobs.map((job) => (
            <li key={job.job_posting_id}>
              <h2>{job.title}</h2>
              <p>{job.description}</p>
              <p>Location: {job.location}</p>
              <p>Salary: {job.salary}</p>
              <p>Skills: {job.skills}</p>
              <p>Posted on: {new Date(job.created_at).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>You have not posted any jobs yet.</p>
      )}
    </div>
  );
};

export default EmployerViewJobPost;
