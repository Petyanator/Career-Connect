import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.scss";

function NavBar({ isLoggedIn, handleLogout, userType }) {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) { // Adjust the scroll threshold as needed
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogoutAndNavigate = () => {
    handleLogout(); // Call the logout function
    navigate("/"); // Then navigate to the home page
  };

  return (
    <nav className={scrolled ? "navbar-scrolled" : ""}>
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
