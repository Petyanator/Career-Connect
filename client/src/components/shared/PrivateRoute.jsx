import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const PrivateRoute = ({ children, allowedUserType }) => {
  const { user, authTokens } = useContext(AuthContext);

  if (!authTokens || !user) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }

  if (allowedUserType && user.user_type !== allowedUserType) {
    // If the user type does not match the allowed type, redirect to home or another page
    return <Navigate to="/" />;
  }

  // If authenticated and user type matches (or no specific type is required), render the children components
  return children;
};

export default PrivateRoute;