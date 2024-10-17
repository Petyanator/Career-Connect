import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import NavBar from "./components/shared/NavBar";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import CreateProfilePage from "./pages/CreateProfilePage";
import CreateProfileView from "./pages/CreateProfileView";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Logout from "./components/auth/Logout";
import UserToken from "./components/Token/UserToken";
import SearchAndFilterSystem from "./components/SearchBar/SearchBar";
import JobPosting from "./components/JobPosting/JobPosting";
import JobViewer from "./components/JobViewer/JobViewer";
import EmployerCreateProfile from "./pages/EmployerCreateProfile";
import EmployerProfileView from "./pages/EmployerProfileView";

function App() {
  const [profileData, setProfileData] = useState(null);
  const [employerProfileData, setEmployerProfileData] = useState(null);
  const { token, setToken, removeToken } = UserToken(); // State for user token
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
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
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/logout"
            element={<Logout removeToken={removeToken} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

// import React, { useEffect } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Notifications from "./components/Notifications/Notifications";

// function App() {
//   useEffect(() => {
//     // Simulating a login and storing a mock token
//     localStorage.setItem("token", "your_mock_token_here");
//   }, []);

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Notifications />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
