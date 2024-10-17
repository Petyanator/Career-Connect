import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import useAuth from "../../hooks/useAuth";
import Logout from "../auth/Logout";

function NavBar() {
  const navigate = useNavigate();
  const { user, authTokens } = useAuth();
  const isLoggedIn = !!authTokens;
  const userType = user?.type;

  const handleLogoutAndNavigate = () => {
    navigate("/");
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
              <p>Welcome, {user.username}</p> {/* Display welcome message */}
            </li>
            <li>
              <Logout handleLogout={handleLogoutAndNavigate} /> {/* Use Logout component */}
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