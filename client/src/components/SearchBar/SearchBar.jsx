import { useState } from 'react';
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

    const fetchData = async (jobTitle = "", salaryRange = "", location = "", requiredSkills = "") => {
        setLoading(true);
        const queryParams = new URLSearchParams({
            job_title: jobTitle,
            salary_range: salaryRange,
            location: location,
            required_skills: requiredSkills
        }).toString();

        try {
            const response = await fetch(`http://127.0.0.1:5000/api/filter?${queryParams}`);
            if (!response.ok) throw new Error("No results found");
            const json = await response.json();
            setResults(json);
            setCurrentIndex(0);  // Reset to the first result
        } catch (error) {
            setError(error.message);
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    const handleJobTitleChange = (value) => {
        setInput(value);
        fetchData(value, salaryRange, location, requiredSkills);
    };

    const handleFilterSubmit = (e) => {
        e.preventDefault();
        fetchData(input, salaryRange, location, requiredSkills);
    };

    // Check if a job is already in localStorage array
    const isJobAlreadyStored = (job, storageKey) => {
        const storedJobs = JSON.parse(localStorage.getItem(storageKey)) || [];
        return storedJobs.some(storedJob => storedJob.job_posting_id === job.job_posting_id);
    };

    const acceptJob = () => {
        if (results[currentIndex]) {
            const acceptedJobs = JSON.parse(localStorage.getItem('acceptedJobs')) || [];
            if (!isJobAlreadyStored(results[currentIndex], 'acceptedJobs')) {
                acceptedJobs.push(results[currentIndex]);  // Add the current job to accepted jobs
                localStorage.setItem('acceptedJobs', JSON.stringify(acceptedJobs));  // Store in localStorage
                removeFromRejectedJobs(results[currentIndex]);
            }
        }
        moveToNextJob();
    };

    const rejectJob = () => {
        if (results[currentIndex]) {
            const rejectedJobs = JSON.parse(localStorage.getItem('rejectedJobs')) || [];
            if (!isJobAlreadyStored(results[currentIndex], 'rejectedJobs')) {
                rejectedJobs.push(results[currentIndex]);  // Add the current job to rejected jobs
                localStorage.setItem('rejectedJobs', JSON.stringify(rejectedJobs));  // Store in localStorage
                removeFromAcceptedJobs(results[currentIndex]);
            }
        }
        moveToNextJob();
    };

    const removeFromAcceptedJobs = (job) => {
        let acceptedJobs = JSON.parse(localStorage.getItem('acceptedJobs')) || [];
        const updatedAcceptedJobs = acceptedJobs.filter(storedJob => storedJob.job_posting_id !== job.job_posting_id);
        localStorage.setItem('acceptedJobs', JSON.stringify(updatedAcceptedJobs));
    };

    const removeFromRejectedJobs = (job) => {
        let rejectedJobs = JSON.parse(localStorage.getItem('rejectedJobs')) || [];
        const updatedRejectedJobs = rejectedJobs.filter(storedJob => storedJob.job_posting_id !== job.job_posting_id);
        localStorage.setItem('rejectedJobs', JSON.stringify(updatedRejectedJobs));
    };

    const moveToNextJob = () => {
        if (currentIndex < results.length - 1) {
            setCurrentIndex(currentIndex + 1);  // Move to the next result
        }
    };

    const moveToPreviousJob = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);  // Move to the previous result
        }
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
                        onChange={(e) => handleJobTitleChange(e.target.value)}
                        placeholder="Search for job titles..."
                        className="search-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="salaryRange" className="form-label">Minimum Salary:</label>
                    <input
                        type="text"
                        id="salaryRange"
                        value={salaryRange}
                        className="form-input"
                        onChange={(e) => setSalaryRange(e.target.value)}
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
                <div className="swipe-container">
                    <div className="result-card">
                        <h3>{results[currentIndex].title}</h3>
                        <p><strong>Location:</strong> {results[currentIndex].location}</p>
                        <p><strong>Salary:</strong> {results[currentIndex].salary}</p>
                        <p><strong>Required Skills:</strong> {results[currentIndex].skills}</p>
                        <p><strong>Description:</strong> {results[currentIndex].describtion}</p>
                    </div>

                    <div className="button-group">
                        <button onClick={moveToPreviousJob} className="previous-button">Previous</button>
                        <button onClick={rejectJob} className="reject-button">Reject</button>
                        <button onClick={acceptJob} className="accept-button">Accept</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SearchAndFilterSystem;
