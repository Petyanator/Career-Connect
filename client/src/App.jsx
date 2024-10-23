import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import UserToken from "./components/Token/UserToken";

import NavBar from "./components/NavBar/NavBar";
import Landing from "./components/Landing/Landing";
import Team from "./components/Team/Team";

import Register from "./components/RegisterAndLogin/Register";
import Login from "./components/RegisterAndLogin/Login";
import JobSeekerDashboard from "./components/Dashboard/JobSeekerDashboard";
import EmployerDashboard from "./components/Dashboard/EmployerDashboard";

import JobViewer from "./components/JobViewer/JobViewer";
import JobSeekerNotification from "./components/JobSeekerNotification/JobSeekerNotification";
import UpdateJobSeekerProfile from "./components/UpdateAndDelete/UpdateJobSeekerProfile";
import DeleteJobSeekerProfile from "./components/UpdateAndDelete/DeleteJobSeekerProfile";

function App() {
  const [profileData, setProfileData] = useState(null);
  const { token, setToken } = UserToken(); // State for user token
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(
    localStorage.getItem("userType") || null
  );
  const [fullName, setFullName] = useState(
    localStorage.getItem("fullName") || null
  );

  useEffect(() => {
    setIsLoggedIn(!!token); // Update state based on whether a token exists
    const storedUserType = localStorage.getItem("userType");
    setUserType(storedUserType);
  }, [token]);

  const handleLogout = () => {
    setToken(null); // Clear the token
    setIsLoggedIn(false);
    setUserType(null);
    localStorage.removeItem("userType"); // Update the login state
    localStorage.removeItem("accessToken");
    localStorage.removeItem("fullName");
    localStorage.removeItem("access_token");
  };
  return (
    <>
      <BrowserRouter>
        <NavBar
          isLoggedIn={isLoggedIn}
          userType={userType}
          handleLogout={handleLogout}
        />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/the-team" element={<Team />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={
              <Login
                setIsLoggedIn={setIsLoggedIn}
                setUserType={setUserType}
                setFullName={setFullName}
                setProfileData={setProfileData}
              />
            }
          />
          <Route
            path="/job-seeker-dashboard"
            element={
              <JobSeekerDashboard
                userType={userType}
                fullName={fullName}
                profileData={profileData}
                setProfileData={setProfileData}
              />
            }
          />
          <Route
            path="/employer-dashboard"
            element={
              <EmployerDashboard
                profileData={profileData}
                setProfileData={setProfileData}
              />
            }
          />

          <Route
            path="/update-jobseeker-profile"
            element={<UpdateJobSeekerProfile />}
          />
          <Route
            path="/delete-jobseeker-profile"
            element={<DeleteJobSeekerProfile />}
          />
          <Route path="/jobviewer" element={<JobViewer />} />
          <Route
            path="/jobseeker-notification"
            element={<JobSeekerNotification />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
