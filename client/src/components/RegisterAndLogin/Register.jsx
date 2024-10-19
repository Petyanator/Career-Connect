import { useState } from "react";
import axios from "axios";
// import "./Register.css";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    full_name: "",
    user_type: "", // Add user_type to formData state
    password: "",
    confirmPassword: "",
  });

  const [passwordMatch, setPasswordMatch] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [usernameTaken, setUsernameTaken] = useState(false);
  const [emailTaken, setEmailTaken] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "password") {
      setPasswordMatch(value === formData.confirmPassword);
      setIsPasswordValid(validatePassword(value));
    } else if (name === "confirmPassword") {
      setPasswordMatch(value === formData.password);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!passwordMatch || !isPasswordValid) {
      setErrorMessage(
        "Please ensure the password criteria are met and passwords match."
      );
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/register",
        formData
      );
      if (response.status === 201) {
        setRegistrationSuccess(true);
        setErrorMessage("");

        // Save the access token to localStorage or state management (e.g., Redux)
        const { access_token } = response.data;
        localStorage.setItem("access_token", access_token);

        // Optionally, redirect the user to the login page or home page after registration
        console.log("User registered successfully:", response.data.user);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          const errorMsg = error.response.data.error;
          if (errorMsg.includes("Username")) {
            setUsernameTaken(true);
          } else if (errorMsg.includes("Email")) {
            setEmailTaken(true);
          }
          setErrorMessage(errorMsg);
        } else if (error.response.status === 400) {
          setErrorMessage("Invalid user type.");
        } else {
          setErrorMessage("An error occurred during registration.");
        }
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="register-form-container">
      <h2>Register</h2>
      {registrationSuccess ? (
        <p style={{ color: "green" }}>
          Registration successful! You can now log in.
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="input-container">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            {usernameTaken && (
              <p style={{ color: "red" }}>Username is already taken!</p>
            )}
          </div>

          {/* Email */}
          <div className="input-container">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {emailTaken && (
              <p style={{ color: "red" }}>Email is already registered!</p>
            )}
          </div>

          {/* Full Name */}
          <div className="input-container">
            <input
              type="text"
              name="full_name"
              placeholder="Full Name"
              value={formData.full_name}
              onChange={handleChange}
              required
            />
          </div>

          {/* User Type */}
          <div className="input-container">
            <label htmlFor="user_type">User Type:</label>
            <select
              name="user_type"
              value={formData.user_type}
              onChange={handleChange}
              required
            >
              <option value="">Select User Type</option>
              <option value="job_seeker">Job Seeker</option>
              <option value="employer">Employer</option>
            </select>
          </div>

          {/* Password */}
          <div className="input-container">
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span
                className="toggle-password-icon"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "🔒" : "🔓"}
              </span>
            </div>
          </div>

          {!isPasswordValid && (
            <p style={{ color: "red" }}>
              Password must be at least 8 characters long and contain at least
              one letter, one number, and one special character.
            </p>
          )}

          {/* Confirm Password */}
          <div className="input-container">
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <span
                className="toggle-password-icon"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "🔒" : "🔓"}
              </span>
            </div>
          </div>

          {!passwordMatch && (
            <p style={{ color: "red" }}>Passwords do not match!</p>
          )}

          <button type="submit" className="register-btn">
            Register
          </button>
        </form>
      )}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
}

export default Register;
