import { useState } from "react";
// import "./JobPosting.scss"; // Import your new SCSS file

const JobPosting = () => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    salaryRange: "",
    location: "",
    requiredSkills: "",
    description: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Retrieve JWT token from localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      alert('No token found. Please login.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/jobs", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),  // Send the form data as JSON
      });

      const data = await response.json();
      if (response.ok) {
        alert("Job posted successfully!");
        setFormData({
          jobTitle: "",
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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="job-posting-container">
      <form onSubmit={handleSubmit} className="formJobPosting">
        <div className="form-group">
          <label>Job Title:</label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            className="form-control" /* Use Bootstrap form-control class */
            required
          />
        </div>

        <div className="form-group">
          <label>Salary Range:</label>
          <input
            type="text"
            name="salaryRange"
            value={formData.salaryRange}
            onChange={handleChange}
            className="form-control" /* Use Bootstrap form-control class */
            required
          />
        </div>

        <div className="form-group">
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="form-control" /* Use Bootstrap form-control class */
            required
          />
        </div>

        <div className="form-group">
          <label>Required Skills:</label>
          <input
            type="text"
            name="requiredSkills"
            value={formData.requiredSkills}
            onChange={handleChange}
            className="form-control" /* Use Bootstrap form-control class */
            required
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-control" /* Use Bootstrap form-control class */
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? "Posting..." : "Post Job"}
        </button>
      </form>
    </div>
  );
};

export default JobPosting;
