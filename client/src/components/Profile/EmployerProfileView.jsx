import React, { useEffect } from 'react';
// import './EmployerProfileView.css';

function EmployerProfileView({ employerProfileData }) {
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

    console.log("EmployerProfileView: employerProfileData:", employerProfileData)

    if (!employerProfileData) {
        console.log("EmployerProfileView: No employer profile data available");
        return <h2>No employer profile data available</h2>;
    }

    console.log("EmployerProfileView: Preferential Treatment:", employerProfileData.preferentialTreatment);
    console.log("EmployerProfileView: Company Benefits:", employerProfileData.companyBenefits);

    return (
        <div>
            <div id="particles-js" style={{ position: 'absolute', width: '100%', height: '100%', zIndex: -1 }}></div>

            <div className="profile-view">
                <h1>{employerProfileData.companyName} Employer Profile</h1>
                <div className="profile-details">
                    <img src={employerProfileData.companyLogo} alt="Company Logo" className="profile-picture" />
                    <div className="profile-text">
                        <p><strong>About the Company:</strong> {employerProfileData.aboutCompany}</p>

                        {/* Preferential Treatment */}
                        <p><strong>Preferential Treatment:</strong></p>
                        {employerProfileData.preferentialTreatment && employerProfileData.preferentialTreatment.length > 0 ? (
                            <div className="preferential-treatment-list">
                                {employerProfileData.preferentialTreatment.map((preference, index) => (
                                    <div key={index} className="preference-item">
                                        {preference}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No preferential treatments specified.</p>
                        )}

                        {/* Company Benefits */}
                        <p><strong>Company Benefits:</strong></p>
                        {employerProfileData.companyBenefits && employerProfileData.companyBenefits.length > 0 ? (
                            <div className="company-benefits-list">
                                {employerProfileData.companyBenefits.map((benefit, index) => (
                                    <div key={index} className="benefit-item">
                                        {benefit}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No company benefits specified.</p>
                        )}

                        <p><strong>Contact Information:</strong> {employerProfileData.contact}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmployerProfileView;
