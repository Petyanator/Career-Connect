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

    const fetchData = (jobTitle = "", salaryRange = "", location = "", requiredSkills = "") => {
        setLoading(true);
        const queryParams = new URLSearchParams({
            job_title: jobTitle,
            salary_range: salaryRange,
            location: location,
            required_skills: requiredSkills
        }).toString();

        fetch(`http://127.0.0.1:5000/api/filter?${queryParams}`)
            .then(response => {
                if (!response.ok) throw new Error("No results found");
                return response.json();
            })
            .then(json => {
                setResults(json);
                setLoading(false);
                setError(null);
                setCurrentIndex(0);  // Reset to the first result
            })
            .catch((error) => {
                setError(error.message);
                setResults([]);
                setLoading(false);
            });
    };

    const handleJobTitleChange = (value) => {
        setInput(value);
        fetchData(value, salaryRange, location, requiredSkills);
    };

    const handleFilterSubmit = (e) => {
        e.preventDefault();
        fetchData(input, salaryRange, location, requiredSkills);
    };

    // Check if a job is already in the localStorage array
    const isJobAlreadyStored = (job, storageKey) => {
        let storedJobs = JSON.parse(localStorage.getItem(storageKey)) || [];
        return storedJobs.some(storedJob => storedJob.id === job.id);
    };

    // Store accepted job in localStorage if not already stored
    const acceptJob = () => {
        if (results[currentIndex]) {
            let acceptedJobs = JSON.parse(localStorage.getItem('acceptedJobs')) || [];
            if (!isJobAlreadyStored(results[currentIndex], 'acceptedJobs')) {
                acceptedJobs.push(results[currentIndex]);  // Add the current job to accepted jobs
                localStorage.setItem('acceptedJobs', JSON.stringify(acceptedJobs));  // Store in localStorage
            
                removeFromRejectedJobs(results[currentIndex])
            
            }
        }
        moveToNextJob();  // Move to the next job
    };

    // Store rejected job in localStorage if not already stored
    const rejectJob = () => {
        if (results[currentIndex]) {
            let rejectedJobs = JSON.parse(localStorage.getItem('rejectedJobs')) || [];
            if (!isJobAlreadyStored(results[currentIndex], 'rejectedJobs')) {
                rejectedJobs.push(results[currentIndex]);  // Add the current job to rejected jobs
                localStorage.setItem('rejectedJobs', JSON.stringify(rejectedJobs));  // Store in localStorage

                // If the job is in acceptedJobs, remove it
                removeFromAcceptedJobs(results[currentIndex]);

            }
        }
        moveToNextJob();  // Move to the next job
    };

    // Remove a job from acceptedJobs
    const removeFromAcceptedJobs = (job) => {
        let acceptedJobs = JSON.parse(localStorage.getItem('acceptedJobs')) || [];
        const updatedAcceptedJobs = acceptedJobs.filter(storedJob => storedJob.id !== job.id);
        localStorage.setItem('acceptedJobs', JSON.stringify(updatedAcceptedJobs));
    };

    const removeFromRejectedJobs = (job) => {
        let rejectedJobs = JSON.parse(localStorage.getItem('rejectedJobs')) || [];
        const updatedRejectedJobs = rejectedJobs.filter(storedJob => storedJob.id !== job.id);
        localStorage.setItem('rejectedJobs', JSON.stringify(updatedRejectedJobs));
    };

    // Move to the next job card
    const moveToNextJob = () => {
        if (currentIndex < results.length - 1) {
            setCurrentIndex(currentIndex + 1);  // Move to the next result
        }
    };

    // Move to the previous job card
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
                        placeholder="Search for job types..."
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
                        <h3>{results[currentIndex].job_title}</h3>
                        <p><strong>Location:</strong> {results[currentIndex].location}</p>
                        <p><strong>Salary Range:</strong> {results[currentIndex].salary_range}</p>
                        <p><strong>Required Skills:</strong> {results[currentIndex].required_skills}</p>
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
