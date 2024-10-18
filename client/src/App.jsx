import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// import "@fortawesome/fontawesome-free/css/all.min.css";
import NavBar from "./components/shared/NavBar";
import Landing from "./pages/Landing";
import AboutUs from "./pages/AboutUs";
import JobSeekerProfileCreate from "./pages/JobSeekerProfileCreate";
import JobSeekerProfileView from "./pages/JobSeekerProfileView";
import EmployerCreateProfile from "./pages/EmployerCreateProfile";
import EmployerProfileView from "./pages/EmployerProfileView";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import UserToken from "./components/Token/UserToken";
import SearchAndFilterSystem from "./components/SearchBar/SearchBar";
import JobPosting from "./components/JobPosting/JobPosting";
import JobViewer from "./components/JobViewer/JobViewer";
import JobSeekerDashboard from "./components/Dashboard/JobSeekerDashboard";
import EmployerDashboard from "./components/Dashboard/EmployerDashboard";

function App() {
  const [profileData, setProfileData] = useState(null);
  const [employerProfileData, setEmployerProfileData] = useState(null);
  const { token, setToken } = UserToken(); // State for user token
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!token); // Update state based on whether a token exists
  }, [token]);

  const handleLogout = () => {
    setToken(null); // Clear the token
    setIsLoggedIn(false); // Update the login state
  };
  return (
    <>
      <BrowserRouter>
        <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />

        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/searchbar" element={<SearchAndFilterSystem />} />
          <Route path="/jobposting" element={<JobPosting />} />
          <Route path="/jobviewer" element={<JobViewer />} />
          <Route
            path="/jobseeker_create_profile"
            element={<JobSeekerProfileCreate setProfileData={setProfileData} />}
          />
          <Route
            path="/jobseeker_profile"
            element={<JobSeekerProfileView isEmployerView={false}/>}
          />

          <Route
            path="/jobseeker_profile/:id"
            element={<JobSeekerProfileView isEmployerView={true}/>}
          />

          <Route
            path="/jobseeker_profile"
            element={<JobSeekerProfileView profileData={profileData} />}
          />
          <Route
            path="/employer-create-profile"
            element={
              <EmployerCreateProfile
                setEmployerProfileData={setEmployerProfileData}
              />
            }
          />
          <Route
            path="/employer-profile"
            element={
              <EmployerProfileView employerProfileData={employerProfileData} />
            }
          />

          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/job-seeker-dashboard"
            element={<JobSeekerDashboard />}
          />
          <Route path="/employer-dashboard" element={<EmployerDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
