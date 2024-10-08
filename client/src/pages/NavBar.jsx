import { Link } from "react-router-dom";
import "./NavBar.css";
import { useEffect, useState } from "react";
import Login from "../components/auth/Login.jsx";
import UserToken from "../components/Token/UserToken.jsx";



function NavBar() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const {token, removeToken, setToken } = UserToken();

    useEffect(() => {
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, [token]);
    return (
        <div className="navbar-container">
        <nav>
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/register" className="nav-link">Register</Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">Login</Link>
            </li>
            {isAuthenticated && <Logout removeToken={removeToken} />}
          </ul>
        </nav>
      </div>
    );
  }
  
  export default NavBar;