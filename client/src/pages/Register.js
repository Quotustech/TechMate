import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import image from "../assets/login.jpg";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/v1/auth/register", { username, email, password });
      toast.success("User Register Successfully");
      navigate("/app/login");
    } catch (err) {
      if (err.response.data.error) {
        setError(err.response.data.error);
      } else if (err.message) {
        setError(err.message);
      }
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-full md:w-3/5 flex items-center justify-center p-8">
        <div className="bg-white p-8 ">
          {error && (
            <div className="mb-4">
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                {error}
              </div>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-9 ">
            <div>
              <h3 className="text-4xl  font-semibold mr-16 mb-2">
                Register here
              </h3>
              <p className=" ml-2 text-gray-400">Please enter your details. </p>
            </div>
            <div className="flex flex-col space-y-6">
              <input
                type="text"
                required
                className="w-full p-2 border-b-2 focus:outline-none focus:bg-none"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="email"
                required
                className="w-full p-2 border-b-2 focus:outline-none focus:bg-none"
                placeholder="Email"
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
            </div>
            <button
              type="submit"
              className="w-full bg-[#000000] text-white py-2 px-4 rounded-md hover:bg-[#292429]"
            >
              Sign Up
            </button>
            <p className=" text-center text-xs text-gray-400">
              Already have an account?{"   "}
              <Link to="/login" className="text-[#292429] hover:underline">
                Please Login
              </Link>
            </p>
          </form>
        </div>
      </div>

      <div className="hidden md:block w-3/5 h-full bg-cover bg-center relative">
        <img
          src={image}
          alt="register"
          className="absolute inset-0 w-full h-full object-cover opasity-90"
        />
      </div>
    </div>
  );
};

export default Register;
