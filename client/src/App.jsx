import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/shared/NavBar";
import Landing from "./pages/Landing";
import AboutUs from "./pages/AboutUs";
import CreateProfilePage from "./pages/CreateProfilePage";
import CreateProfileView from "./pages/CreateProfileView";
import EmployerCreateProfile from "./pages/EmployerCreateProfile";
import EmployerProfileView from "./pages/EmployerProfileView";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import SearchAndFilterSystem from "./components/SearchBar/SearchBar";
import JobPosting from "./components/JobPosting/JobPosting";
import JobViewer from "./components/JobViewer/JobViewer";
import JobSeekerDashboard from "./components/Dashboard/JobSeekerDashboard";
import EmployerDashboard from "./components/Dashboard/EmployerDashboard";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/shared/PrivateRoute";

function App() {
  const [employerProfileData, setEmployerProfileData] = useState(null); // Define state here

  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Landing />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/searchbar" element={<SearchAndFilterSystem />} />
          <Route path="/jobposting" element={<JobPosting />} />
          <Route path="/jobviewer" element={<JobViewer />} />

          {/* Protect CreateProfilePage and CreateProfileView */}
          <Route
            path="/create-profile"
            element={
              <PrivateRoute allowedUserType="job_seeker">
                <CreateProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute allowedUserType="job_seeker">
                <CreateProfileView />
              </PrivateRoute>
            }
          />

          {/* Protect Employer Routes */}
          <Route
            path="/employer-create-profile"
            element={
              <PrivateRoute allowedUserType="employer">
                <EmployerCreateProfile setEmployerProfileData={setEmployerProfileData} />
              </PrivateRoute>
            }
          />
          <Route
            path="/employer-profile"
            element={
              <PrivateRoute allowedUserType="employer">
                <EmployerProfileView employerProfileData={employerProfileData} />
              </PrivateRoute>
            }
          />

          {/* Protect Job Seeker Routes */}
          <Route
            path="/job-seeker-dashboard"
            element={
              <PrivateRoute allowedUserType="job_seeker">
                <JobSeekerDashboard />
              </PrivateRoute>
            }
          />

          {/* Other Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/employer-dashboard"
            element={
              <PrivateRoute allowedUserType="employer">
                <EmployerDashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;