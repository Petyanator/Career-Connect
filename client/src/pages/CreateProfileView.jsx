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

                    {/* Loop through the education fields if available */}
                    {profileData.educationFields && profileData.educationFields.length > 0 && (
                        <>
                            {profileData.educationFields.map((education, index) => (
                                <div key={index} className="education-entry">
                                    <p><strong>Education Level:</strong> {education.education}</p>
                                    {education.degreeDetails && (
                                        <>
                                            <p><strong>Degree:</strong> {education.degreeDetails}</p>
                                            <p><strong>Institution:</strong> {education.institution}</p>
                                        </>
                                    )}
                                </div>
                            ))}
                        </>
                    )}

                    <p><strong>Skills:</strong> {profileData.skills.join(', ')}</p>
                </div>
            </div>
        </div>
    );
}

export default CreateProfileView;
