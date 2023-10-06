import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./Auth";
import { useNavigate } from "react-router-dom";
import { MessageIcon } from "../icons";
import { FiLogOut } from "react-icons/fi";
import { Loader2, Menu, X } from "lucide-react";
import { useResponse } from "./ResponseContext";
import Cookies from "js-cookie";

const Sidebar = () => {
  const [questions, setQuestions] = useState([]);
  const [isNavShowing, setIsNavShowing] = useState(window.innerWidth > 768);
  const [isLoading, setIsLoading] = useState(false);

  const { userId } = useAuth();
  const { setResponseData } = useResponse();
  const navigate = useNavigate();
  const auth = useAuth();

  const apiUrl = process.env.REACT_APP_API_URL;

  const toggleSidebar = () => {
    if (window.innerWidth <= 768) {
      setIsNavShowing(!isNavShowing);
    }
  };

  useEffect(() => {
    if (userId) {
      axios
        .get(`${apiUrl}/allChat/${String(userId)}`)
        .then((response) => {
          const sortedQuestions = response.data.sort(
            (a, b) => b.timestamp - a.timestamp
          );
          setQuestions(sortedQuestions);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [userId, questions]);

  const handleQuestionSelect = (questionId) => {
    const selectedQuestion = questions.find(
      (question) => question._id === questionId
    );

    if (selectedQuestion) {
      setResponseData({
        question: selectedQuestion.question,
        response: selectedQuestion.answer,
      });

      if (window.innerWidth <= 768) {
        setIsNavShowing(false);
      }
    }
  };

  const handleLogout = () => {
    Cookies.remove("authToken");
    Cookies.remove("isLoggedIn");
    auth.logout();
    navigate("/login");
  };

  return (
    <>
      <div
        className={`h-screen  flex flex-col transition row-span-4 bg-gray-800 ease-in-out duration-300 ${
          isNavShowing
            ? "lg:w-full sm:w-[150%] md:w-[100%] sm:z-50 translate-x-0 opacity-100"
            : "w-0 sidebar -translate-x-full"
        }`}
      >
        <div className="text-white font-bold mt-2 p-2 sm:text-sm lg:text-lg">
          Previous ask questions:{" "}
        </div>

        <div className="flex-grow overflow-y-auto p-2">
          {isLoading ? (
            "loading"
          ) : (
            <nav className="text-white flex flex-col">
              <ul>
                {questions.map((data) => (
                  <li className="mb-2 pl-2 sm:pl-1" key={data._id}>
                    <p
                      className="flex items-center rounded-md p-2 focus:bg-slate-700 focus:font-bold hover:bg-slate-700 transform font-semibold cursor-pointer"
                      onClick={() => handleQuestionSelect(data._id)}
                    >
                      <span className="mr-3 sm:mr-1 text-white">
                        <MessageIcon />
                      </span>
                      <span className="text-white text-bold sm:text-sm lg:text-base flex  ">
                        {data.question.length > 25 ? (
                          <span>{data.question.substr(0, 25)} . . . </span>
                        ) : (
                          data.question
                        )}
                      </span>
                    </p>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
        <div className="py-3  bg-slate-500 hover:bg-slate-600  transform flex items-center justify-center ">
          <button
            className="text-white text-xl flex items-center justify-center"
            onClick={handleLogout}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center ">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
            ) : (
              <FiLogOut />
            )}
            <span className="mr-3"></span>
            <span className="font-bold sm:text-sm cursor-pointer lg:text-lg">
              Logout
            </span>
          </button>
        </div>
      </div>
      {window.innerWidth <= 768 && (
        <div
          className={`text-black mt-3 sm:z-30 sm:relative ${
            isNavShowing ? "ml-20  md:ml-2 lg:ml-0" : "ml-0"
          }`}
        >
          {isNavShowing ? (
            <X
              className="cursor-pointer sm:border shadow-xl  sm:ml-0 lg:hidden"
              size={30}
              onClick={toggleSidebar}
            />
          ) : (
            <Menu
              className="cursor-pointer sm:border shadow-xl sm:ml-3 lg:ml-0 sm:z-50 lg:hidden"
              size={30}
              onClick={toggleSidebar}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Sidebar;
