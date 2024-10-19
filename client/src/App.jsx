import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
// import "@fortawesome/fontawesome-free/css/all.min.css";
import NavBar from "./components/NavBar/NavBar";
import Landing from "./components/Landing/Landing";
import AboutUs from "./components/AboutUs/AboutUs";
import CreateProfilePage from "./components/Profile/CreateProfilePage";
import CreateProfileView from "./components/Profile/CreateProfileView";
import EmployerCreateProfile from "./components/Profile/EmployerCreateProfile";
import EmployerProfileView from "./components/Profile/EmployerProfileView";
import Register from "./components/RegisterAndLogin/Register";
import Login from "./components/RegisterAndLogin/Login";
import UserToken from "./components/Token/UserToken";
import SearchAndFilterSystem from "./components/SearchAndFilterSystem/SearchAndFilterSystem";
import JobPosting from "./components/JobPosting/JobPosting";
import JobViewer from "./components/JobViewer/JobViewer";
import JobSeekerDashboard from "./components/Dashboard/JobSeekerDashboard"
import EmployerDashboard from "./components/Dashboard/EmployerDashboard";

function App() {
  const [profileData, setProfileData] = useState(null);
  const [employerProfileData, setEmployerProfileData] = useState(null);
  const { token, setToken } = UserToken(); // State for user token
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(
    localStorage.getItem("userType") || null
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
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/searchbar" element={<SearchAndFilterSystem />} />
          <Route path="/jobposting" element={<JobPosting />} />
          <Route path="/jobviewer" element={<JobViewer />} />
          <Route
            path="/create-profile"
            element={<CreateProfilePage setProfileData={setProfileData} />}
          />
          <Route
            path="/profile"
            element={<CreateProfileView profileData={profileData} />}
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
            element={
              <Login setIsLoggedIn={setIsLoggedIn} setUserType={setUserType} />
            }
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
