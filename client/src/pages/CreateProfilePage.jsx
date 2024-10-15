import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CreateProfilePage.css';
import { FaPlus } from 'react-icons/fa';
import UserToken from '../components/Token/UserToken';  // Import the UserToken hook

function CreateProfilePage({ setProfileData }) {
    const [skills, setSkills] = useState([]);
    const [inputSkill, setInputSkill] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [educationFields, setEducationFields] = useState([
        { education: '', degreeDetails: '', institution: '' }
    ]);
    const [gender, setGender] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState('');
    const [nationality, setNationality] = useState('');

    // Validation states
    const [firstNameValid, setFirstNameValid] = useState(true);
    const [lastNameValid, setLastNameValid] = useState(true);
    const [dobValid, setDobValid] = useState(true);
    const [genderValid, setGenderValid] = useState(true);
    const [nationalityValid, setNationalityValid] = useState(true);
    const [skillsValid, setSkillsValid] = useState(true);

    const [showOverlay, setShowOverlay] = useState(false);
    const [showForm, setShowForm] = useState(true);
    const [isButtonShrinking, setIsButtonShrinking] = useState(false);

    const navigate = useNavigate();

    // Handle skill input
    const handleSkillChange = (e) => {
        setInputSkill(e.target.value);
    };

    const handleAddSkill = (e) => {
        e.preventDefault();
        if (inputSkill && !skills.includes(inputSkill)) {
            setSkills([...skills, inputSkill]);
            setInputSkill('');
        }
    };

    const handleDeleteSkill = (skillToDelete) => {
        const updatedSkills = skills.filter(skill => skill !== skillToDelete);
        setSkills(updatedSkills);
    };

    // Handle profile picture change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file); // Store the File object
        }
    };

    // Handle education input changes for dynamic fields
    const handleEducationChange = (index, e) => {
        const updatedFields = [...educationFields];
        updatedFields[index][e.target.name] = e.target.value;
        setEducationFields(updatedFields);
    };

    // Function to add another education field
    const handleAddEducationField = () => {
        setEducationFields([...educationFields, { education: '', degreeDetails: '', institution: '' }]);
    };

    // Utility function to convert image file to base64
    const convertImageToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        const isFirstNameValid = !!firstName;
        const isLastNameValid = !!lastName;
        const isDobValid = !!dob;
        const isGenderValid = !!gender;
        const isNationalityValid = !!nationality;
        const isSkillsValid = skills.length >= 3;

        setFirstNameValid(isFirstNameValid);
        setLastNameValid(isLastNameValid);
        setDobValid(isDobValid);
        setGenderValid(isGenderValid);
        setNationalityValid(isNationalityValid);
        setSkillsValid(isSkillsValid);

        if (!isFirstNameValid || !isLastNameValid || !isDobValid || !isGenderValid || !isNationalityValid || !isSkillsValid) {
            alert("Please fill out all the required fields.");
            return;
        }

        // Convert selectedImage to base64 if necessary
        let profile_pic = null;
        if (selectedImage) {
            profile_pic = await convertImageToBase64(selectedImage);
        }

        // Prepare education data
        const education = educationFields.map(field => {
            const { education, degreeDetails, institution } = field;
            return `${education} in ${degreeDetails} at ${institution}`;
        });

        const profileData = {
            profile_pic,
            first_name: firstName,
            last_name: lastName,
            dob,
            gender,
            nationality,
            education,  // Properly formatted for backend as a list of strings
            skills,  // Already a list of strings
        };

        setProfileData(profileData);
        setIsButtonShrinking(true);

        console.log("Submitting profile data:", profileData);  // Debug log

        try {
            // Retrieve JWT token from storage (adjust as needed)
            const token = localStorage.getItem('jwtToken'); // Ensure the token is correctly stored
            console.log("JWT Token:", token);  // Debug log

            // Send data to the backend
            const response = await axios.post('http://localhost:5000/api/job_seeker/create_profile', profileData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            console.log("Server response:", response.data);  // Debug log

            if (response.status === 201) {
                // Success
                setTimeout(() => {
                    setShowForm(false);
                    setShowOverlay(true);
                }, 800);

                setTimeout(() => {
                    navigate('/profile');
                }, 4000);
            } else {
                // Handle unexpected response
                alert('An error occurred while creating your profile.');
                setIsButtonShrinking(false);
            }
        } catch (error) {
            console.error('Error creating profile:', error);
            alert('An error occurred while creating your profile.');
            setIsButtonShrinking(false);
        }
    };

    return (
        <div>
            {/* Particle effect container */}
            <div id="particles-js" style={{ position: 'absolute', width: '100%', height: '100%', zIndex: -1 }}></div>

            {/* Form section */}
            <div className={`create-profile-page ${showForm ? '' : 'hidden-form'}`}>
                {showForm && (
                    <form onSubmit={handleSubmit}>
                        <h1>Create Your Profile</h1>
                        {/* Profile Picture */}
                        <label htmlFor="profile-picture">Profile Picture:</label>
                        <input type="file" accept="image/jpeg, image/png" id="profile-picture" onChange={handleImageChange} />
                        {selectedImage && (
                            <div className="image-preview">
                                <img src={URL.createObjectURL(selectedImage)} alt="Profile Preview" style={{ width: '100px', height: '80px' }} />
                            </div>
                        )}

                        {/* Other form fields for first name, last name, dob, etc. */}
                        <label htmlFor="first-name">First Name:</label>
                        <input
                            type="text"
                            id="first-name"
                            placeholder="First name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className={!firstNameValid ? 'invalid-input' : ''}
                        />

                        <label htmlFor="last-name">Last Name:</label>
                        <input
                            type="text"
                            id="last-name"
                            placeholder="Last name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className={!lastNameValid ? 'invalid-input' : ''}
                        />

                        <label htmlFor="dob">Date of Birth:</label>
                        <input
                            type="date"
                            id="dob"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            className={!dobValid ? 'invalid-input' : ''}
                        />

                        <label>Gender:</label>
                        <div className={`gender-input ${!genderValid ? 'invalid-input' : ''}`}>
                            <label>
                                <input type="radio" name="gender" value="Male" onChange={(e) => setGender(e.target.value)} /> Male
                            </label>
                            <label>
                                <input type="radio" name="gender" value="Female" onChange={(e) => setGender(e.target.value)} /> Female
                            </label>
                        </div>

                        <label htmlFor="nationality">Nationality:</label>
                        <input
                            type="text"
                            id="nationality"
                            placeholder="Nationality"
                            value={nationality}
                            onChange={(e) => setNationality(e.target.value)}
                            className={!nationalityValid ? 'invalid-input' : ''}
                        />

                        {/* Education Fields */}
                        {educationFields.map((field, index) => (
                            <div key={index} className="education-section">
                                <label htmlFor={`education-${index}`}>Education Level:</label>
                                <select
                                    id={`education-${index}`}
                                    name="education"
                                    value={field.education}
                                    onChange={(e) => handleEducationChange(index, e)}
                                >
                                    <option value="">Select your education level</option>
                                    <option value="High School Diploma">High School Diploma</option>
                                    <option value="Skill Certification">Skill Certification</option>
                                    <option value="Bachelors Degree">Bachelor's Degree</option>
                                    <option value="Masters Degree">Master's Degree</option>
                                    <option value="PhD">PhD</option>
                                </select>

                                {field.education && field.education !== 'High School Diploma' && (
                                    <>
                                        <label htmlFor={`degree-details-${index}`}>Degree/Certification Details:</label>
                                        <input
                                            type="text"
                                            id={`degree-details-${index}`}
                                            name="degreeDetails"
                                            value={field.degreeDetails}
                                            placeholder="Degree details"
                                            onChange={(e) => handleEducationChange(index, e)}
                                        />

                                        <label htmlFor={`institution-${index}`}>Institution Name:</label>
                                        <input
                                            type="text"
                                            id={`institution-${index}`}
                                            name="institution"
                                            value={field.institution}
                                            placeholder="Institution name"
                                            onChange={(e) => handleEducationChange(index, e)}
                                        />
                                    </>
                                )}
                            </div>
                        ))}

                        <button type="button" className="add-education-btn" onClick={handleAddEducationField}>
                            <FaPlus /> Add Education
                        </button>

                        {/* Skills */}
                        <label htmlFor="skills">Skills (Add at least 3):</label>
                        <div className={`skills-input ${!skillsValid ? 'invalid-input' : ''}`}>
                            <input
                                type="text"
                                id="skills"
                                value={inputSkill}
                                onChange={handleSkillChange}
                                placeholder="Enter a skill and press add"
                            />
                            <button onClick={handleAddSkill}>Add Skill</button>
                        </div>
                        <div className="skills-list">
                            {skills.map((skill, index) => (
                                <span key={index} className="skill-item">
                                    {skill}
                                    <button className="delete-skill" onClick={() => handleDeleteSkill(skill)}>
                                        &times;
                                    </button>
                                </span>
                            ))}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className={`submit-btn ${isButtonShrinking ? 'shrinking' : ''}`}
                        >
                            Submit
                        </button>
                    </form>
                )}

                {/* Success Overlay */}
                {showOverlay && (
                    <div className="overlay show">
                        <i className="fas fa-check"></i>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CreateProfilePage;
