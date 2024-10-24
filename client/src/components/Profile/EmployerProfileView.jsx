// import React, { useEffect } from "react";
// import './EmployerProfileView.css';

function EmployerProfileView({ profileData }) {
  if (!profileData) {
    return <h2>No employer profile data available</h2>;
  }

  return (
    <div>
      {/* <div
        id="particles-js"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      ></div> */}

      <div className="profile-view">
        <h1>{profileData.company_name} Employer Profile</h1>
        <div className="profile-details">
          <img
            src={profileData.company_logo}
            alt="Company Logo"
            className="profile-picture"
          />
          <div className="profile-text">
            <p>
              <strong>About the Company:</strong> {profileData.about_company}
            </p>

            {/* Preferential Treatment */}
            <p>
              <strong>Preferential Treatment:</strong>
            </p>
            {profileData.preferential_treatment ? (
              Array.isArray(profileData.preferential_treatment) ? (
                <div className="preferential-treatment-list">
                  {profileData.preferential_treatment.map(
                    (preference, index) => (
                      <div key={index} className="preference-item">
                        {preference}
                      </div>
                    )
                  )}
                </div>
              ) : (
                <p>{profileData.preferential_treatment}</p> // If it's a string, just display it
              )
            ) : (
              <p>No preferential treatments specified.</p>
            )}

            {/* Company Benefits */}
            <p>
              <strong>Company Benefits:</strong>
            </p>
            {Array.isArray(profileData.company_benefits) &&
            profileData.company_benefits.length > 0 ? (
              <div className="company-benefits-list">
                {profileData.company_benefits.map((benefit, index) => (
                  <div key={index} className="benefit-item">
                    {benefit}
                  </div>
                ))}
              </div>
            ) : (
              <p>No company benefits specified.</p>
            )}

            <p>
              <strong>Contact Information:</strong> {profileData.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployerProfileView;
