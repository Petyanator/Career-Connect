// import "./Dashboard.css";
import { useState, useEffect } from "react";
import JobPosting from "../JobPosting/JobPosting";
import EmployerCreateProfile from "../Profile/EmployerCreateProfile";
import EmployerProfileView from "../Profile/EmployerProfileView";
import EmployersSeekingForJobSeekers from "../EmployersSeekingForJobSeekers/EmployersSeekingForJobSeekers";
import DeleteEmployerProfile from "../UpdateAndDelete/DeleteEmployerProfile";
import UpdateEmployerProfile from "../UpdateAndDelete/UpdateEmployerProfile";
import NotificationsComponent from "../NotificationsComponents/NotificationsComponents";
import EmployerViewJobPost from "../JobViewer/EmployerViewJobPost";
import './EmployerDashboard.scss';

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
  }, [profileData, token, setProfileData]);

  const handleProfileUpdate = (updatedProfile) => {
    setProfileData(updatedProfile); // Update profile data in the dashboard
  };

  const [activeTab, setActiveTab] = useState("profile");
  const renderContent = () => {
    if (isLoading) {
      return <p>Loading user data...</p>; // Loading state
    }

    // Determine if the user has a complete profile
    const hasProfileData = profileData && profileData.company_name && profileData.about_company;

    switch (activeTab) {
      case "profile":
        return hasProfileData ? (
          <EmployerProfileView profileData={profileData} />
        ) : (
          <EmployerCreateProfile setProfileData={setProfileData} onProfileUpdate={handleProfileUpdate} />
        );
      case "search":
        return <EmployersSeekingForJobSeekers />;
      case "create job post":


        return (
          <div>
            <JobPosting></JobPosting>
          </div>
        );
      case "security":
        return (
          <div>
            <DeleteEmployerProfile />
            <UpdateEmployerProfile />
          </div>
        );
      case "notification":
        return (
          <div>
            notification <NotificationsComponent />
          </div>
        );
      case "my-job-posts":
        return (
          <div>
            My Job Posts
            <EmployerViewJobPost />
          </div>
        );
      default:
        return <EmployerProfileView profileData={profileData} />;
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
            Search Job Seekers
          </li>
          <li onClick={() => setActiveTab("create job post")} className={activeTab === "create job post" ? "active" : ""}>
            Create Job Post
          </li>
          <li onClick={() => setActiveTab("security")} className={activeTab === "security" ? "active" : ""}>
            Security
          </li>
          <li
            onClick={() => setActiveTab("notification")}
            className={activeTab === "notification" ? "active" : ""}
          >
            Notification
          </li>
          <li
            onClick={() => setActiveTab("my-job-posts")}
            className={activeTab === "my-job-posts" ? "active" : ""}
          >
            My Job Posts
          </li>
        </ul>
      </aside>
      <main className="content-area">
        <div className="welcome-message">
          <h1>Welcome, {fullName}!</h1>
          <p>
            You are logged in as {userType === "job_seeker" ? "a Job Seeker" : "an Employer"}.
          </p>
        </div>
        {renderContent()}
      </main>
    </div>
  );
}

export default EmployerDashboard;
