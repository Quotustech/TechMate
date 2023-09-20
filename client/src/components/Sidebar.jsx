import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./Auth";
import { useNavigate } from "react-router-dom";
import { MessageIcon } from "../icons";
import { useResponse } from "./ResponseContext";
import { FiLogOut } from "react-icons/fi";

const Sidebar = () => {
  const [questions, setQuestions] = useState([]);
  const { userId } = useAuth();
  const { setResponseData } = useResponse();
  const apiUrl = process.env.REACT_APP_API_URL;


  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    if (userId) {
      axios
        .get(`${apiUrl}/allChat/${String(userId)}`)
        .then((response) => {
          setQuestions(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [userId]);

  // const filteredQuestions = questions.filter(
  //   (question) => question.user === userId
  // );
  const handleQuestionSelect = (questionId) => {
    const selectedQuestion = questions.find(
      (question) => question._id === questionId
    );

    setResponseData([selectedQuestion.question, selectedQuestion.answer]);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("isLoggedIn");
    auth.logout();
    navigate("/login");
  };

  return (
    <>
      <div className="h-screen flex flex-col row-span-2 bg-gray-800">
        <div className="text-white font-bold mt-2 p-2">
          Previous ask questions :
        </div>
        <div className="flex-grow overflow-y-auto p-2">
          <nav className="text-white flex flex-col">
            <ul>
              {questions.map((data) => (
                <li className="mb-2 pl-2" key={data._id}>
                  <p
                    className="flex items-center rounded-md p-2 focus:bg-slate-700 focus:font-bold hover:bg-slate-700 transform font-semibold cursor-pointer"
                    onClick={() => handleQuestionSelect(data._id)}
                  >
                    <span className="mr-3">
                      <MessageIcon />
                    </span>
                    <span>{data.question}</span>
                  </p>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="py-3  bg-slate-600 hover:bg-slate-500 flex items-center justify-center ">
          <button
            className="text-white text-xl flex items-center justify-center"
            onClick={handleLogout}
          >
            <span className="mr-3">
              <FiLogOut />
            </span>
            <span className="font-bold ">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
