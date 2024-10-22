import { useState, useEffect } from "react";
import "./SearchForEmployers.css"
function SearchForEmployers() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0); // Track current card

  // Retrieve token from local storage
  const getTokenFromLocalStorage = () => localStorage.getItem("token");

  // Fetch job seekers from API
  const fetchJobSeekers = async () => {
    setLoading(true);
    setError(null);

    const token = getTokenFromLocalStorage();
    if (!token) {
      setError("Authorization token is missing");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/api/job_seekers_search", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch job seekers");
      }

      const json = await response.json();
      setResults(json);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobSeekers();
  }, []);

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < results.length - 1) setCurrentIndex(currentIndex + 1);
  };

  return (
    <div className="search-container">
      <h1>Job Seekers</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && results.length === 0 && <p>No job seekers found.</p>}

      {results.length > 0 && (
        <div className="result-card">
          <img
            src={results[currentIndex].profile_pic || "/default-profile.png"}
            alt={`${results[currentIndex].first_name} ${results[currentIndex].last_name}`}
            className="profile-pic"
          />
          <h3>
            {results[currentIndex].first_name} {results[currentIndex].last_name}
          </h3>
          <p>
            <strong>Date of Birth:</strong> {new Date(results[currentIndex].dob).toLocaleDateString()}
          </p>
          <p>
            <strong>Gender:</strong> {results[currentIndex].gender}
          </p>
          <p>
            <strong>Nationality:</strong> {results[currentIndex].nationality}
          </p>
          <p>
            <strong>Skills:</strong> {results[currentIndex].skills.join(", ")}
          </p>
          <p>
            <strong>Education:</strong> {JSON.stringify(results[currentIndex].education)}
            </p>

          <div className="button-group">
            <button onClick={handlePrevious} className="previous-button">
              Previous
            </button>
            <button onClick={handleNext} className="next-button">
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchForEmployers;
