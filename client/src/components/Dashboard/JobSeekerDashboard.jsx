import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faClipboard } from '@fortawesome/free-solid-svg-icons';
import SearchAndFilterSystem from '../SearchAndFilterSystem/SearchAndFilterSystem';
import { Link } from "react-router-dom";
import './JobSeekerDashboard.css';

function JobSeekerDashboard() {
  // Initialize the animation state
  const [isAnimating, setIsAnimating] = useState(true);

  // Function to reset animation on click
  const handleTypingClick = () => {
    setIsAnimating(false);
    setTimeout(() => setIsAnimating(true), 100); // Reset after 100ms
  };

  return (
    <>
      <div className="dashboard-container">
        <div
          className={`typing ${isAnimating ? 'animate' : ''}`}
          onClick={handleTypingClick}
        ></div>
        <p>Use the search below to find jobs that match your skills and preferences.</p>
        <div className="icon-links">
          {/* Profile Page Link */}
          <Link to="/job-seeker-home-profile" className="icon-link">
            <FontAwesomeIcon icon={faUser} size="2x" />
            <p>Profile</p>
          </Link>

          {/* Noticeboard Page Link */}
          <Link to="/noticeboard" className="icon-link">
            <FontAwesomeIcon icon={faClipboard} size="2x" />
            <p>Noticeboard</p>
          </Link>
        </div>
      </div>

      {/* Search container with SearchAndFilterSystem component */}
      <div className="search-container">
        <SearchAndFilterSystem />
      </div>
    </>
  );
}

export default JobSeekerDashboard;
