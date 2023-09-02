import React from "react";
import { Navigate } from "react-router-dom"; // Import the Navigate component
import { useAuth } from "./Auth";

const ProtectedRoute = ({ children, redirectPath }) => {
  const auth = useAuth();

  return auth.user ? children : <Navigate to={redirectPath} />;
};

export default ProtectedRoute;
