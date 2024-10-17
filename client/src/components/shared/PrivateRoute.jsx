import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function PrivateRoute({ children }) {
  const { user } = useAuth(); // Use the custom useAuth hook for consistency

  return user ? children : <Navigate to="/login" />;
}

export default PrivateRoute;