import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import image from "../assets/ai.jpg";

const Register = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(apiUrl, "----------");
      await axios.post(`${apiUrl}/register`, {
        name,
        email,
        password,
      });
      setError(""); // Clear error on successful submission
      console.log("successfully created");
      toast.success("User Registered Successfully");
      setName(""); // Clear input fields
      setEmail("");
      setPassword("");
      navigate("/login");
    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else if (err.message) {
        setError(err.message);
      }
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-full md:w-2/5 flex items-center outline justify-center p-10">
        <div className="bg-white p-10 ">
          <form onSubmit={handleSubmit} className="space-y-9 outline">
            <div>
              <h3 className="text-4xl  font-semibold mr-16 mb-2 p-2">
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
                value={name}
                onChange={(e) => setName(e.target.value)}
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
