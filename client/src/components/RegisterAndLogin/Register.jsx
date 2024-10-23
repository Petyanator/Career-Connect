import { useState } from "react";
import axios from "axios";
import '../RegisterAndLogin/Register.scss'

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    full_name: "",
    user_type: "",
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
        const { access_token } = response.data;
        localStorage.setItem("access_token", access_token);
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
        } else {
          setErrorMessage("An error occurred during registration.");
        }
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="register-form-container d-flex justify-content-center align-items-center">
      <div className="register-form">
        <h2 className="text-center mb-4">Register</h2>
        {registrationSuccess ? (
          <p className="alert alert-success">Registration successful! You can now log in.</p>
        ) : (
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
              {usernameTaken && <p className="text-danger">Username is already taken!</p>}
            </div>

            <div className="mb-3">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {emailTaken && <p className="text-danger">Email is already registered!</p>}
            </div>

            <div className="mb-3">
              <input
                type="text"
                name="full_name"
                className="form-control"
                placeholder="Full Name"
                value={formData.full_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="user_type" className="form-label">User Type:</label>
              <select
                name="user_type"
                className="form-select"
                value={formData.user_type}
                onChange={handleChange}
                required
              >
                <option value="">Select User Type</option>
                <option value="job_seeker">Job Seeker</option>
                <option value="employer">Employer</option>
              </select>
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
                {showPassword ? "Hide" : "Show"}
              </span>
              {!isPasswordValid && (
                <p className="text-danger">
                  Password must be at least 8 characters long and contain at least one letter, one number, and one special character.
                </p>
              )}
            </div>

            <div className="mb-3 password-container">
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                className="form-control"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <span className="toggle-password" onClick={togglePasswordVisibility}>
                {showPassword ? "Hide" : "Show"}
              </span>
              {!passwordMatch && <p className="text-danger">Passwords do not match!</p>}
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Register
            </button>
          </form>
        )}
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default Register;
