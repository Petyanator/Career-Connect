import { useState, useEffect } from "react";
import CreateProfilePage from "../Profile/CreateProfilePage";
import CreateProfileView from "../Profile/CreateProfileView";
import SearchAndFilterSystem from "../SearchForJobSeekers/SearchAndFilterSystem";
import SeekerActivity from "../SeekerActivity/SeekerActivity";
import UpdateJobSeekerProfile from "../UpdateAndDelete/UpdateJobSeekerProfile";
import DeleteJobSeekerProfile from "../UpdateAndDelete/DeleteJobSeekerProfile";
import "./JobSeekerDashboard.scss";

function JobSeekerDashboard({ profileData, setProfileData }) {
  const [isLoading, setIsLoading] = useState(true);
  const [fullName, setFullName] = useState(localStorage.getItem("fullName") || "User");
  const [userType] = useState(localStorage.getItem("userType") || "job_seeker");
  const token = localStorage.getItem("accessToken");
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    if (!profileData && token) {
      fetchUserData(); // Fetch user data initially
    } else {
      setIsLoading(false); // If profileData exists, stop loading
    }
  }, [profileData, token]);

  // Fetch user data from the server
  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/dashboard", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Job Seeker Data:", data); // Log the response
        setProfileData(data.job_seeker_profile || {});
      } else {
        console.error("Failed to fetch job seeker data. Status:", response.status);
      }
    } catch (error) {
      console.error("An error occurred while fetching job seeker data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle the profile update
  const handleProfileUpdate = async (updatedProfile) => {
    setProfileData(updatedProfile); // Update the profile data in state
    await fetchUserData(); // Fetch updated user data
  };

  const renderContent = () => {
    if (isLoading) {
      return <p>Loading user data...</p>;
    }

    // Check for profile data validity
    const hasProfileData = profileData && 
      profileData.first_name && 
      profileData.last_name && 
      profileData.skills && 
      profileData.skills.length > 0;

    switch (activeTab) {
      case "profile":
        return hasProfileData ? (
          <CreateProfileView profileData={profileData} />
        ) : (
          <CreateProfilePage 
            setProfileData={setProfileData} 
            onProfileUpdate={handleProfileUpdate} // Pass the handler to child
          />
        );
      case "search":
        return <SearchAndFilterSystem />;
      case "activity":
        return <SeekerActivity />;
      case "security":
        return (
          <div>
            Security Settings
            <DeleteJobSeekerProfile />
            <UpdateJobSeekerProfile />
          </div>
        );
      case "notifications":
        return <div>Notifications</div>;
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
          <li onClick={() => setActiveTab("profile")} className={activeTab === "profile" ? "active" : ""}>
            Profile
          </li>
          <li onClick={() => setActiveTab("search")} className={activeTab === "search" ? "active" : ""}>
            Search
          </li>
          <li onClick={() => setActiveTab("activity")} className={activeTab === "activity" ? "active" : ""}>
            Activity
          </li>
          <li onClick={() => setActiveTab("security")} className={activeTab === "security" ? "active" : ""}>
            Security
          </li>
          <li onClick={() => setActiveTab("notifications")} className={activeTab === "notifications" ? "active" : ""}>
            Notifications
          </li>
          <li onClick={() => setActiveTab("help")} className={activeTab === "help" ? "active" : ""}>
            Help
          </li>
        </ul>
      </aside>
      <main className="content-area">
        <div className="welcome-message">
          {isLoading ? (
            <p>Loading user data...</p>
          ) : (
            <>
              <h1>Welcome, {fullName}!</h1>
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
