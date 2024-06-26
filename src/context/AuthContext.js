import React, { createContext, useContext, useState } from "react";

// Create a context for authentication
const AuthContext = createContext();

// Custom hook to use the authentication context
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to manage authentication state
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // Function to handle login
  const login = () => {
    console.log("called===")
    // Perform login logic (e.g., check credentials, set isAuthenticated to true)
    setIsAuthenticated(true);
  };

  // Function to handle logout
  const logout = () => {
    // Perform logout logic (e.g., clear session, set isAuthenticated to false)
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
