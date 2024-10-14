import axios from "axios";
import { Link } from "react-router-dom";
import "./Logout.css";

function Logout({ removeToken }) {
    async function logout() {
        try {
            const response = await axios.post("http://localhost:5000/logout");
            
            if (response.status === 200) {
                removeToken();  // Call to remove token from local storage
                console.log("Token removed from local storage");
            }
        } catch (error) {
            console.error("Error during logout:", error);
        } finally {
            console.log("Logout attempt completed");
        }
    }

    return (
        <li className="navbar-item">
            <Link className="navbar-link" onClick={logout} to="/home">
                Logout
            </Link>
        </li>
    );
}

export default Logout;