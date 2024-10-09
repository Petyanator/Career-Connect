import { useState } from 'react';
import './FilterSystem.css'; // Import your CSS file

function FilterSystem() {
    const [salaryRange, setSalaryRange] = useState("");
    const [location, setLocation] = useState("");
    const [requiredSkills, setRequiredSkills] = useState("");
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);

    // Function to fetch data from the Flask backend
    const fetchData = () => {
        const queryParams = new URLSearchParams({
            salary_range: salaryRange,  // 'salaryRange' is a state variable holding the input
            location: location,
            required_skills: requiredSkills,
        }).toString();
    
        fetch(`http://127.0.0.1:5000/api/filter?${queryParams}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("No results found");
                }
                return response.json();
            })
            .then((json) => {
                setResults(json);
                setError(null);
            })
            .catch((error) => {
                setError(error.message);
                setResults([]);
            });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData();
    };

    return (
        <div className="filter-system">
            <form className="filter-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="salaryRange" className="form-label">Minimum Salary Range:</label>
                    <input
                        type="text"
                        id="salaryRange"
                        value={salaryRange}
                        className="form-input"
                        placeholder="e.g., 60K or 30000"
                        onChange={(e) => setSalaryRange(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="location" className="form-label">Location:</label>
                    <input
                        type="text"
                        id="location"
                        value={location}
                        className="form-input"
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="requiredSkills" className="form-label">Required Skills:</label>
                    <input
                        type="text"
                        id="requiredSkills"
                        value={requiredSkills}
                        className="form-input"
                        onChange={(e) => setRequiredSkills(e.target.value)}
                    />
                </div>

                <button type="submit" className="form-button">Search</button>
            </form>

            {error && <p className="error-message">{error}</p>}

            <div className="results-container">
                {results.length > 0 ? (
                    results.map((job, index) => (
                        <div key={index} className="result-card">
                            <h3 className="job-title">{job.job_title}</h3>
                            <p className="job-location">Location: {job.location}</p>
                            <p className="job-salary">Salary Range: {job.salary_range}</p>
                            <p className="job-skills">Required Skills: {job.required_skills}</p>
                        </div>
                    ))
                ) : (
                    <p className="no-results">No results found. Please adjust your filters.</p>
                )}
            </div>
        </div>
    );
}

export default FilterSystem;
