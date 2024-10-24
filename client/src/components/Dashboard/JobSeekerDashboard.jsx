
import { useState, useEffect } from "react";
import CreateProfilePage from "../Profile/CreateProfilePage";
import CreateProfileView from "../Profile/CreateProfileView";
import SearchAndFilterSystem from "../SearchForJobSeekers/SearchAndFilterSystem";
import SeekerActivity from "../SeekerActivity/SeekerActivity";
// import "./Dashboard.css";
import './JobSeekerDashboard.scss'

function JobSeekerDashboard({ profileData, setProfileData }) {
  const [isLoading, setIsLoading] = useState(!profileData); // Set loading state based on profileData

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
            setProfileData(data.job_seeker_profile || {}); // Set profile data or empty object
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
  
  const handleProfileUpdate = (updatedProfile) => {
    setProfileData(updatedProfile)
  }
  

  const [activeTab, setActiveTab] = useState("profile");
  const renderContent = () => {
    switch (activeTab) {
      case "profile": {
        const hasProfileData =
          profileData &&
          Object.keys(profileData).length > 0 &&
          profileData.skills &&
          profileData.skills.length > 0;
        return hasProfileData ? (
          <CreateProfileView profileData={profileData}></CreateProfileView>
        ) : (
          <CreateProfilePage
            setProfileData={setProfileData}
            onProfileUpdate={handleProfileUpdate}
          ></CreateProfilePage>
        );
      }
      case "search":
        return (
          <div>
            <SearchAndFilterSystem />
          </div>
        );
      case "activity":
        return (
          <div>
            <SeekerActivity></SeekerActivity>
          </div>
        );
      case "security":
        return <div>Security Settings Content</div>;
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
            onClick={() => setActiveTab("activity")}
            className={activeTab === "activity" ? "active" : ""}
          >
            Activity
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

export default JobSeekerDashboard;
