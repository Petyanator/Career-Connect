// /client/src/components/jobposting/JobPosting.jsx
import { useState } from "react";
import "./JobPosting.css";

const JobPosting = () => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    company: "",
    salaryRange: "",
    location: "",
    requiredSkills: "",
    description: "",
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
      const response = await fetch("http://localhost:5000/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Job posted successfully!");
        setFormData({
          jobTitle: "",
          company: "",
          salaryRange: "",
          location: "",
          requiredSkills: "",
          description: "",
        });
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to post job.");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="formJobPosting">
        <div>
          <label>Job Title:</label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Company:</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Salary Range:</label>
          <input
            type="text"
            name="salaryRange"
            value={formData.salaryRange}
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
          <label>Required Skills:</label>
          <input
            type="text"
            name="requiredSkills"
            value={formData.requiredSkills}
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
