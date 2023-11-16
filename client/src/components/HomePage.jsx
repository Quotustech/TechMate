import React from "react";
import Response from "./Response";
import { useResponse } from "./ResponseContext";
// import SearchComponent from "./SearchComponent";

const HomePage = () => {
  // const [responseData, setResponseData] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);
  const { responseData, setResponseData } = useResponse();

  return (
    <>
      <div className="relative sm:h-[80vh] lg:h-[85vh] lg:mt-10  row-span-8 col-span-12   sm:p-2 lg:overflow-y-hidden sm:overflow-y-auto">
        <div className="absolute inset-0 bg-[#FFFFFF]  opacity-90">
          <div className="flex justify-center h-screen  ">
            <div className="max-w-5xl  ">
              <div className="   lg:w-[30%] lg:ml-72 sm:w-[50%]  md:w-[35%] md:justify-center md:text-center sm:pl-1  sm:ml-20 sm:my-2  flex justify-center items-center">
                <img
                  src={require("./images/TechMate3.png")}
                  alt="TechMate logo"
                />
              </div>

              {responseData === null ? (
                <>
                  <div className="grid grid-cols-1 overflow-hidden sm:grid-cols-1 sm:p-3 md:grid-cols-3  lg:mt-10 gap-5 mt-1">
                    <div className="p-4 bg-white border-2  rounded-lg">
                      {/* <h1 className="lg:hidden sm:block">Examples</h1> */}
                      <h2 className="text-2xl font-bold text-gray-800 ">
                        Prompts
                      </h2>
                      <p className="mt-2 text-gray-600">
                        Explain quantum computing in simple terms.
                      </p>
                    </div>
                    <div className="p-4 bg-white border-2 rounded-lg">
                      <h2 className="text-2xl  font-bold  text-gray-800 ">
                        Capabilities
                      </h2>
                      <p className="mt-2 text-gray-600">
                        Remembers what user said earlier in the conversation.
                      </p>
                    </div>
                    <div className="p-4 bg-white  border-2 rounded-lg">
                      <h2 className="text-2xl  font-bold   text-gray-800 ">
                        Limitations
                      </h2>
                      <p className="mt-2 text-gray-600">
                        May occasionally generate incorrect information.
                      </p>
                    </div>
                    <div className="p-4 bg-white border-2 rounded-lg sm:hidden lg:block">
                      <p className="mt-2 text-gray-600">
                        How do I make an HTTP request in Javascript?.
                      </p>
                    </div>
                    <div className="p-4 bg-white  border-2 rounded-lg">
                      <p className="mt-2 text-gray-600">
                        With our AI's exceptional memory, you can pick up right
                        where you left off. No need to start over or explain
                        your context repeatedly.
                      </p>
                    </div>
                    <div className="p-4 bg-white  border-2 rounded-lg">
                      <p className="mt-2 text-gray-600">
                        The AI's responses can sometimes lack the nuances and
                        subtleties of human communication, which can impact the
                        interpretation of certain questions and responses.
                      </p>
                    </div>
                  </div>
                  <h2 className="text-xl  text-gray-500 p-4 m-5 mt-2 sm:hidden  lg:block md:mt-10">
                    At <strong>Techmate</strong>, we understand the unique
                    challenges and questions that technical and computer science
                    students face every day. That's why we've developed a
                    powerful AI system that's tailor-made to assist you in your
                    quest for knowledge and success.
                  </h2>
                 
                </>
              ) : (
                <Response data={responseData} />
              )}
            </div>
          </div>
        </div>
      </div>
      <div>{/* <SearchComponent/> */}</div>
    </>
  );
};

export default HomePage;
