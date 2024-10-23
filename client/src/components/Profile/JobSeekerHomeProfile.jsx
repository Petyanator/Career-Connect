import React, { useState } from 'react';
import './JobSeekerHomeProfile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

const JobSeekerHomeProfile = () => {
    // Mock profile data for now
    const initialProfile = {
        first_name: "John",
        last_name: "Doe",
        dob: "1990-01-01",
        gender: "Male",
        nationality: "American",
        skills: ["React", "Node.js", "JavaScript"],
        education: ["B.S. in Computer Science", "M.S. in Information Systems"],
        profile_pic: "http://lorempixel.com/150/150/people/"
    };

    const [profile, setProfile] = useState(initialProfile);
    const [isEditing, setIsEditing] = useState(false);
    const [editedProfile, setEditedProfile] = useState(initialProfile);
    const [newSkill, setNewSkill] = useState("");
    const [newEducation, setNewEducation] = useState("");

    const handleEditProfile = () => {
        setIsEditing(true);
    };

    const handleSaveChanges = () => {
        setProfile(editedProfile);
        setIsEditing(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedProfile({
            ...editedProfile,
            [name]: value,
        });
    };

    // Delete a specific skill entry
    const handleDeleteSkill = (index) => {
        const updatedSkills = editedProfile.skills.filter((_, i) => i !== index);
        setEditedProfile({ ...editedProfile, skills: updatedSkills });
    };

    // Add a new skill entry
    const handleAddSkill = () => {
        if (newSkill.trim()) {
            setEditedProfile({
                ...editedProfile,
                skills: [...editedProfile.skills, newSkill.trim()],
            });
            setNewSkill(""); // Clear input
        }
    };

    // Delete a specific education entry
    const handleDeleteEducation = (index) => {
        const updatedEducation = editedProfile.education.filter((_, i) => i !== index);
        setEditedProfile({ ...editedProfile, education: updatedEducation });
    };

    // Add a new education entry
    const handleAddEducation = () => {
        if (newEducation.trim()) {
            setEditedProfile({
                ...editedProfile,
                education: [...editedProfile.education, newEducation.trim()],
            });
            setNewEducation(""); // Clear input
        }
    };

    return (
        <div className="profile-home">
            <h1>{profile.first_name} {profile.last_name}'s Profile</h1>
            <div className="profile-details">
                <img src={profile.profile_pic} alt="Profile" className="profile-picture" />
                <div className="profile-info">
                    {isEditing ? (
                        <>
                            {/* First Name */}
                            <div className="profile-attribute">
                                <label>First Name</label>
                                <input
                                    type="text"
                                    name="first_name"
                                    value={editedProfile.first_name}
                                    onChange={handleChange}
                                    className="profile-input"
                                />
                            </div>

                            {/* Last Name */}
                            <div className="profile-attribute">
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    name="last_name"
                                    value={editedProfile.last_name}
                                    onChange={handleChange}
                                    className="profile-input"
                                />
                            </div>

                            {/* Date of Birth */}
                            <div className="profile-attribute">
                                <label>Date of Birth</label>
                                <input
                                    type="date"
                                    name="dob"
                                    value={editedProfile.dob}
                                    onChange={handleChange}
                                    className="profile-input"
                                />
                            </div>

                            {/* Gender */}
                            <div className="profile-attribute">
                                <label>Gender</label>
                                <input
                                    type="text"
                                    name="gender"
                                    value={editedProfile.gender}
                                    onChange={handleChange}
                                    className="profile-input"
                                />
                            </div>

                            {/* Nationality */}
                            <div className="profile-attribute">
                                <label>Nationality</label>
                                <input
                                    type="text"
                                    name="nationality"
                                    value={editedProfile.nationality}
                                    onChange={handleChange}
                                    className="profile-input"
                                />
                            </div>

                            {/* Skills */}
                            <div className="profile-attribute">
                                <label>Skills</label>
                                {editedProfile.skills.map((skill, index) => (
                                    <div key={index} className="skill-entry">
                                        <p>{skill}</p>
                                        <button
                                            onClick={() => handleDeleteSkill(index)}
                                            className="delete-icon"
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </div>
                                ))}
                                <div className="add-skill">
                                    <input
                                        type="text"
                                        value={newSkill}
                                        onChange={(e) => setNewSkill(e.target.value)}
                                        placeholder="Add new skill"
                                        className="profile-input"
                                    />
                                    <button onClick={handleAddSkill} className="add-icon">
                                        <FontAwesomeIcon icon={faPlus} />
                                    </button>
                                </div>
                            </div>

                            {/* Education */}
                            <div className="profile-attribute">
                                <label>Education</label>
                                {editedProfile.education.map((education, index) => (
                                    <div key={index} className="education-entry">
                                        <p>{education}</p>
                                        <button
                                            onClick={() => handleDeleteEducation(index)}
                                            className="delete-icon"
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </div>
                                ))}
                                <div className="add-education">
                                    <input
                                        type="text"
                                        value={newEducation}
                                        onChange={(e) => setNewEducation(e.target.value)}
                                        placeholder="Add new education"
                                        className="profile-input"
                                    />
                                    <button onClick={handleAddEducation} className="add-icon">
                                        <FontAwesomeIcon icon={faPlus} />
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="profile-attribute">
                                <label>First Name</label>
                                <p>{profile.first_name}</p>
                            </div>
                            <div className="profile-attribute">
                                <label>Last Name</label>
                                <p>{profile.last_name}</p>
                            </div>
                            <div className="profile-attribute">
                                <label>Date of Birth</label>
                                <p>{profile.dob}</p>
                            </div>
                            <div className="profile-attribute">
                                <label>Gender</label>
                                <p>{profile.gender}</p>
                            </div>
                            <div className="profile-attribute">
                                <label>Nationality</label>
                                <p>{profile.nationality}</p>
                            </div>
                            <div className="profile-attribute">
                                <label>Skills</label>
                                <p>{profile.skills.join(', ')}</p>
                            </div>
                            <div className="profile-attribute">
                                <label>Education</label>
                                {profile.education.map((education, index) => (
                                    <p key={index}>{education}</p>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div className="profile-actions">
                {isEditing ? (
                    <button onClick={handleSaveChanges} className="btn-edit-profile">Save Changes</button>
                ) : (
                    <button onClick={handleEditProfile} className="btn-edit-profile">Edit Profile</button>
                )}
            </div>
        </div>
    );
};

export default JobSeekerHomeProfile;
