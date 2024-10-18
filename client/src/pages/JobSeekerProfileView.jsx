import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  // To get the job seeker ID from the URL
import './JobSeekerProfileView.css';

function JobSeekerProfileView({ token }) {
  const { id } = useParams(); // Get job seeker ID from route params
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/jobseeker/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfileData(data);
        } else {
          setError('Failed to fetch profile');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('An error occurred while fetching the profile.');
      }
    };

    fetchProfile();
  }, [id, token]);

  if (error) {
    return <h2>{error}</h2>;
  }

  if (!profileData) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      {/* Particle effect container */}
      <div id="particles-js" style={{ position: 'absolute', width: '100%', height: '100%', zIndex: -1 }}></div>

      <div className="profile-view">
        <h1>{profileData.first_name} {profileData.last_name}'s Profile</h1>
        <div className="profile-details">
          <img src={profileData.profile_pic || '/default-pic.jpg'} alt="Profile" className="profile-picture" />
          <div className="profile-text">
            <p><strong>Date of Birth:</strong> {profileData.dob}</p>
            <p><strong>Gender:</strong> {profileData.gender}</p>
            <p><strong>Nationality:</strong> {profileData.nationality}</p>
            <p><strong>Education:</strong> {profileData.education.join(', ')}</p>
            <p><strong>Skills:</strong> {profileData.skills.join(', ')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobSeekerProfileView;
