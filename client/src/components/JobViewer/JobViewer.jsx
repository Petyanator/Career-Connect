import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './JobViewer.css';

const JobViewer = ({ jobListings }) => {
  const [filterTags, setFilterTags] = useState([]);

  const handleTagClick = (tag) => {
    if (!filterTags.includes(tag)) {
      setFilterTags([...filterTags, tag]);
    }
  };

  const matchesFilters = (job) => {
    if (filterTags.length === 0) return true;
    return filterTags.every((tag) => job.required_skills.includes(tag));
  };

  return (
    <div className="job-viewer">
      <ul id="job-list">
        {jobListings.filter(matchesFilters).map((job) => (
          <li className="job-card" key={job.id}>
            <div className="job-card-info">
              <p>{job.company}</p>
              <h3>{job.job_title}</h3>
              <ul>
                <li>{job.posted_time}</li>
                <li>{job.job_type}</li>
                <li>{job.location}</li>
              </ul>
            </div>

            <ul className="job-card-tags">
              {Array.isArray(job.required_skills) ? (
                job.required_skills.map((skill, index) => (
                  <li key={index} onClick={() => handleTagClick(skill)}>{skill}</li>
                ))
              ) : (
                <li>No skills listed</li>
              )}
            </ul>

            <div className="icon-group">
              <FontAwesomeIcon icon={faPencilAlt} size="lg" className="edit-icon" />
              <FontAwesomeIcon icon={faTrashAlt} size="lg" className="delete-icon" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobViewer;
