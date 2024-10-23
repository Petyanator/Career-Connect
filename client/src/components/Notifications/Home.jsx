// src/components/Home/Home.jsx
import React from "react";
import "./Home.css"; // Importing CSS for styling

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Career Connect</h1>
      <p>
        Your platform for job applications, employer connections, and
        notifications!
      </p>

      <div className="buttons-container">
        <button
          className="btn-primary"
          onClick={() => (window.location.href = "/notifications")}>
          View Notifications
        </button>
        <button className="btn-secondary">Explore Jobs</button>
      </div>
    </div>
  );
};

export default Home;
