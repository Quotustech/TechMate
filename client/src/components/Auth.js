import React, { useContext, useState, createContext, useEffect } from "react";
import jwt_decode from "jwt-decode";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);

  const token = localStorage.getItem("authToken");
  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwt_decode(token);
        if (decodedToken && decodedToken.userId) {
          const fetchedUserId = decodedToken.userId;
          setUserId(fetchedUserId);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [token]);

  const login = (token, fetchedUserId) => {
    setUser(token);
    setUserId(fetchedUserId);
    // console.log("Logged in user token:", token);
    localStorage.setItem("authToken", token);
  };

  const logout = () => {
    setUser(null);
    setUserId(null);
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider value={{ user, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
