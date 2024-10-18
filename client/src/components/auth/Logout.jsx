<<<<<<< HEAD
import useAuth from "../../hooks/useAuth";

const Logout = ({ handleLogout }) => { // Accept handleLogout as a prop
  const { logout } = useAuth();

  const handleLogoutAndNavigate = () => {
    logout(); // Call logout from useAuth
    handleLogout(); // Call the navigate function from NavBar
  };

  return (
    <button onClick={handleLogoutAndNavigate}>Logout</button>
  );
};
=======
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import "./Logout.css";

function Logout() {
    const { logout } = useContext(AuthContext);  // Use logout from AuthContext to remove token
    const navigate = useNavigate();

    async function handleLogout() {
        try {
            const response = await axios.post("http://localhost:5000/logout");

            if (response.status === 200) {
                logout();  // Call to remove token from context/local storage
                console.log("Token removed from local storage");
                navigate("/home");  // Navigate to home after successful logout
            }
        } catch (error) {
            console.error("Error during logout:", error);
        } finally {
            console.log("Logout attempt completed");
        }
    }

    return (
        <li className="navbar-item">
            <Link className="navbar-link" onClick={handleLogout} to="#">
                Logout
            </Link>
        </li>
    );
}
>>>>>>> 7b843c5 (little bit of notification)

export default Logout;