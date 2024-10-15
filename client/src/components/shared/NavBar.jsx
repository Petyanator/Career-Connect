import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar({ token, onLogout }) {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/" className="navbar-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/aboutus" className="navbar-link">
              About Us
            </Link>
          </li>
          {token ? ( // If token exists, show logout and profile
            <>
              <li>
                <Link to="/profile" className="navbar-link">
                  Profile
                </Link>
              </li>
              <li>
                <button onClick={onLogout} className="navbar-link">
                  Logout
                </button>
              </li>
            </>
          ) : (
            // If no token, show register and login
            <>
              <li>
                <Link to="/register" className="navbar-link">
                  Register
                </Link>
              </li>
              <li>
                <Link to="/login" className="navbar-link">
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
