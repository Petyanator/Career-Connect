import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserToken from "../Token/UserToken.jsx";
import "../RegisterAndLogin/Login.scss"

function Login({ setIsLoggedIn, setUserType }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const { setToken } = UserToken();
  const navigate = useNavigate();

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
        const userType = response.data.user_type;

        if (accessToken) {
          setToken(accessToken);
          setIsLoggedIn(true);
          setUserType(userType);

          localStorage.setItem("userType", userType);

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
      console.error("Login error:", error);
      setLoginError("Invalid username or password.");
    }
  };

  return (
    <>
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
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>

        </div>
    </div>
    </>
  );
}

export default Login;
