// /src/components/JobPostingForm.jsx
import React, { useState } from 'react';

const JobPostingForm = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    jobTitle: '',
    company: '',
    salaryRange: '',
    location: '',
    requiredSkills: '',
    description: ''
  });

  // Handle form field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send POST request to the Flask backend
    try {
      const response = await fetch('http://localhost:5000/api/job-postings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Job posted successfully!');
        setFormData({
          jobTitle: '',
          company: '',
          salaryRange: '',
          location: '',
          requiredSkills: '',
          description: ''
        });
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Job Title:
        <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} required />
      </label>

      <label>
        Company:
        <input type="text" name="company" value={formData.company} onChange={handleChange} required />
      </label>

      <label>
        Salary Range:
        <input type="text" name="salaryRange" value={formData.salaryRange} onChange={handleChange} required />
      </label>

      <label>
        Location (City):
        <input type="text" name="location" value={formData.location} onChange={handleChange} required />
      </label>

      <label>
        Required Skills:
        <input type="text" name="requiredSkills" value={formData.requiredSkills} onChange={handleChange} required />
      </label>

      <label>
        Description:
        <textarea name="description" value={formData.description} onChange={handleChange} required></textarea>
      </label>

      <button type="submit">Post Job</button>
    </form>
  );
};

export default JobPostingForm;
