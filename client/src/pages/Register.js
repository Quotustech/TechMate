import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import image from "../assets/ai.jpg";
import Swal from "sweetalert2";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      Swal.fire({
        icon: "error",
        title: "",
        text: "Please fill all the inputs",
      });
    }

    try {
      await axios.post(`${apiUrl}/register`, {
        name,
        email,
        password,
      });
      setError(""); // Clear error on successful submission
      console.log("successfully created");
      Swal.fire({
        icon: "success",
        title: "Successfully Registerd",
        text: "",
      });
      setName(""); // Clear input fields
      setEmail("");
      setPassword("");
      navigate("/login");
    } catch (err) {
      if (error.response && error.response.status === 500) {
        Swal.fire({
          icon: "error",
          title: "Sorry",
          text: "There is some issue in server.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops",
          text: "Something went wrong",
        });
      }
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-full md:w-3/5 flex items-center  justify-center p-8">
        <div className="absolute top-0 left-0 p-3 mt-1">
          <img
            className="pl-8 pt-7"
            src={require("./../components/images/TechMate3.png")}
            style={{ width: "200px", height: "auto" }}
            alt="TechMate Logo"
          />
        </div>
        <div className="bg-white p-8 ">
          <form onSubmit={handleSubmit} className="space-y-10 ">
            <div>
              <h3 className="sm:text-[29px] lg:text-4xl font-semibold  ">
                Register here
              </h3>
              <p className=" mt-3 ml-1 lg:text-base sm:text-sm text-gray-400">
                Please enter your details.{" "}
              </p>
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
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full p-2 border-b-2 focus:outline-none focus:bg-none"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-[#000000] text-white py-2 px-4 mt-2 rounded-md hover:bg-[#292429]"
            >
              Sign Up
            </button>
            <p className=" text-center text-base sm:text-base  text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#292429] sm:text-base hover:underline font-bold"
              >
                Please Login
              </Link>
            </p>
          </form>
        </div>
      </div>

      <div className="hidden md:block w-4/5 h-full bg-cover bg-center relative">
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
