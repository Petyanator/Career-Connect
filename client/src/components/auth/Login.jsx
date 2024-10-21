import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import "./Login.css"; // login styles

function Login() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [loginError, setLoginError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [loginAttempt, setLoginAttempt] = useState(0); // Add back loginAttempt
    const [loginSuccess, setLoginSuccess] = useState(false); // Add back loginSuccess
    const { login } = useContext(AuthContext);  // Use AuthContext instead of UserToken
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setAlertMessage(""); // Clear previous alert messages

        try {
            const response = await axios.post("http://localhost:5000/login", formData);

            if (response.status === 200) {
                const { access_token, user } = response.data;

                if (access_token) {
                    login({ access_token, user }); // Use login from AuthContext to store token and user
                    setLoginSuccess(true); // Set login success to true
                    setAlertMessage("Login successful!");

                    // User type logic
                    const userType = user.user_type; // Assuming user object contains user_type
                    if (userType === "employer") {
                        navigate('/employer-create-profile'); // Redirect to employer dashboard
                    } else if (userType === "job_seeker") {
                        navigate('/create-profile'); // Redirect to job seeker dashboard
                    } else {
                        navigate('/'); // Default redirection if user type is not recognized
                    }
                } else {
                    setLoginError("Failed to retrieve access token.");
                }
            } else {
                setLoginError("Invalid username or password");
            }
        } catch (error) {
            console.error("Login error", error);
            setLoginError("Invalid username or password");
        } finally {
            setLoginAttempt(prevAttempt => prevAttempt + 1); // Increment login attempts
            console.log(`Login attempts: ${loginAttempt + 1}`); // Log the attempt count
        }
    };

    // Effect to check for an existing token in localStorage
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
                <p>Login Attempts: {loginAttempt}</p> {/* Display login attempts */}

                <button type="submit" className="login-btn">
                    Login
                </button>
            </form>
            {loginSuccess && <p>Login successful!</p>} {/* Display login success */}
        </div>
    );
}

export default Login;