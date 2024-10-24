import { useState, useEffect } from "react";
import CreateProfilePage from "../Profile/CreateProfilePage";
import CreateProfileView from "../Profile/CreateProfileView";
import SearchAndFilterSystem from "../SearchForJobSeekers/SearchAndFilterSystem";
import SeekerActivity from "../SeekerActivity/SeekerActivity";
import UpdateJobSeekerProfile from "../UpdateAndDelete/UpdateJobSeekerProfile";
import DeleteJobSeekerProfile from "../UpdateAndDelete/DeleteJobSeekerProfile";
import JobSeekerNotifications from "../JobSeekerNotification/JobSeekerNotification";
import './JobSeekerDashboard.scss'


function JobSeekerDashboard({ profileData, setProfileData }) {
  const [isLoading, setIsLoading] = useState(true); // Start with loading state

  const [fullName, setFullName] = useState(localStorage.getItem("fullName") || "User");
  const [userType] = useState(localStorage.getItem("userType") || "job_seeker");
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    // Fetch job seeker profile data immediately after login
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
          const profile = data.job_seeker_profile || null;

          if (profile) {
            setProfileData(profile); // Store profile data in state
            setFullName(`${profile.first_name} ${profile.last_name}`); // Set full name from profile
          }
        } else {
          console.error("Failed to fetch job seeker data.");
        }
      } catch (error) {
        console.error("An error occurred while fetching job seeker data:", error);
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    if (token) {
      fetchUserData(); // Fetch profile data if the user has a valid token
    } else {
      setIsLoading(false); // Stop loading if no token
    }
  }, [token, setProfileData]);

  const handleProfileUpdate = (updatedProfile) => {
    setProfileData(updatedProfile);
    setFullName(`${updatedProfile.first_name} ${updatedProfile.last_name}`);
  };

  const [activeTab, setActiveTab] = useState("profile");

  const renderContent = () => {
    if (isLoading) {
      return <p>Loading user data...</p>; // Loading message while fetching data
    }

    const hasProfileData =
      profileData &&
      Object.keys(profileData).length > 0 &&
      profileData.skills &&
      profileData.skills.length > 0;

    switch (activeTab) {
      case "profile":

        return hasProfileData ? (
          <CreateProfileView profileData={profileData} />
        ) : (
          <CreateProfilePage
            setProfileData={setProfileData}
            onProfileUpdate={handleProfileUpdate}
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
        return <div>Notifications
              <JobSeekerNotifications/>
              </div>;
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
            onClick={() => setActiveTab("notifications")}
            className={activeTab === "notifications" ? "active" : ""}
          >
            Notifications
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
