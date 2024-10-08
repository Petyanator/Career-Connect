import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateProfilePage.css';

function CreateProfilePage({ setProfileData }) {
    const [skills, setSkills] = useState([]);
    const [inputSkill, setInputSkill] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [education, setEducation] = useState('');
    const [degreeDetails, setDegreeDetails] = useState('');
    const [institution, setInstitution] = useState('');
    const [gender, setGender] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState('');
    const [nationality, setNationality] = useState('');

    // State to track input validity
    const [firstNameValid, setFirstNameValid] = useState(true);
    const [lastNameValid, setLastNameValid] = useState(true);
    const [dobValid, setDobValid] = useState(true);
    const [genderValid, setGenderValid] = useState(true);
    const [nationalityValid, setNationalityValid] = useState(true);
    const [skillsValid, setSkillsValid] = useState(true);
    const [degreeDetailsValid, setDegreeDetailsValid] = useState(true);
    const [institutionValid, setInstitutionValid] = useState(true);

    const [showOverlay, setShowOverlay] = useState(false);
    const [showForm, setShowForm] = useState(true);
    const [isButtonShrinking, setIsButtonShrinking] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            window.particlesJS('particles-js', {
                particles: {
                    number: {
                        value: 80,
                        density: { enable: true, value_area: 800 },
                    },
                    color: { value: '#ffffff' },
                    shape: {
                        type: 'circle',
                        stroke: { width: 0, color: '#000000' },
                        polygon: { nb_sides: 5 },
                    },
                    opacity: { value: 0.5, anim: { enable: false } },
                    size: { value: 3, random: true, anim: { enable: false } },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: '#ffffff',
                        opacity: 0.4,
                        width: 1,
                    },
                    move: {
                        enable: true,
                        speed: 6,
                        direction: 'none',
                        random: false,
                        straight: false,
                        out_mode: 'out',
                        bounce: false,
                    },
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: {
                        onhover: { enable: true, mode: 'grab' },
                        onclick: { enable: true, mode: 'push' },
                    },
                    modes: {
                        grab: { distance: 140, line_linked: { opacity: 1 } },
                        bubble: { distance: 400, size: 40 },
                        repulse: { distance: 200 },
                    },
                },
                retina_detect: true,
            });
        };

        return () => {
            document.body.removeChild(script);
        };
    }, []);


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


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
        }
    };


    const handleEducationChange = (e) => {
        setEducation(e.target.value);
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if fields are valid
        const isFirstNameValid = !!firstName;
        const isLastNameValid = !!lastName;
        const isDobValid = !!dob;
        const isGenderValid = !!gender;
        const isNationalityValid = !!nationality;
        const isSkillsValid = skills.length >= 3;

        const isDegreeDetailsValid = education && education !== 'High School Diploma' ? !!degreeDetails : true;
        const isInstitutionValid = education && education !== 'High School Diploma' ? !!institution : true;

        // Update validation state
        setFirstNameValid(isFirstNameValid);
        setLastNameValid(isLastNameValid);
        setDobValid(isDobValid);
        setGenderValid(isGenderValid);
        setNationalityValid(isNationalityValid);
        setSkillsValid(isSkillsValid);
        setDegreeDetailsValid(isDegreeDetailsValid);
        setInstitutionValid(isInstitutionValid);

        // Prevent form submission if any field is invalid
        if (!isFirstNameValid || !isLastNameValid || !isDobValid || !isGenderValid || !isNationalityValid || !isSkillsValid || !isDegreeDetailsValid || !isInstitutionValid) {
            alert("Please fill out all the required fields.");
            return;
        }

        const profileData = {
            firstName,
            lastName,
            dob,
            gender,
            nationality,
            education,
            degreeDetails,
            institution,
            skills,
            profilePicture: selectedImage,
        };

        setProfileData(profileData);

        setIsButtonShrinking(true);

        setTimeout(() => {
            setShowForm(false);
            setShowOverlay(true);
        }, 800);

        setTimeout(() => {
            navigate('/profile');
        }, 4000);
    };


    return (
        <div className={`create-profile-page ${showForm ? '' : 'hidden-form'}`}>
            {showForm && (
                <form onSubmit={handleSubmit}>
                    <h1>Create Your Profile</h1>
                    <label htmlFor="profile-picture">Profile Picture:</label>
                    <input type="file" accept="image/jpeg, image/png" id="profile-picture" onChange={handleImageChange} />
                    {selectedImage && (
                        <div className="image-preview">
                            <img src={selectedImage} alt="Profile Preview" style={{ width: '100px', height: '80px' }} />
                        </div>
                    )}

                    <label htmlFor="first-name">First Name:</label>
                    <input
                        type="text"
                        id="first-name"
                        placeholder="First name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className={!firstNameValid ? 'invalid-input' : ''}
                    />

                    <label htmlFor="second-name">Second Name:</label>
                    <input
                        type="text"
                        id="second-name"
                        placeholder="Second name"
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

                    <label htmlFor="education">Education:</label>
                    <select id="education" value={education} onChange={handleEducationChange}>
                        <option value="">Select your education level</option>
                        <option value="High School Diploma">High School Diploma</option>
                        <option value="Skill Certification">Skill Certification</option>
                        <option value="Bachelor's Degree">Bachelor's Degree</option>
                        <option value="Master's Degree">Master's Degree</option>
                        <option value="PhD">PhD</option>
                    </select>

                    {education && education !== 'High School Diploma' && (
                        <>
                            <label htmlFor="degree-details">Degree/Certification Details:</label>
                            <input
                                type="text"
                                id="degree-details"
                                placeholder="Degree or Certification"
                                value={degreeDetails}
                                onChange={(e) => setDegreeDetails(e.target.value)}
                                className={!degreeDetailsValid ? 'invalid-input' : ''}
                            />

                            <label htmlFor="institution">Institution Name:</label>
                            <input
                                type="text"
                                id="institution"
                                placeholder="Institution"
                                value={institution}
                                onChange={(e) => setInstitution(e.target.value)}
                                className={!institutionValid ? 'invalid-input' : ''}
                            />
                        </>
                    )}

                    <label htmlFor="skills">Skills (Add at least 3):</label>
                    <div className={`skills-input ${!skillsValid ? 'invalid-input' : ''}`}>
                        <input
                            type="text"
                            id="skills"
                            value={inputSkill}
                            onChange={handleSkillChange}
                            placeholder="Skill"
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

                    <button
                        type="submit"
                        className={`submit-btn ${isButtonShrinking ? 'shrinking' : ''}`}
                    >
                        Submit
                    </button>
                </form>
            )}

            {showOverlay && (
                <div className="overlay show">
                    <i className="fas fa-check"></i>
                </div>
            )}
        </div>
    );
}

export default CreateProfilePage;
