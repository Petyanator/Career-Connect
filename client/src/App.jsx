import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateProfilePage from './components/CreateProfilePage';
import CreateProfileView from './components/CreateProfileView';

function App() {
  const [profileData, setProfileData] = useState(null);
  console.log("App profileData:", profileData);  // Debugging

  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateProfilePage setProfileData={setProfileData} />} />
        <Route
          path="/profile"
          element={
            profileData ? (
              <CreateProfileView profileData={profileData} />
            ) : (
              <h2>No Profile Data Available</h2>
            )
          }
        />
      </Routes>
    </Router>
  );
}


export default App;
