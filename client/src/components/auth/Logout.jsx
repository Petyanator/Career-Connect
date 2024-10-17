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

export default Logout;