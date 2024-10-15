import { useState, useEffect } from 'react';
import './SearchBar.css'; // Import your CSS for styling

function SearchAndFilterSystem() {
    const [input, setInput] = useState("");
    const [salaryRange, setSalaryRange] = useState("");
    const [location, setLocation] = useState("");
    const [requiredSkills, setRequiredSkills] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getTokenFromLocalStorage = () => {
        return localStorage.getItem('token'); // Replace 'token' with your key if different
    };

    const buildQueryParams = () => {
        const query = new URLSearchParams();
        if (input.trim()) query.append("job_title", input);
        if (salaryRange.trim()) query.append("salary_range", salaryRange);
        if (location.trim()) query.append("location", location);
        if (requiredSkills.trim()) query.append("required_skills", requiredSkills);
        console.log("Query Params:", query.toString()); // Debugging log
        return query.toString();
    };

    const fetchFilteredJobPostings = async () => {
        setLoading(true);
        setError(null);

        const token = getTokenFromLocalStorage();
        console.log("Authorization Token:", token); // Debugging log

        if (!token) {
            setError("Authorization token is missing");
            setLoading(false);
            return;
        }

        try {
            const queryString = buildQueryParams();
            const response = await fetch(`http://127.0.0.1:5000/api/filter?${queryString}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to fetch job postings");
            }

            const json = await response.json();
            setResults(json);
        } catch (error) {
            setError(error.message);
            setResults([]); // Clear results on error
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFilteredJobPostings(); // Fetch jobs on mount
    }, []);

    const handleFilterSubmit = (e) => {
        e.preventDefault();
        fetchFilteredJobPostings(); // Fetch results based on filter inputs
    };

    const handleClearFilters = () => {
        setInput("");
        setSalaryRange("");
        setLocation("");
        setRequiredSkills("");
        setResults([]); // Clear results when filters are reset
    };

    return (
        <div className="search-container">
            <form className="filter-form" onSubmit={handleFilterSubmit}>
                <div className="form-group">
                    <label htmlFor="jobTitle" className="form-label">Job Title:</label>
                    <input
                        type="text"
                        id="jobTitle"
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
                        onChange={(e) => setSalaryRange(e.target.value)}
                        placeholder="Enter salary range (e.g., 50K - 70K)"
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="location" className="form-label">Location:</label>
                    <input
                        type="text"
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Enter location"
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="requiredSkills" className="form-label">Required Skills:</label>
                    <input
                        type="text"
                        id="requiredSkills"
                        value={requiredSkills}
                        onChange={(e) => setRequiredSkills(e.target.value)}
                        placeholder="Enter required skills"
                        className="form-input"
                    />
                </div>
                <button type="submit" className="form-button">Search</button>
                <button type="button" className="form-button" onClick={handleClearFilters}>Clear</button>
            </form>

            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}
            {!loading && results.length === 0 && <p>No job postings found.</p>}

            {results.length > 0 && (
                <div className="result-cards-container">
                    {results.map((job) => (
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
