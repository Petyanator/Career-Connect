import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";
import NavBar from "./components/NavBar/NavBar";
import Landing from "./components/Landing/Landing";
import Team from "./components/Team/Team";
// import CreateProfilePage from "./components/Profile/CreateProfilePage";
// import CreateProfileView from "./components/Profile/CreateProfileView";
// import EmployerCreateProfile from "./components/Profile/EmployerCreateProfile";
// import EmployerProfileView from "./components/Profile/EmployerProfileView";
import Register from "./components/RegisterAndLogin/Register";
import Login from "./components/RegisterAndLogin/Login";
import UserToken from "./components/Token/UserToken";

// import SearchAndFilterSystem from "./components/SearchAndFilterSystem/SearchAndFilterSystem";
// import SearchAndFilterSystem from "./components/SearchForJobSeekers/SearchAndFilterSystem";
import JobPosting from "./components/JobPosting/JobPosting";
import JobViewer from "./components/JobViewer/JobViewer";
import JobSeekerNotification from "./components/JobSeekerNotification/JobSeekerNotification";
import JobSeekerDashboard from "./components/Dashboard/JobSeekerDashboard";
import EmployerDashboard from "./components/Dashboard/EmployerDashboard";
import Footer from "./components/Footer/Footer";
import UpdateJobSeekerProfile from "./components/UpdateAndDelete/UpdateJobSeekerProfile";
import DeleteJobSeekerProfile from "./components/UpdateAndDelete/DeleteJobSeekerProfile";
import DeleteEmployerProfile from "./components/UpdateAndDelete/DeleteEmployerProfile";
import UpdateEmployerProfile from "./components/UpdateAndDelete/UpdateEmployerProfile";
import SearchForEmployers from "./components/SearchForEmployers/SearchForEmployers";
import NotificationsComponent from "./components/NotificationsComponents/NotificationsComponents";

function App() {
  const [profileData, setProfileData] = useState(null);
  // const [employerProfileData, setEmployerProfileData] = useState(null);
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
          <Route path="/footer" element={<Footer />} />
          <Route path="/" element={<Landing />} />
          <Route path="/the-team" element={<Team />} />
          {/* <Route path="/searchbar" element={<SearchAndFilterSystem />} /> */}
          <Route path="/jobposting" element={<JobPosting />} />
          {/* <Route path="/jobviewer" element={<JobViewer />} /> */}
          <Route path="/jobviewer" element={<JobViewer />} />
          {/* <Route
            path="/profile"
            element={<CreateProfileView profileData={profileData} />}
          />

          <Route
            path="/create-profile"
            element={<CreateProfilePage setProfileData={setProfileData} />}
          /> */}

          {/* <Route
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
          /> */}
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
          <Route path="/register" element={<Register />} />
          <Route
            path="/jobseeker-notification"
            element={<JobSeekerNotification />}
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
          <Route
            path="/update-employer-profile"
            element={<UpdateEmployerProfile />}
          />
          <Route
            path="/delete-employer-profile"
            element={<DeleteEmployerProfile />}
          />
          <Route path="/find-jobseekers" element={<SearchForEmployers />} />
          <Route path="/notifications" element={<NotificationsComponent />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
