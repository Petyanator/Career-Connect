import React from 'react';
import JobPosting from "../JobPosting/JobPosting";
import JobViewer from "../JobViewer/JobViewer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faClipboard } from '@fortawesome/free-solid-svg-icons';
import './EmployerDashboard.css';

// Mock job listings data
const mockJobListings = [
  {
    id: 1,
    job_title: 'Frontend Developer',
    company: 'Tech Solutions',
    location: 'New York',
    salary_range: '$70K - $90K',
    required_skills: ['React', 'JavaScript', 'CSS'], // Changed to array
    description: 'Develop and maintain the frontend of web applications.',
    posted_time: '1 day ago',
    job_type: 'Full Time',
  },
  {
    id: 2,
    job_title: 'Backend Developer',
    company: 'Tech Solutions',
    location: 'San Francisco',
    salary_range: '$80K - $100K',
    required_skills: ['Node.js', 'Express', 'MongoDB'], // Changed to array
    description: 'Create server-side applications and RESTful APIs.',
    posted_time: '2 days ago',
    job_type: 'Full Time',
  }
];

function EmployerDashboard() {
  return (
    <>
      <div className="dashboard-container">
        <h1>Hello <span className="wiggle">Employer!</span> Manage your job listings</h1>
        <p>Manage your job postings and review candidates below.</p>

        <div className="icon-links">
          <a href="/profile" className="icon-link">
            <FontAwesomeIcon icon={faUser} size="2x" />
            <p>Profile</p>
          </a>

          <a href="/noticeboard" className="icon-link">
            <FontAwesomeIcon icon={faClipboard} size="2x" />
            <p>Noticeboard</p>
          </a>
        </div>
      </div>

      <div className="job-viewer-container">
        <h1>Manage your current job listings</h1>
        {/* Pass jobListings to JobViewer */}
        <JobViewer jobListings={mockJobListings} />
      </div>

      <div className="job-posting-container">
        <h1>Post a job from the dashboard</h1>
        <JobPosting />
      </div>
    </>
  );
}

export default EmployerDashboard;
