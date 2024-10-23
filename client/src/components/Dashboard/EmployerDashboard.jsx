// import "./Dashboard.css";
import { useState, useEffect } from "react";
import JobPosting from "../JobPosting/JobPosting";
import EmployerCreateProfile from "../Profile/EmployerCreateProfile";
import EmployerProfileView from "../Profile/EmployerProfileView";
import SearchForEmployers from "../SearchForEmployers/SearchForEmployers";
import DeleteEmployerProfile from "../UpdateAndDelete/DeleteEmployerProfile";
import UpdateEmployerProfile from "../UpdateAndDelete/UpdateEmployerProfile";
import './JobSeekerDashboard.scss'


function EmployerDashboard({ profileData, setProfileData }) {
  const [isLoading, setIsLoading] = useState(!profileData);

  const [fullName] = useState(localStorage.getItem("fullName") || "User");
  const [userType] = useState(localStorage.getItem("userType") || "job_seeker");
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!profileData && token) {
      const fetchUserData = async () => {
        setIsLoading(true); // Start loading
        try {
          const response = await fetch("http://localhost:5000/dashboard", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setProfileData(data.employer_profile || {}); // Set profile data or empty object
          } else {
            console.error("Failed to fetch user data");
          }
        } catch (error) {
          console.error("An error occurred:", error);
        } finally {
          setIsLoading(false); // Stop loading
        }
      };

      fetchUserData();
    }
  }, [profileData, token, setProfileData]); // Include setProfileData in dependencies

  const [activeTab, setActiveTab] = useState("profile");
  const renderContent = () => {
    switch (activeTab) {
      case "profile": {
        const hasProfileData =
          profileData && profileData.company_name && profileData.about_company;
        return !hasProfileData ? (
          <EmployerCreateProfile
            setProfileData={setProfileData}
          ></EmployerCreateProfile>
        ) : (
          <EmployerProfileView profileData={profileData}></EmployerProfileView>
        );
      }
      case "search":
        return (
          <div>
            <SearchForEmployers></SearchForEmployers>
          </div>
        );
      case "create job post":
        return (
          <div>
            {" "}
            Create a job post <JobPosting></JobPosting>
          </div>
        );
      case "security":
        return (
          <div>
            <DeleteEmployerProfile />
            <UpdateEmployerProfile />
          </div>
        );
      case "appearance":
        return <div>Appearance Settings Content</div>;
      case "help":
        return <div>Help Content</div>;
      default:
        return "profile";
    }
  };
  return (
    <div className="profile-settings-container">
      <aside className="sidebar">
        <ul className="sidebar-menu">
          <li
            onClick={() => setActiveTab("profile")}
            className={activeTab === "profile" ? "active" : ""}
          >
            Profile
          </li>
          <li
            onClick={() => setActiveTab("search")}
            className={activeTab === "search" ? "active" : ""}
          >
            Search
          </li>
          <li
            onClick={() => setActiveTab("create job post")}
            className={activeTab === "create job post" ? "active" : ""}
          >
            Create Job Post
          </li>
          <li
            onClick={() => setActiveTab("security")}
            className={activeTab === "security" ? "active" : ""}
          >
            Security
          </li>
          <li
            onClick={() => setActiveTab("appearance")}
            className={activeTab === "appearance" ? "active" : ""}
          >
            Appearance
          </li>
          <li
            onClick={() => setActiveTab("help")}
            className={activeTab === "help" ? "active" : ""}
          >
            Help
          </li>
        </ul>
      </aside>
      <main className="content-area">
        <div className="welcome-message">
          {isLoading ? (
            <p>Loading user data...</p> // Show a loading message while fetching data
          ) : (
            <>
              <h1>Welcome, {fullName ? fullName : "User"}!</h1>
              <p>
                You are logged in as{" "}
                {userType === "job_seeker" ? "a Job Seeker" : "an Employer"}.
              </p>
            </>
          )}
        </div>
        {renderContent()}
      </main>
    </div>
  );
}

export default EmployerDashboard;
