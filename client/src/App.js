import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import NoPage from "./components/NoPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useAuth } from "./components/Auth";

function App() {
  const auth = useAuth();
  const loggedIn = localStorage.getItem("isLoggedIn");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={loggedIn ? <Navigate to="/" /> : <Login />}
        />

        <Route
          path="/"
          element={loggedIn ? <Home /> : <Navigate to="/login" />}
        />

        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
