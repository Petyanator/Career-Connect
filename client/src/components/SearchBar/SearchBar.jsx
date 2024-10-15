import { useState, useEffect } from 'react';
import './SearchBar.css';  // Import the CSS file

function SearchAndFilterSystem() {
    const [input, setInput] = useState("");
    const [salaryRange, setSalaryRange] = useState("");
    const [location, setLocation] = useState("");
    const [requiredSkills, setRequiredSkills] = useState("");
    const [results, setResults] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch job postings from the database
    const fetchJobPostings = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://127.0.0.1:5000/api/job_postings`); // Adjust endpoint as needed
            if (!response.ok) throw new Error("Failed to fetch job postings");
            const json = await response.json();
            setResults(json);  // Set the results from the database
            setCurrentIndex(0);  // Reset to the first result
        } catch (error) {
            setError(error.message);
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobPostings(); // Fetch job postings on component mount
    }, []);

    const handleFilterSubmit = (e) => {
        e.preventDefault();
        // You can implement filtering logic here if needed
    };

    return (
        <div className="search-container">
            <form className="filter-form" onSubmit={handleFilterSubmit}>
                <div className='form-group'>
                    <label htmlFor="jobTitle" className='form-label'>Job Title:</label>
                    <input
                        type="text"
                        id='jobTitle'
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Search for job titles..."
                        className="search-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="salaryRange" className="form-label">Salary:</label>
                    <input
                        type="text"
                        id="salaryRange"
                        value={salaryRange}
                        className="form-input"
                        onChange={(e) => setSalaryRange(e.target.value)}
                        placeholder="Enter salary range (e.g., 50K - 70K)"
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
                        placeholder="Enter location"
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
                        placeholder="Enter required skills"
                    />
                </div>
                <button type="submit" className="form-button">Search</button>
            </form>

            {loading && <p className="loading-message">Loading...</p>}
            {error && <p className="error-message">{error}</p>}

            {results.length > 0 && (
                <div className="result-cards-container">
                    {results.map((job, index) => (
                        <div className="result-card" key={job.job_posting_id}>
                            <h3>{job.title}</h3>
                            <p><strong>Location:</strong> {job.location}</p>
                            <p><strong>Salary:</strong> {job.salary}</p>
                            <p><strong>Required Skills:</strong> {job.skills}</p>
                            <p><strong>Description:</strong> {job.description}</p>
                            <p><strong>Posted On:</strong> {new Date(job.created_at).toLocaleDateString()}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SearchAndFilterSystem;
