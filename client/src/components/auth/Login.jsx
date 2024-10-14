import { useState, useEffect } from "react";
import axios from "axios";
import "./Login.css"; // Add your own styles for the login component
import { useNavigate } from "react-router-dom";
import UserToken from '../Token/UserToken.jsx'; // Import the UserToken hook

function Login() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [loginError, setLoginError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [loginAttempt, setLoginAttempt] = useState(0); // Start at 0 for counting attempts
    const [loginSuccess, setLoginSuccess] = useState(false);
    const { token, setToken, removeToken } = UserToken(); // Use token management from UserToken
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setAlertMessage(""); // Clear previous alert messages

        try {
            const response = await axios.post("http://localhost:5000/login", formData);
            const accessToken = response.data.access_token;
        
            if (accessToken) {
                setToken(accessToken);
                setLoginSuccess(true);
                setAlertMessage("Login successful!");
                navigate('/home'); 
            }
        } catch (error) {
            console.error("Login error", error);
            setLoginError(error.response?.data?.error || "Invalid username or password.");
        } finally {
            setLoginAttempt((prev) => prev + 1);
        }
        
    };

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setLoginSuccess(true);
            setAlertMessage("You are already logged in."); // Alert if the user is already logged in
            navigate('/home'); // Navigate to home if already logged in
        }
    }, [navigate]);

    return (
        <div className="login-form-container">
            <h2>Login</h2>
            {alertMessage && <div className='alert'>{alertMessage}</div>}
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
                        <span className="toggle-password-icon" onClick={togglePasswordVisibility}>
                            {showPassword ? "🔒" : "🔓"} {/* Toggle password visibility */}
                        </span>
                    </div>
                </div>

                {loginError && <p style={{ color: "red" }}>{loginError}</p>}

                <button type="submit" className="login-btn">
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;