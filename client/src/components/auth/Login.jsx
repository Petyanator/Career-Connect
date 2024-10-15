import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import "./Login.css";
import UserToken from "../Token/UserToken.jsx";

function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const { setToken } = UserToken();
  const navigate = useNavigate(); // Initialize navigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        formData
      );
      if (response.status === 200) {
        const accessToken = response.data.access_token;
        const userType = response.data.user_type; // Assuming user_type is returned by the API

        console.log("User Type:", userType); // Log userType for debugging
        console.log("accesstoken:", accessToken); // Log userType for debugging

        if (accessToken) {
          setToken(accessToken);

          // Redirect to the appropriate dashboard based on user type
          if (userType === "job_seeker") {
            navigate("/job-seeker-dashboard");
          } else if (userType === "employer") {
            navigate("/employer-dashboard");
          } else {
            setLoginError("User type is not recognized.");
          }
        } else {
          setLoginError("Failed to retrieve access token.");
        }
      } else {
        setLoginError("Invalid username or password.");
      }
    } catch (error) {
      console.error("Login error:", error); // Log the error for debugging
      setLoginError("Invalid username or password.");
    }
  };

  return (
    <div className="login-form-container">
      <h2>Login</h2>
      {loginError && <p style={{ color: "red" }}>{loginError}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
