import { useState } from 'react';
import './SearchBar.css';  // Import the CSS file

function SearchBar() {
    const [input, setInput] = useState("");           // State to store user input
    const [results, setResults] = useState([]);       // State to store search results
    const [loading, setLoading] = useState(false);    // State to show loading status
    const [error, setError] = useState(null);         // State to store error messages

    // Function to fetch data from Flask backend
    const fetchData = (value) => {
        setLoading(true);  // Start loading
        fetch(`http://127.0.0.1:5000/api/search?job_title=${value}`)  // Send the input as a query parameter
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

    // Handle input change
    const handleChange = (value) => {
        setInput(value);
        if (value.length > 0) {
            fetchData(value);  // Fetch data as the user types
        } else {
            setResults([]);  // Clear results if input is empty
        }
    };

    // Function to handle clicking on a job title
    const handleSelect = (jobTitle) => {
        setInput(jobTitle);  // Set input to the selected job title
        setResults([]);       // Clear the results after selection
    };

    return (
        <div className="search-container">
            <input
                type="text"
                value={input}
                onChange={(e) => handleChange(e.target.value)}  // Trigger search on input change
                placeholder="Search for job types..."
                className="search-input"
            />

            {loading && <p className="loading-message">Loading...</p>}  {/* Show loading message while fetching */}

            {error && <p className="error-message">{error}</p>}  {/* Show error message if any */}

            {results.length > 0 && (  // Display results if available
                <ul className="search-results">
                    {results.map((result, index) => (
                        <li 
                            key={index} 
                            className="search-result-item" 
                            onClick={() => handleSelect(result)}  // Handle click event
                        >
                            {result}  {/* Render each result */}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default SearchBar;
