import React from 'react';
import './CreateProfileView.css';

function CreateProfileView({ profileData }) {
    console.log(profileData);

    if (!profileData) {
        return <h2>No profile data available</h2>;
    }

    return (
        <div className="profile-view">
            <h1>{profileData.firstName} {profileData.lastName}'s Profile</h1>
            <div className="profile-details">
                <img src={profileData.profilePicture} alt="Profile" className="profile-picture" />
                <div className="profile-text">
                    <p><strong>Date of Birth:</strong> {profileData.dob}</p>
                    <p><strong>Gender:</strong> {profileData.gender}</p>
                    <p><strong>Nationality:</strong> {profileData.nationality}</p>
                    <p><strong>Education:</strong> {profileData.education}</p>
                    {profileData.degreeDetails && (
                        <>
                            <p><strong>Degree:</strong> {profileData.degreeDetails}</p>
                            <p><strong>Institution:</strong> {profileData.institution}</p>
                        </>
                    )}
                    <p><strong>Skills:</strong> {profileData.skills.join(', ')}</p>
                </div>
            </div>
        </div>
    );
}

export default CreateProfileView;
