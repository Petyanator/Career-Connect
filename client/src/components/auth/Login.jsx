import { useState } from "react";
import axios from "axios";
import "./Login.css"; // Add your own styles for the login component

function Login() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [loginError, setLoginError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

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
        try {
            const response = await axios.post("http://localhost:5000/login", formData);
            console.log(response.data);
            setLoginError("");
        } catch (error) {
            console.error("Login error", error);
            if (error.response) {
                setLoginError("Invalid username or password");
            } else {
                setLoginError("Failed to login, please try again later.");
            }
        }
    };

    return (
        <div className="login-form-container">
            <h2>Login</h2>
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