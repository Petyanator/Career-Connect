import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserToken from "../Token/UserToken.jsx";
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
import "../RegisterAndLogin/Login.scss";

function Login({ setIsLoggedIn, setUserType, setFullName, setProfileData }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const { setToken } = UserToken();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle password visibility
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const {
          access_token: accessToken,
          user_type: userType,
          full_name: fullName,
        } = await response.json();

        if (accessToken) {
          // Save the token and user information
          setToken(accessToken);
          setIsLoggedIn(true);
          setUserType();
          setFullName(fullName);

          // Save user data to local storage
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("userType", userType);
          localStorage.setItem("fullName", fullName);

          // Fetch profile data
          const profileResponse = await fetch("http://localhost:5000/dashboard", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          if (profileResponse.ok) {
            const profileData = await profileResponse.json();
            // Set the profile data depending on the user type
            if (userType === "job_seeker") {
              setProfileData(profileData.job_seeker_profile || {});
            } else if (userType === "employer") {
              setProfileData(profileData.employer_profile || {});
            }
          } else {
            console.error("Failed to fetch profile data:", profileResponse.status);
            setLoginError("Failed to retrieve profile data.");
          }

          // Navigate to the appropriate dashboard
          navigate(userType === "job_seeker" ? "/job-seeker-dashboard" : "/employer-dashboard");
        } else {
          setLoginError("Failed to retrieve access token.");
        }
      } else {
        setLoginError("Invalid username or password.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("An error occurred. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="login-form-container d-flex justify-content-center align-items-center">
      <div className="login-form">
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3 password-container">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="form-control"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span className="toggle-password" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>
        {loginError && <p className="text-danger">{loginError}</p>}
      </div>
    </div>
  );
}

export default Login;
