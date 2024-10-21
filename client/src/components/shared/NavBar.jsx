import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";

function NavBar({ isLoggedIn, handleLogout, userType }) {
  const navigate = useNavigate();
  const handleLogoutAndNavigate = () => {
    handleLogout(); // Call the logout function
    navigate("/"); // Then navigate to the home page
  };
  return (
    <nav>
      <ul>
        <li>
          <Link className="navbar-link" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="navbar-link" to="/aboutus">
            About Us
          </Link>
        </li>
        {isLoggedIn ? (
          <>
            <li>
              <Link
                className="navbar-link"
                to={
                  userType === "employer"
                    ? "/employer-dashboard"
                    : "/job-seeker-dashboard"
                }
              >
                Dashboard
              </Link>
            </li>
            <li>
              <button onClick={handleLogoutAndNavigate}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link className="navbar-link" to="/register">
                Register
              </Link>
            </li>
            <li>
              <Link className="navbar-link" to="/login">
                Login
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
