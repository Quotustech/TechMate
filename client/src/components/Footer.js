import React, { useState } from "react";
import {
  CrossIcon,
  LoaderIcon,
  MicIcon,
  RightArrowIcon,
  SearchIcon,
} from "../icons";
import { Loader2 } from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
const Footer = () => {
  const [inputValue, setInputValue] = useState("");
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const [isListening, setIsListenung] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [responceData, setResponceData] = useState(null);

  const handleStartListening = async () => {
    SpeechRecognition.startListening();
    setIsListenung(true);
  };

  const handleStopListening = () => {
    SpeechRecognition.stopListening();
    console.log("inputValue inside stop listen", inputValue);
    setIsListenung(false);
  };
  const url = "http://localhost:5000/chat";

  const onSubmit = () => {
    if (!inputValue) {
      console.log("Please enter something");
    } else {
      setIsLoading(true);
      setIsListenung(false);
      axios
        .post(
          url,
          { message: inputValue, userId: "64e6f0ab9aad195babb4e39f" },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        )
        .then((res) => {
          setResponceData(res.data);
          console.log("The response data------", res.data.question);
          setInputValue("");
        })
        .catch((error) => {
          console.error("Error---:", error);

          // Display an error message using SweetAlert2
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "An error occurred. Please try again later.",
          });
        })
        .finally(() => {
          setIsLoading(false); // Set isLoading to false after the API call completes
        });
    }
  };

  return (
    <div className=" row-span-2 h-[20vh] col-span-7  top-0">
      <div className="flex justify-center items-center   mt-5 ml-20 mr-20 p-10">
        <label className="sr-only">Search</label>
        <div className="relative w-[70%]">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SearchIcon />
          </div>

          <input
            type="text"
            id="voice-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 shadow-lg text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-4  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
          className="inline-flex items-center py-3 px-3 mr-30  text-sm font-medium shadow-lg text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
      </div>
    </div>
  );
};

export default Footer;
