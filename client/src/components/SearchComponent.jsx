import React, { useEffect, useState, useCallback } from "react";
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
import Response from "./Response";
import { useResponse } from "./ResponseContext";
import { useAuth } from "./Auth";

const SearchComponent = () => {
  const [inputValue, setInputValue] = useState("");
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useAuth();

  const apiUrl = process.env.REACT_APP_API_URL;

  const { responseData, setResponseData } = useResponse();

  const handleStartListening = async () => {
    console.log("listening function is working now")
    SpeechRecognition.startListening();
    setIsListening(true);
  };

  const handleStopListening = () => {
    SpeechRecognition.stopListening();
    setIsListening(false);
  };
  const url = `${apiUrl}/chat`;

  useEffect(() => {
    setInputValue(transcript);
  }, [transcript]);

  const onSubmit = useCallback(() => {
    if (!inputValue) {
      Swal.fire({
        icon: "error",
        title: "Please enter something.",
        text: "",
      });
    } else {
      setIsLoading(true);
      setIsListening(false);
      axios
        .post(
          url,
          { message: inputValue, userId: userId },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        )
        .then((res) => {
          setResponseData(res.data);
          setInputValue("");
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 401) {
              console.log(error, "error");
              Swal.fire({
                icon: "error",
                title: "Unauthorized",
                text: "Please log in again.",
              });
            } else if (error.response.status === 429) {
              console.log(error, "error");
              Swal.fire({
                icon: "error",
                title: "Too Many Requests",
                text: "You have exceeded the request limit. Please try again later.",
              });
            } else {
              console.log(error, "error");
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "An error occurred. Please try again later.",
              });
            }
          } else {
            console.error("Error:", error);
          }
        })

        .finally(() => {
          setIsLoading(false);
        });
    }
  });

  useEffect(() => {
    if (!listening && transcript !== "") {
      // Call the submit function when listening ends and there's a transcript
      onSubmit();
      resetTranscript(); // Optional: Clear the transcript if needed
    }
  }, [listening, transcript, onSubmit, resetTranscript]);

  return (
    <div className="row-span-1 h-[20vh] col-span-12 top-0">
      <div className="flex justify-center items-center mt-5 ml-20 mr-20 p-10">
        <label className="sr-only">Search</label>
        <div className="relative w-[70%]">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SearchIcon />
          </div>

          <input
            type="text"
            id="voice-search"
            className="bg-gray-50 border dark:bg-white  border-gray-300 text-gray-900 shadow-lg text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-4  dark:text-black dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
              className="absolute inset-y-0 right-0 flex items-cbenter pr-3"
            >
              <CrossIcon />
            </button>
          )}
        </div>
        <button
          type="submit"
          className="inline-flex items-center py-3 px-6 ml-2 mr-30  text-sm font-medium shadow-lg text-white bg-white rounded-lg border  hover:bg-custom-blue focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={onSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center ">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          ) : (
            <div className="text-gray-700">

              <RightArrowIcon />
            </div>
          )}
        </button>
        {/* {responseData && <Response data={responseData} />} */}
      </div>
    </div>
  );
};

export default SearchComponent;