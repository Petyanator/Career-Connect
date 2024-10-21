import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EmployerCreateProfile.css';  // Similar to JobSeekerProfileCreate.css


function EmployerProfileCreate({ setProfileData }) {
  const [companyName, setCompanyName] = useState('');
  const [aboutCompany, setAboutCompany] = useState('');
  const [companyLogo, setCompanyLogo] = useState(null);
  const [preferentialTreatment, setPreferentialTreatment] = useState('');
  const [companyBenefits, setCompanyBenefits] = useState([]);
  const [inputBenefit, setInputBenefit] = useState('');
  const [email, setEmail] = useState('');

  // Validation states
  const [companyNameValid, setCompanyNameValid] = useState(true);
  const [aboutCompanyValid, setAboutCompanyValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [isButtonShrinking, setIsButtonShrinking] = useState(false);

  const navigate = useNavigate();

  // Handle benefit input
  const handleBenefitChange = (e) => setInputBenefit(e.target.value);

  const handleAddBenefit = (e) => {
    e.preventDefault();
    if (inputBenefit && !companyBenefits.includes(inputBenefit)) {
      setCompanyBenefits([...companyBenefits, inputBenefit]);
      setInputBenefit('');
    }
  };

  const handleDeleteBenefit = (benefitToDelete) => {
    const updatedBenefits = companyBenefits.filter(benefit => benefit !== benefitToDelete);
    setCompanyBenefits(updatedBenefits);
  };

  // Handle company logo change
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) setCompanyLogo(file);
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
    const isCompanyNameValid = !!companyName;
    const isAboutCompanyValid = !!aboutCompany;
    const isEmailValid = !!email && email.includes('@');

    setCompanyNameValid(isCompanyNameValid);
    setAboutCompanyValid(isAboutCompanyValid);
    setEmailValid(isEmailValid);

    if (!isCompanyNameValid || !isAboutCompanyValid || !isEmailValid) {
      alert("Please fill out all the required fields.");
      return;
    }

    // Convert company logo to base64 if necessary
    let company_logo = null;
    if (companyLogo) {
      company_logo = await convertImageToBase64(companyLogo);
    }

    // Prepare profile data
    const profileData = {
      company_name: companyName,
      about_company: aboutCompany,
      company_logo,  // Can be null if no logo was uploaded
      preferential_treatment: preferentialTreatment,
      company_benefits: JSON.stringify(companyBenefits),  // Convert benefits to JSON string
      email  // Include email in the profile data
    };

    console.log("Submitting profile data:", profileData);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('No token found');
        return;
      }

      const response = await fetch('http://localhost:5000/api/employer/create_profile', {
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
    <div>
      {/* Particle effect container */}
      <div id="particles-js" style={{ position: 'absolute', width: '100%', height: '100%', zIndex: -1 }}></div>

      {/* Form section */}
      <div className={`create-profile-page ${showForm ? '' : 'hidden-form'}`}>
        {showForm && (
          <form onSubmit={handleSubmit}>
            <h1>Create Employer Profile</h1>

            {/* Company Logo */}
            <label htmlFor="company-logo">Company Logo:</label>
            <input type="file" accept="image/jpeg, image/png" id="company-logo" onChange={handleLogoChange} />
            {companyLogo && (
              <div className="image-preview">
                <img src={URL.createObjectURL(companyLogo)} alt="Logo Preview" style={{ width: '100px', height: '80px' }} />
              </div>
            )}

            {/* Company Name */}
            <label htmlFor="company-name">Company Name:</label>
            <input
              type="text"
              id="company-name"
              placeholder="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className={!companyNameValid ? 'invalid-input' : ''}
            />

            {/* Email */}
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              placeholder="Company Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={!emailValid ? 'invalid-input' : ''}
            />

            {/* About Company */}
            <label htmlFor="about-company">About Company:</label>
            <textarea
              id="about-company"
              placeholder="Describe your company"
              value={aboutCompany}
              onChange={(e) => setAboutCompany(e.target.value)}
              className={!aboutCompanyValid ? 'invalid-input' : ''}
            />

            {/* Preferential Treatment */}
            <label htmlFor="preferential-treatment">Preferential Treatment:</label>
            <input
              type="text"
              id="preferential-treatment"
              placeholder="Any preferential treatment for employees?"
              value={preferentialTreatment}
              onChange={(e) => setPreferentialTreatment(e.target.value)}
            />

            {/* Company Benefits */}
            <label htmlFor="company-benefits">Company Benefits (Add at least 1):</label>
            <div className="benefits-input">
              <input
                type="text"
                id="company-benefits"
                value={inputBenefit}
                onChange={handleBenefitChange}
                placeholder="Enter a benefit and press add"
              />
              <button onClick={handleAddBenefit}>Add Benefit</button>
            </div>
            <div className="benefits-list">
              {companyBenefits.map((benefit, index) => (
                <span key={index} className="benefit-item">
                  {benefit}
                  <button className="delete-benefit" onClick={() => handleDeleteBenefit(benefit)}>
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

export default EmployerProfileCreate;