import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import image from "../assets/ai.jpg";
import { useAuth } from "../components/Auth";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const apiUrl = process.env.REACT_APP_API_URL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      return navigate("/login");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }
    try {
      const response = await axios.post(`${apiUrl}/login`, {
        email,
        password,
      });
      const token = response.data.token;

      // Save the token to localStorage
      localStorage.setItem("authToken", token);

      auth.login(token);
      toast.success("Login successful");
      navigate("/app");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="flex h-screen">
      <div className="w-full md:w-3/5 flex items-center justify-center p-8">
        <div className="bg-white p-8 ">
          <form onSubmit={handleSubmit} className="space-y-9 ">
            <div>
              <h3 className="text-4xl  font-semibold mb-4">
                Welcome back <span>👋</span>
              </h3>
              <p className=" ml-2 text-gray-400">Please enter your details. </p>
            </div>
            <div className="flex flex-col space-y-6">
              <input
                type="email"
                required
                className="w-full p-2 border-b-2 focus:outline-none focus:bg-none"
                placeholder="Email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                required
                className="w-full p-2 border-b-2 focus:outline-none focus:bg-none"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="submit"
                className="w-full bg-[#000000] text-white py-2 px-4 mt-2 rounded-md hover:bg-[#292429]"
              >
                Log In
              </button>
              <p className="text-center text-xs text-gray-400">
                Don't have an account?
                <Link to="/register" className="text-[#292429] hover:underline">
                  Please Register
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <div className="hidden md:block w-4/5 h-full bg-cover bg-center relative">
        <img
          src={image}
          alt="login"
          className="absolute inset-0 w-full h-full object-cover "
        />
      </div>
    </div>
  );
};

export default Login;

{
  /* {errorMessage && (
            <div className="mb-4">
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                {errorMessage}
              </div>
            </div>
          )} */
}
