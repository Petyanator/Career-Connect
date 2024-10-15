import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// import "@fortawesome/fontawesome-free/css/all.min.css";
import NavBar from "./components/shared/NavBar";
import Landing from "./pages/Landing";
import AboutUs from "./pages/AboutUs";
import CreateProfilePage from "./pages/CreateProfilePage";
import CreateProfileView from "./pages/CreateProfileView";
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
  const { token, removeToken } = UserToken(); // State for user token
  const handleLogout = () => {
    removeToken(); // Clear the token on logout
  };
  return (
    <>
      <BrowserRouter>
        <NavBar token={token} onLogout={handleLogout} />
        {/* Pass token and logout handler to NavBar */}
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
          <Route path="/login" element={<Login />} />
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
