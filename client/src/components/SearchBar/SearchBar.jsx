import { useState } from 'react';
import './SearchBar.css';  // Import the CSS file

function SearchAndFilterSystem() {
    const [input, setInput] = useState("");           // State to store user input
    const [salaryRange, setSalaryRange] = useState("");  // State to store minimum salary range
    const [location, setLocation] = useState("");        // State to store location input
    const [requiredSkills, setRequiredSkills] = useState("");  // State to store required skills
    const [results, setResults] = useState([]);       // State to store search/filter results
    const [loading, setLoading] = useState(false);    // State to show loading status
    const [error, setError] = useState(null);         // State to store error messages

    // Function to fetch data from Flask backend based on job title and filter parameters
    const fetchData = (jobTitle = "", salaryRange = "", location = "", requiredSkills = "") => {
        setLoading(true);  // Start loading

        // Use URLSearchParams to dynamically build query string
        const queryParams = new URLSearchParams({
            job_title: jobTitle,
            salary_range: salaryRange,
            location: location,
            required_skills: requiredSkills
        }).toString();

        // Fetching data from Flask API with query parameters
        fetch(`http://127.0.0.1:5000/api/filter?${queryParams}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("No results found");
                }
                return response.json();
            })
            .then(json => {
                setResults(json);  // Set the results from the backend
                setLoading(false); // Stop loading
                setError(null);    // Reset error
            })
            .catch((error) => {
                setError(error.message);  // Set error message
                setResults([]);           // Clear results in case of error
                setLoading(false);        // Stop loading
            });
    };

    // Handle input change for job title search
    const handleJobTitleChange = (value) => {
        setInput(value);
        fetchData(value, salaryRange, location, requiredSkills);  // Fetch data on job title change
    };

    // Handle filter form submission
    const handleFilterSubmit = (e) => {
        e.preventDefault();
        fetchData(input, salaryRange, location, requiredSkills);  // Fetch data on filter submit
    };

    return (
        <div className="search-container">
            {/* Job Title Search */}
            <input
                type="text"
                value={input}
                onChange={(e) => handleJobTitleChange(e.target.value)}  // Trigger search on input change
                placeholder="Search for job types..."
                className="search-input"
            />

            {/* Filters */}
            <form className="filter-form" onSubmit={handleFilterSubmit}>
                <div className="form-group">
                    <label htmlFor="salaryRange" className="form-label">Minimum Salary:</label>
                    <input
                        type="text"
                        id="salaryRange"
                        value={salaryRange}
                        className="form-input"
                        onChange={(e) => setSalaryRange(e.target.value)}  // Update salary range state
                        placeholder="Enter minimum salary (e.g., 50K)"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="location" className="form-label">Location:</label>
                    <input
                        type="text"
                        id="location"
                        value={location}
                        className="form-input"
                        onChange={(e) => setLocation(e.target.value)}  // Update location state
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
                        onChange={(e) => setRequiredSkills(e.target.value)}  // Update required skills state
                        placeholder="Enter required skills"
                    />
                </div>

                <button type="submit" className="form-button">Search</button>
            </form>

            {/* Loading, Error, and Results */}
            {loading && <p className="loading-message">Loading...</p>}  {/* Show loading message while fetching */}

            {error && <p className="error-message">{error}</p>}  {/* Show error message if any */}

            {results.length > 0 && (  // Display results if available
                <ul className="search-results">
                    {results.map((result, index) => (
                        <li key={index} className="search-result-item">
                            <div className="result-card">
                                <h3>{result.job_title}</h3>
                                <p><strong>Location:</strong> {result.location}</p>
                                <p><strong>Salary Range:</strong> {result.salary_range}</p>
                                <p><strong>Required Skills:</strong> {result.required_skills}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default SearchAndFilterSystem;
