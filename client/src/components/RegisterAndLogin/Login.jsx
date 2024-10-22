import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserToken from "../Token/UserToken.jsx";
import "../RegisterAndLogin/Login.scss";

function Login({ setIsLoggedIn, setUserType, setFullName, setProfileData }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state
  const { setToken } = UserToken();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
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
          setUserType(userType);
          setFullName(fullName);

          // Save user data to local storage
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("userType", userType);
          localStorage.setItem("fullName", fullName);

          // Fetch profile data
          const profileResponse = await fetch(
            "http://localhost:5000/dashboard",
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          if (profileResponse.ok) {
            const profileData = await profileResponse.json();
            setProfileData(profileData.job_seeker_profile || {}); // Set profile data or an empty object
          }

          // Navigate to the appropriate dashboard
          navigate(
            userType === "job_seeker"
              ? "/job-seeker-dasboard"
              : "/employer-dashboard"
          );
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
    <div className="login-container">
      <div className="login-form">
        <h2 className="mb-4 text-center">Login</h2>
        {loginError && <div className="alert alert-danger">{loginError}</div>}
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
              disabled={loading} // Disable input while loading
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading} // Disable input while loading
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading} // Disable button while loading
          >
            {loading ? "Logging in..." : "Login"} {/* Show loading text */}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
