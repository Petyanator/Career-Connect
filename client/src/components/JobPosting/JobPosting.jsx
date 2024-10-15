import React, { useState } from 'react';
import './JobPosting.css';

const JobPosting = () => {
  const [formData, setFormData] = useState({
    job_posting_id: null,
    employer_id: null,  // Add job_posting_id as null
    title: '',              // Updated to match the model's title
    salary: '',             // Updated to match the model's salary
    location: '',           // Matches the model's location
    skills: '',             // Updated to match the model's skills
    description: '',        // Matches the model's description
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),  // Send the form data as JSON
      });

      const data = await response.json();
      if (response.ok) {
        alert('Job posted successfully!');
        setFormData({
          job_posting_id: null,
          employer_id: null,  // Reset job_posting_id
          title: '',              // Reset to initial state
          salary: '',
          location: '',
          skills: '',
          description: '',
        });
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to post job.');
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="formJobPosting">
        <div>
          <label>Job Title:</label>
          <input
            type="text"
            name="title"  // Match model's title
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Salary:</label>
          <input
            type="text"
            name="salary"  // Match model's salary
            value={formData.salary}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Skills:</label>
          <input
            type="text"
            name="skills"  // Match model's skills
            value={formData.skills}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Post Job</button>
      </form>
    </div>
  );
};

export default JobPosting;
