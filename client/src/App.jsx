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
          <Route
            path="/create-profile"
            element={<CreateProfilePage />}
          />
          <Route
            path="/profile"
            element={<CreateProfileView />}
          />
          <Route
            path="/employer-create-profile"
            element={<EmployerCreateProfile />}
          />
          <Route
            path="/employer-profile"
            element={<EmployerProfileView />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/job-seeker-dashboard"
            element={<JobSeekerDashboard />}
          />
          <Route path="/employer-dashboard" element={<EmployerDashboard />} />

          {/* Protected Route Example */}
          <Route
            path="/protected"
            element={
              <PrivateRoute>
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;