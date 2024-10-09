import React, { useEffect } from 'react';
import './CreateProfileView.css';

function CreateProfileView({ profileData }) {
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

    if (!profileData) {
        return <h2>No profile data available</h2>;
    }

    return (
        <div>
            {/* Div for particle effect */}
            <div id="particles-js" style={{ position: 'absolute', width: '100%', height: '100%', zIndex: -1 }}></div>

            <div className="profile-view">
                <h1>{profileData.firstName} {profileData.lastName}'s Profile</h1>
                <div className="profile-details">
                    <img src={profileData.profilePicture} alt="Profile" className="profile-picture" />
                    <div className="profile-text">
                        <p><strong>Date of Birth:</strong> {profileData.dob}</p>
                        <p><strong>Gender:</strong> {profileData.gender}</p>
                        <p><strong>Nationality:</strong> {profileData.nationality}</p>

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
        </div>
    );
}

export default CreateProfileView;
