import { useState, useEffect } from "react";

function useToken() {
  // Get the initial token from local storage
  const getToken = () => localStorage.getItem("token");

  // Initialize state with the token from local storage
  const [token, setTokenState] = useState(getToken());

  // Update local storage and state when the token changes
  const setToken = (userToken) => {
    if (userToken) {
      localStorage.setItem("token", useToken); // Store token in local storage
    } else {
      localStorage.removeItem("token"); // Remove token from local storage if null
    }
    setTokenState(useToken); // Update the state
  };

  // Optional: useEffect to synchronize state with local storage
  useEffect(() => {
    const currentToken = getToken();
    if (currentToken !== token) {
      setTokenState(currentToken);
    }
  }, []); // Runs only once when the component mounts

  return {
    token,
    setToken,
  };
}

export default useToken;
