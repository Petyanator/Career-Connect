import React, { useState, useEffect } from "react";
// import './JobViewer.css'

const JobViewer = () => {
  const [jobs, setJobs] = useState([]); // Store all job postings
  const [currentIndex, setCurrentIndex] = useState(0); // Track current job index
  const [loading, setLoading] = useState(true);

  // Fetch job postings from the backend (Flask)
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/jobs");
        const data = await response.json();
        setJobs(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Function to go to the next job
  const handleNextJob = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % jobs.length); // Loop back to the start
  };

  // Function to go to the previous job
  const handlePreviousJob = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + jobs.length) % jobs.length); // Loop back to the end
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // If there are no jobs, display a message
  if (jobs.length === 0) {
    return <div>No job postings available.</div>;
  }

  // Get the current job posting based on the index
  const currentJob = jobs[currentIndex];

  return (
    <div className="job-viewer">
      <div className="job-card">
        <h3>{currentJob.job_title}</h3>
        <p>
          <strong>Company:</strong> {currentJob.company}
        </p>
        <p>
          <strong>Location:</strong> {currentJob.location}
        </p>
        <p>
          <strong>Salary:</strong> {currentJob.salary_range}
        </p>
        <p>
          <strong>Required Skills:</strong> {currentJob.required_skills}
        </p>
        <p>{currentJob.description}</p>
      </div>

      <div className="job-navigation">
        <button onClick={handlePreviousJob} disabled={jobs.length <= 1}>
          Previous Job
        </button>
        <button onClick={handleNextJob} disabled={jobs.length <= 1}>
          Next Job
        </button>
      </div>
    </div>
  );
};

export default JobViewer;
