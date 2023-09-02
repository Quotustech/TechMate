import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Response from "../components/Response";
import Navbar from "../components/Navbar";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "../components/Auth";
import {
  CrossIcon,
  LoaderIcon,
  MicIcon,
  RightArrowIcon,
  SearchIcon,
} from "../icons";
import { Loader2 } from "lucide-react";

const HomePage = () => {
  const [inputValue, setInputValue] = useState("");
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const [isListening, setIsListenung] = useState(false);
  const [responceData, setResponceData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();

  // console.log("isListening", isListening)
  // console.log("inputValue1", inputValue);

  const handleStartListening = async () => {
    SpeechRecognition.startListening();
    setIsListenung(true);
  };

  const handleStopListening = () => {
    SpeechRecognition.stopListening();
    console.log("inputValue inside stop listen", inputValue);
    setIsListenung(false);
  };

  useEffect(() => {
    setInputValue(transcript);
  }, [transcript]);

  const url = "http://localhost:5000/chat";

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Clear the authToken from local storage
    auth.logout();
    navigate("/login");
  };

  return (
    <>
      <div className="relative h-[80vh] overflow-y-hidden overflow-x-auto row-span-7 col-span-7">
        {/* <img
          src="https://www.eweek.com/wp-content/uploads/2023/06/ew-what-is-ai-as-a-service.png"
          alt="Background"
          className="w-full object-cover"
        /> */}
        <div className="absolute inset-0 bg-[#FFFFFF] border-2 opacity-90">
          <div className="flex items-center justify-end p-5 absolute top-0 right-0">
            <button
              onClick={handleLogout}
              className="text-md flex items-center space-x-1 px-3 py-1 text-black bg-red-400 rounded-md font-bold hover:bg-red-300 dark:text-gray-400 dark:hover:text-white"
            >
              <span>
                <FiLogOut />
              </span>
              <span>Logout</span>
            </button>
          </div>

          <div className="flex justify-center h-screen  mt-8 ">
            <div className="max-w-5xl text-center ">
              <h2 className="text-5xl  font-bold font-serif text-white p-4 m-5 mt-1 ">
                TechMate
              </h2>

              {responceData === null ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-16">
                    <div className="p-4 bg-white border-2  rounded-lg">
                      <h2 className="text-2xl font-bold text-gray-800">
                        Examples
                      </h2>
                      <p className="mt-2 text-gray-600">
                        Explain quantum computing in simple terms.
                      </p>
                    </div>
                    <div className="p-4 bg-white border-2 rounded-lg">
                      <h2 className="text-2xl  font-bold  text-gray-800">
                        Capabilities
                      </h2>
                      <p className="mt-2 text-gray-600">
                        Remembers what user said earlier in the conversation.
                      </p>
                    </div>
                    <div className="p-4 bg-white  border-2 rounded-lg">
                      <h2 className="text-2xl  font-bold   text-gray-800">
                        Limitations
                      </h2>
                      <p className="mt-2 text-gray-600">
                        May occasionally generate incorrect information.
                      </p>
                    </div>
                    <div className="p-4 bg-white border-2 rounded-lg">
                      <p className="mt-2 text-gray-600">
                        How do I make an HTTP request in Javascript?.
                      </p>
                    </div>
                    <div className="p-4 bg-white  border-2 rounded-lg">
                      <p className="mt-2 text-gray-600">
                        This is a sample card description. You can replace this
                        with your content.
                      </p>
                    </div>
                    <div className="p-4 bg-white  border-2 rounded-lg">
                      <p className="mt-2 text-gray-600">
                        This is a sample card description. You can replace this
                        with your content.
                      </p>
                    </div>
                  </div>
                  <h2 className="text-xl font-serif text-gray-400 p-4 m-5 mt-2 md:mt-16">
                    Whether you're on the averge of launching your practical AI
                    application or exploring groundbreaking AI technologies, our
                    AI will help supercharge your brand. Find inspiration and
                    craft the perfect, professional logo to represent your AI
                    business—in just a few clicks.
                  </h2>
                </>
              ) : (
                <Response data={responceData} />
              )}
              {/* <div className="flex items-center p-5 ">
                <label className="sr-only">Search</label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <SearchIcon />
                  </div>

                  <input
                    type="text"
                    id="voice-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-4  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search ..."
                    required
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  {isListening === false ? (
                    <button
                      onClick={handleStartListening}
                      disabled={listening}
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                    >
                      <MicIcon />
                    </button>
                  ) : (
                    <button
                      onClick={handleStopListening}
                      disabled={!listening}
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                    >
                      <CrossIcon />
                    </button>
                  )}
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center py-4 px-3 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={onSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center ">
                      <Loader2 className="w-8 h-8 animate-spin" />
                    </div>
                  ) : (
                    <RightArrowIcon />
                  )}
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
