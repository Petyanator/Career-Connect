import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./JobSeekerProfileView.css";

function JobSeekerProfileView({ profileData, isEmployerView }) {
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    alert('No token found');
                    navigate('/login');
                    return;
                }

                // Fetch profile based on whether the user is a job seeker or employer
                let response;
                if (isEmployerView) {
                    // Employer viewing a job seeker profile via application (pass job_seeker_id somehow)
                    const jobSeekerId = profileData?.job_seeker_id;  // Replace with actual data
                    response = await fetch(`http://localhost:5000/api/job_seekers/${jobSeekerId}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });
                } else {
                    // Job seeker viewing their own profile
                    response = await fetch('http://localhost:5000/api/job_seekers/me', {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });
                }

                const data = await response.json();
                if (response.ok) {
                    setProfile(data);
                } else {
                    alert(`Error: ${data.message}`);
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, [isEmployerView, profileData, navigate]);

    if (!profile) {
        return <h2>Loading profile...</h2>;
    }

    return (
        <div>
            {/* Particle effect */}
            <div id="particles-js" style={{ position: 'absolute', width: '100%', height: '100%', zIndex: -1 }}></div>

            <div className="profile-view">
                <h1>{profile.first_name} {profile.last_name}'s Profile</h1>
                <div className="profile-details">
                    <img src={profile.profile_pic} alt="Profile" className="profile-picture" />
                    <div className="profile-text">
                        <p><strong>Date of Birth:</strong> {profile.dob}</p>
                        <p><strong>Gender:</strong> {profile.gender}</p>
                        <p><strong>Nationality:</strong> {profile.nationality}</p>
                        <p><strong>Skills:</strong> {profile.skills.join(', ')}</p>
                        <div>
                            <strong>Education:</strong>
                            {profile.education.map((education, index) => (
                                <p key={index}>{education}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default JobSeekerProfileView;
