
import SearchAndFilterSystem from "./components/SearchBar/SearchBar.jsx"
import { useState } from 'react';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; // This has to be imported for FontAwesome Icons to work
import JobPosting from './components/JobPosting/JobPosting';
import JobViewer from './components/JobViewer/JobViewer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/shared/NavBar';
import Landing from './pages/Landing.jsx';
import AboutUs from './pages/AboutUs.jsx';
import SearchBar from './components/SearchBar';
import CreateProfilePage from './pages/CreateProfilePage';
import CreateProfileView from './pages/CreateProfileView'; // Import CreateProfileView


function App() {
  const [profileData, setProfileData] = useState(null);  // State to hold profile data

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>

          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Landing />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/searchbar" element={<SearchAndFilterSystem />}></Route>
          <Route path="/jobposting" element={<JobPosting />} />
          <Route path="/jobviewer" element={<JobViewer />} />
          <Route path="/create-profile" element={<CreateProfilePage setProfileData={setProfileData} />} />
          <Route path="/profile" element={<CreateProfileView profileData={profileData} />} />


        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
