import React, { createContext, useContext, useEffect, useState } from "react";
import { AUTH_LOGOUT_EVENT, AUTH_STORAGE_KEY } from "../constants/auth.js";

const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem(AUTH_STORAGE_KEY) === "true";
  });

  useEffect(() => {
    localStorage.setItem(AUTH_STORAGE_KEY, String(isAuthenticated));
  }, [isAuthenticated]);

  useEffect(() => {
    const handleForcedLogout = () => {
      setIsAuthenticated(false);
      if (typeof window !== "undefined" && window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    };

    window.addEventListener(AUTH_LOGOUT_EVENT, handleForcedLogout);
    return () => window.removeEventListener(AUTH_LOGOUT_EVENT, handleForcedLogout);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
