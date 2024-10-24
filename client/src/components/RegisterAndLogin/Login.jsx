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

          // Navigate based on user type
          if (userType === "job_seeker") {
            navigate("/dashboard");
          } else if (userType === "employer") {
            navigate("/employer/dashboard");
          }
        } else {
          setLoginError("Invalid credentials");
        }
      } else {
        const { error } = await response.json();
        setLoginError(error);
      }
    } catch (error) {
      setLoginError("An error occurred while logging in.");
    } finally {
      setLoading(false); // End loading
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
              maxLength={30}  // Limit the username input to 30 characters
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
              maxLength={50}  // Limit the password input to 50 characters
              required
            />
            <span className="toggle-password" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {loginError && <p className="text-danger">{loginError}</p>}
      </div>
    </div>
  );
}

export default Login;