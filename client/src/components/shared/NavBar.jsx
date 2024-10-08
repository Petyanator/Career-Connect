import { Link } from "react-router-dom";
import "./NavBar.css";
// import { useState, useEffect } from "react";
// import UserToken from "./UserToken";
// import Logout from "./Logout";

function NavBar() {
  //   const [isAuthenticated, setIsAuthenticated] = useState(false);
  //   const { token, removeToken } = UserToken();

  //   useEffect(() => {
  //     if (token) {
  //       setIsAuthenticated(true);
  //     } else {
  //       setIsAuthenticated(false);
  //     }
  //   }, [token]);
  return (
    <>
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

            {/* {isAuthenticated && <Logout removeToken={removeToken} />} */}
          </ul>
        </nav>
      </div>
    </>
  );
}

export default NavBar;
