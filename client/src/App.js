import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import NoPage from "./components/NoPage";
import Responce from "./components/Responce";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if the user is authenticated on app load
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // A protected route component that redirects to login if not authenticated
  const ProtectedRoute = ({ element, ...props }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    return React.cloneElement(element, props);
  };

  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/app" element={<ProtectedRoute element={<Home />} />} />
    </Routes>
  );
}

export default App;
