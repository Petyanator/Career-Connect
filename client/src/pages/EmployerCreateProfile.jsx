import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './EmployerCreateProfile.css';

function EmployerCreateProfile({ setEmployerProfileData }) {
    const [companyName, setCompanyName] = useState('');
    const [companyLogo, setCompanyLogo] = useState(null);
    const [aboutCompany, setAboutCompany] = useState('');
    const [preferentialTreatment, setPreferentialTreatment] = useState([]);
    const [inputPreference, setInputPreference] = useState('');
    const [companyBenefits, setCompanyBenefits] = useState([]);
    const [inputBenefit, setInputBenefit] = useState('');
    const [contact, setContact] = useState('');
    const [showOverlay, setShowOverlay] = useState(false);
    const [showForm, setShowForm] = useState(true);
    const [isButtonShrinking, setIsButtonShrinking] = useState(false);
    const [companyNameValid, setCompanyNameValid] = useState(true);
    const [aboutCompanyValid, setAboutCompanyValid] = useState(true);
    const [contactValid, setContactValid] = useState(true);

    const navigate = useNavigate();

    // Particle effect useEffect
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            const particlesElement = document.getElementById('particles-js');
            if (particlesElement && window.particlesJS) {
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
            }
        };

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    // Handle company logo change
    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCompanyLogo(URL.createObjectURL(file));
        }
    };

    // Handle adding preferential treatment
    const handleAddPreference = (e) => {
        e.preventDefault();
        if (preferentialTreatment.length >= 6) {
            alert('You can add up to 6 preferential treatments only.');
            return;
        }
        if (inputPreference && !preferentialTreatment.includes(inputPreference)) {
            setPreferentialTreatment([...preferentialTreatment, inputPreference]);
            setInputPreference('');
        }
    };

    // Handle deleting a preference
    const handleDeletePreference = (preferenceToDelete) => {
        const updatedPreferences = preferentialTreatment.filter(
            (preference) => preference !== preferenceToDelete
        );
        setPreferentialTreatment(updatedPreferences);
    };

    // Handle adding company benefits
    const handleAddBenefit = (e) => {
        e.preventDefault();
        if (companyBenefits.length >= 6) {
            alert('You can add up to 6 company benefits only.');
            return;
        }
        if (inputBenefit && !companyBenefits.includes(inputBenefit)) {
            setCompanyBenefits([...companyBenefits, inputBenefit]);
            setInputBenefit('');
        }
    };

    // Handle deleting a company benefit
    const handleDeleteBenefit = (benefitToDelete) => {
        const updatedBenefits = companyBenefits.filter(
            (benefit) => benefit !== benefitToDelete
        );
        setCompanyBenefits(updatedBenefits);
    };

    // Function to make a POST request to the Flask API
    const createEmployerProfile = async (employerProfileData) => {
        try {
            console.log("Creating employer profile with data:", employerProfileData);
            const response = await fetch('http://127.0.0.1:5001/api/employer/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(employerProfileData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log('Employer profile created successfully:', responseData);
            return responseData; // Return response for further processing
        } catch (error) {
            console.error('Error creating employer profile:', error);
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate the form fields
        const isCompanyNameValid = !!companyName;
        const isAboutCompanyValid = !!aboutCompany;
        const isContactValid = !!contact;

        setCompanyNameValid(isCompanyNameValid);
        setAboutCompanyValid(isAboutCompanyValid);
        setContactValid(isContactValid);

        if (!isCompanyNameValid || !isAboutCompanyValid || !isContactValid) {
            alert('Please fill out all required fields.');
            return;
        }

        const employerProfileData = {
            company_name: companyName,
            company_logo: companyLogo,
            about_company: aboutCompany,
            preferential_treatment: preferentialTreatment,
            company_benefits: companyBenefits,
            contact: contact,
        };

        console.log("Data being sent to backend:", employerProfileData);

        const response = await createEmployerProfile(employerProfileData);
        if (response) {
            setIsButtonShrinking(true);
            setTimeout(() => {
                setShowForm(false);
                setShowOverlay(true);
            }, 800);
            setTimeout(() => {
                navigate('/employer-profile');
            }, 4000);
        }
    };

    return (
        <div>
            {/* Particle effect div */}
            <div id="particles-js" style={{ position: 'absolute', width: '100%', height: '100%', zIndex: -1 }}></div>

            <div className={`employer-create-profile-page ${showForm ? '' : 'hidden-form'}`}>
                {showForm && (
                    <form onSubmit={handleSubmit}>
                        <h1>Create Employer Profile</h1>

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

                        {/* Company Logo */}
                        <label htmlFor="company-logo">Company Logo:</label>
                        <input type="file" accept="image/jpeg, image/png" id="company-logo" onChange={handleLogoChange} />
                        {companyLogo && (
                            <div className="image-preview">
                                <img src={companyLogo} alt="Company Logo" style={{ width: '100px', height: '80px' }} />
                            </div>
                        )}

                        {/* About Company */}
                        <label htmlFor="about-company">About the Company:</label>
                        <textarea
                            id="about-company"
                            placeholder="Describe the company"
                            value={aboutCompany}
                            onChange={(e) => setAboutCompany(e.target.value)}
                            className={!aboutCompanyValid ? 'invalid-input' : ''}
                        ></textarea>

                        {/* Preferential Treatment */}
                        <label htmlFor="preferential-treatment">Preferential Treatment (6 max):</label>
                        <input
                            type="text"
                            id="preferential-treatment"
                            placeholder="Add a preference"
                            value={inputPreference}
                            onChange={(e) => setInputPreference(e.target.value)}
                            disabled={preferentialTreatment.length >= 6}
                        />
                        <div className="preference-section">
                            <button
                                className="add-preference-btn"
                                onClick={handleAddPreference}
                                disabled={preferentialTreatment.length >= 6}
                            >
                                Add Preference
                            </button>

                            <div className="preferences-list">
                                {preferentialTreatment.map((preference, index) => (
                                    <span key={index} className="preference-item">
                                        {preference}
                                        <button
                                            className="delete-preference"
                                            onClick={() => handleDeletePreference(preference)}
                                        >
                                            &times;
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Company Benefits */}
                        <label htmlFor="company-benefits">Company Benefits (6 max):</label>
                        <input
                            type="text"
                            id="company-benefits"
                            placeholder="Add a benefit"
                            value={inputBenefit}
                            onChange={(e) => setInputBenefit(e.target.value)}
                            disabled={companyBenefits.length >= 6}
                        />
                        <div className="benefit-section">
                            <button
                                className="add-benefit-btn"
                                onClick={handleAddBenefit}
                                disabled={companyBenefits.length >= 6}
                            >
                                Add Benefit
                            </button>

                            <div className="benefits-list">
                                {companyBenefits.map((benefit, index) => (
                                    <span key={index} className="benefit-item">
                                        {benefit}
                                        <button
                                            className="delete-benefit"
                                            onClick={() => handleDeleteBenefit(benefit)}
                                        >
                                            &times;
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Contact Information */}
                        <label htmlFor="contact">Contact Information:</label>
                        <input
                            type="text"
                            id="contact"
                            placeholder="Contact Information"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            className={!contactValid ? 'invalid-input' : ''}
                        />

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className={`submit-btn ${isButtonShrinking ? 'shrinking' : ''}`}
                        >
                            Submit
                        </button>
                    </form>
                )}

                {/* Green checkmark overlay */}
                {showOverlay && (
                    <div className="overlay show">
                        <i className="fas fa-check"></i>
                    </div>
                )}
            </div>
        </div>
    );
}

export default EmployerCreateProfile;
