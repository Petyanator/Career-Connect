import React, { useState } from "react";
import "./CreateProfilePage.css";
import { FaPlus } from "react-icons/fa";
import CreateProfileView from "./CreateProfileView";

function CreateProfilePage({ setProfileData, onProfileUpdate }) {
  const [skills, setSkills] = useState([]);
  const [inputSkill, setInputSkill] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [educationFields, setEducationFields] = useState([
    { education: "", degreeDetails: "", institution: "" },
  ]);
  const [gender, setGender] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [nationality, setNationality] = useState("");

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

  // const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  // Handle skill input
  const handleSkillChange = (e) => {
    setInputSkill(e.target.value);
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (inputSkill && !skills.includes(inputSkill)) {
      setSkills([...skills, inputSkill]);
      setInputSkill("");
    }
  };


  const handleDeleteSkill = (skillToDelete) => {
    const updatedSkills = skills.filter((skill) => skill !== skillToDelete);
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
    const { name, value } = e.target;
    const updatedFields = [...educationFields];
    updatedFields[index][name] = value;
    setEducationFields(updatedFields);
  };

  // Function to add another education field
  const handleAddEducationField = () => {
    setEducationFields((prevFields) => [
      ...prevFields,
      { education: "", degreeDetails: "", institution: "" }, // Add a new blank education field
    ]);
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

    if (
      !isFirstNameValid ||
      !isLastNameValid ||
      !isDobValid ||
      !isGenderValid ||
      !isNationalityValid ||
      !isSkillsValid
    ) {
      alert("Please fill out all the required fields.");
      return;
    }

    // Convert selectedImage to base64 if necessary
    let profile_pic = null;
    if (selectedImage) {
      profile_pic = await convertImageToBase64(selectedImage);
    }

    // Prepare education data
    const education = educationFields.map((field) => {
      const { education, degreeDetails, institution } = field;
      return {
        education,
        degreeDetails,
        institution,
      };
    });

    // const education = educationFields.map((field) => {
    //   return `${education} in ${degreeDetails} at ${institution}`;
    // });

    const profileData = {
      profile_pic,
      first_name: firstName,
      last_name: lastName,
      dob,
      gender,
      nationality,
      education,
      // JSON.stringify(education), // JSON string of education array
      skills: JSON.stringify(skills), // JSON string of skills array
    };

    console.log("Submitting profile data:", profileData);

    try {
      // Retrieve JWT token from storage
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No token found");
        return;
      }

      console.log("JWT Token:", token);
      console.log("Payload being sent:", profileData);

      // Send data to the backend using fetch
      const response = await fetch(
        "http://localhost:5000/api/job_seeker/create_profile",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(profileData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Server response:", data);
        setShowForm(false);
        setShowOverlay(true);
        setIsSubmitted(true);
        onProfileUpdate(data.jobseeker_profile)
        
      } else {
        alert(`An error occurred: ${data.message}`);
        setIsButtonShrinking(false);
      }
    } catch (error) {
      console.error("Error creating profile:", error);
      alert("An error occurred while creating your profile.");
      setIsButtonShrinking(false);
    }
  };
  if (isSubmitted) {
    return <CreateProfileView setProfileData={setProfileData} />;
  }
  return (
    <div>
      {/* Form section */}
      <div className={`create-profile-page ${showForm ? "" : "hidden-form"}`}>
        {showForm && (
          <form onSubmit={handleSubmit}>
            <h1>Create Your Profile</h1>
            {/* Profile Picture */}
            <label htmlFor="profile-picture">Profile Picture:</label>
            <input
              type="file"
              accept="image/jpeg, image/png"
              id="profile-picture"
              onChange={handleImageChange}
            />
            {selectedImage && (
              <div className="image-preview">
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Profile Preview"
                  style={{ width: "100px", height: "80px" }}
                />
              </div>
            )}

            {/* First Name */}
            <label htmlFor="first-name">First Name:</label>
            <input
              type="text"
              id="first-name"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={!firstNameValid ? "invalid-input" : ""}
            />

            {/* Last Name */}
            <label htmlFor="last-name">Last Name:</label>
            <input
              type="text"
              id="last-name"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={!lastNameValid ? "invalid-input" : ""}
            />

            {/* Date of Birth */}
            <label htmlFor="dob">Date of Birth:</label>
            <input
              type="date"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className={!dobValid ? "invalid-input" : ""}
            />

            {/* Gender */}
            <label>Gender:</label>
            <div
              className={`gender-input ${!genderValid ? "invalid-input" : ""}`}
            >
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  onChange={(e) => setGender(e.target.value)}
                />{" "}
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  onChange={(e) => setGender(e.target.value)}
                />{" "}
                Female
              </label>
            </div>

            {/* Nationality */}
            <label htmlFor="nationality">Nationality:</label>
            <input
              type="text"
              id="nationality"
              placeholder="Nationality"
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
              className={!nationalityValid ? "invalid-input" : ""}
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
                  <option value="High School Diploma">
                    High School Diploma
                  </option>
                  <option value="Skill Certification">
                    Skill Certification
                  </option>
                  <option value="Bachelor's Degree">Bachelor's Degree</option>
                  <option value="Master's Degree">Master's Degree</option>
                  <option value="PhD">PhD</option>
                </select>

                {field.education &&
                  field.education !== "High School Diploma" && (
                    <>
                      <label htmlFor={`degree-details-${index}`}>
                        Degree/Certification Details:
                      </label>
                      <input
                        type="text"
                        id={`degree-details-${index}`}
                        name="degreeDetails"
                        value={field.degreeDetails}
                        placeholder="Degree details"
                        onChange={(e) => handleEducationChange(index, e)}
                      />

                      <label htmlFor={`institution-${index}`}>
                        Institution Name:
                      </label>
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

            <button
              type="button"
              className="add-education-btn"
              onClick={handleAddEducationField}
            >
              <FaPlus /> Add Education
            </button>

            {/* Skills */}
            <label htmlFor="skills">Skills (Add at least 3):</label>
            <div
              className={`skills-input ${!skillsValid ? "invalid-input" : ""}`}
            >
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
                  <button
                    className="delete-skill"
                    onClick={() => handleDeleteSkill(skill)}
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`submit-btn ${isButtonShrinking ? "shrinking" : ""}`}
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
