import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Parse localStorage values safely with fallback to null
  const [authTokens, setAuthTokens] = useState(() => {
    const tokenString = localStorage.getItem("token");
    try {
      return tokenString ? JSON.parse(tokenString) : null;
    } catch {
      return null; // In case invalid JSON is in storage
    }
  });

  const [user, setUser] = useState(() => {
    const userString = localStorage.getItem("user");
    try {
      return userString ? JSON.parse(userString) : null;
    } catch {
      return null; // In case invalid JSON is in storage
    }
  });

  const login = (data) => {
    setAuthTokens({ token: data.access_token });
    setUser(data.user);
    localStorage.setItem("token", JSON.stringify({ token: data.access_token }));
    localStorage.setItem("user", JSON.stringify(data.user));
  };

  const logout = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  useEffect(() => {
    const syncAuth = (event) => {
      if (event.key === "token") {
        setAuthTokens(event.newValue ? JSON.parse(event.newValue) : null);
      }
      if (event.key === "user") {
        setUser(event.newValue ? JSON.parse(event.newValue) : null);
      }
    };

    window.addEventListener("storage", syncAuth);

    return () => {
      window.removeEventListener("storage", syncAuth);
    };
  }, []);

  const contextData = {
    user,
    authTokens,
    login,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
};