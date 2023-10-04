import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import image from "../assets/ai.jpg";
import { useAuth } from "../components/Auth";
// import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import { Loader2, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const apiUrl = process.env.REACT_APP_API_URL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!email || !password) {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid Credential",
      });
    }
    try {
      const response = await axios.post(`${apiUrl}/login`, {
        email,
        password,
      });
      const token = response.data.token;
      // console.log(response.data, "login user data");
      localStorage.setItem("authToken", token);
      localStorage.setItem("isLoggedIn", true);

      auth.login(token);
      setLoading(false);
      Swal.fire({
        icon: "success",
        title: "Welcome to TechMate",
        text: "",
      });
      navigate("/");
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 500) {
        Swal.fire({
          icon: "error",
          title: "Sorry",
          text: "There is some issue in server.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Invalid Credential",
        });
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex h-screen">
      <div className="w-full md:w-3/5 flex items-center justify-center p-8">
        <div className="absolute top-0 left-0 p-3 mt-1">
          <img
            className="pl-8 pt-7"
            src={require("./../components/images/TechMate3.png")}
            style={{ width: "200px", height: "auto" }}
            alt="TechMate Logo"
          />
        </div>
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
                style={{
                  "--placeholder-color": "none",
                }}
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
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center bg-[#000000] text-white py-2 px-4 mt-2 rounded-md hover:bg-[#292429]"
              >
                Login
                {loading && <Loader2 className="ml-4 w-6 h-6 animate-spin" />}
              </button>
              <p className="text-center text-base sm:text-base  text-gray-400">
                Don't have an account?{"  "}
                <Link
                  to="/register"
                  className="text-[#292429] hover:underline font-bold"
                >
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
