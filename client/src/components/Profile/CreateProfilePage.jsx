import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateProfilePage.scss';
import { FaPlus } from 'react-icons/fa';

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

  // Handle form submission using fetch
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
      education: JSON.stringify(education),  // JSON string of education array
      skills: JSON.stringify(skills),  // JSON string of skills array
    };

    console.log("Submitting profile data:", profileData);

    try {
      // Retrieve JWT token from storage
      const token = localStorage.getItem('token');
      if (!token) {
        alert('No token found');
        return;
      }

      console.log("JWT Token:", token);
      console.log("Payload being sent:", profileData);

      // Send data to the backend using fetch
      const response = await fetch('http://localhost:5000/api/job_seeker/create_profile', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Server response:", data);
        // Success
        setTimeout(() => {
          setShowForm(false);
          setShowOverlay(true);
        }, 800);

        setTimeout(() => {
          navigate('/profile');
        }, 4000);
      } else {
        alert(`An error occurred: ${data.message}`);
        setIsButtonShrinking(false);
      }
    } catch (error) {
      console.error('Error creating profile:', error);
      alert('An error occurred while creating your profile.');
      setIsButtonShrinking(false);
    }
  };

  return (
    <>
     <div className="create-profile-container d-flex justify-content-center align-items-center">
      <div className="create-profile-form">
        {showForm && (
          <form onSubmit={handleSubmit} className="form-create-profile">
            <h1 className="text-center mb-4">Create Your Profile</h1>

            {/* Profile Picture */}
            <div className="mb-3">
              <label htmlFor="profile-picture" className="form-label">Profile Picture:</label>
              <input type="file" className="form-control" accept="image/jpeg, image/png" id="profile-picture" />
              {selectedImage && (
                <div className="image-preview mt-2">
                  <img src={URL.createObjectURL(selectedImage)} alt="Profile Preview" className="img-thumbnail" />
                </div>
              )}
            </div>

            {/* First Name */}
            <div className="mb-3">
              <label htmlFor="first-name" className="form-label">First Name:</label>
              <input
                type="text"
                id="first-name"
                className={`form-control ${!firstNameValid && "is-invalid"}`}
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            {/* Last Name */}
            <div className="mb-3">
              <label htmlFor="last-name" className="form-label">Last Name:</label>
              <input
                type="text"
                id="last-name"
                className={`form-control ${!lastNameValid && "is-invalid"}`}
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            {/* Date of Birth */}
            <div className="mb-3">
              <label htmlFor="dob" className="form-label">Date of Birth:</label>
              <input
                type="date"
                id="dob"
                className={`form-control ${!dobValid && "is-invalid"}`}
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </div>

            {/* Gender */}
            <div className="mb-3">
              <label className="form-label">Gender:</label>
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  name="gender"
                  value="Male"
                  onChange={(e) => setGender(e.target.value)}
                />
                <label className="form-check-label">Male</label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  name="gender"
                  value="Female"
                  onChange={(e) => setGender(e.target.value)}
                />
                <label className="form-check-label">Female</label>
              </div>
            </div>

            {/* Nationality */}
            <div className="mb-3">
              <label htmlFor="nationality" className="form-label">Nationality:</label>
              <input
                type="text"
                id="nationality"
                className={`form-control ${!nationalityValid && "is-invalid"}`}
                placeholder="Nationality"
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
              />
            </div>

            {/* Education Fields */}
            {educationFields.map((field, index) => (
              <div key={index} className="mb-3">
                <label htmlFor={`education-${index}`} className="form-label">Education Level:</label>
                <select
                  id={`education-${index}`}
                  className="form-select"
                  value={field.education}
                  onChange={(e) => {
                    const newFields = [...educationFields];
                    newFields[index].education = e.target.value;
                    setEducationFields(newFields);
                  }}
                >
                  <option value="">Select your education level</option>
                  <option value="High School Diploma">High School Diploma</option>
                  <option value="Skill Certification">Skill Certification</option>
                  <option value="Bachelor's Degree">Bachelor's Degree</option>
                  <option value="Master's Degree">Master's Degree</option>
                  <option value="PhD">PhD</option>
                </select>

                {field.education && field.education !== "High School Diploma" && (
                  <>
                    <label htmlFor={`degree-details-${index}`} className="form-label">Degree/Certification Details:</label>
                    <input
                      type="text"
                      id={`degree-details-${index}`}
                      className="form-control"
                      value={field.degreeDetails}
                      onChange={(e) => {
                        const newFields = [...educationFields];
                        newFields[index].degreeDetails = e.target.value;
                        setEducationFields(newFields);
                      }}
                    />

                    <label htmlFor={`institution-${index}`} className="form-label">Institution Name:</label>
                    <input
                      type="text"
                      id={`institution-${index}`}
                      className="form-control"
                      value={field.institution}
                      onChange={(e) => {
                        const newFields = [...educationFields];
                        newFields[index].institution = e.target.value;
                        setEducationFields(newFields);
                      }}
                    />
                  </>
                )}
              </div>
            ))}

            <button type="button" className="btn btn-outline-primary mb-3" onClick={() => setEducationFields([...educationFields, { education: "", degreeDetails: "", institution: "" }])}>
              <FaPlus /> Add Education
            </button>

            {/* Skills */}
            <div className="mb-3">
              <label htmlFor="skills" className="form-label">Skills (Add at least 3):</label>
              <div className="d-flex">
                <input
                  type="text"
                  id="skills"
                  className="form-control"
                  value={inputSkill}
                  onChange={(e) => setInputSkill(e.target.value)}
                  placeholder="Enter a skill and press add"
                />
                <button type="button" className="btn btn-primary ms-2" onClick={handleAddSkill}>Add Skill</button>
              </div>
              <div className="mt-3">
                {skills.map((skill, index) => (
                  <span key={index} className="badge bg-secondary me-2">
                    {skill}
                    <button type="button" className="btn-close btn-close-white ms-2" onClick={() => handleDeleteSkill(skill)}></button>
                  </span>
                ))}
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-100">Submit</button>
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
    </>
  );
}

export default CreateProfilePage;
