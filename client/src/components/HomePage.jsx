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
      <div className="relative sm:h-[80vh] lg:h-[85vh] lg:mt-10 overflow-y-hidden  overflow-x-auto row-span-8 col-span-12   sm:p-2 sm:overflow-y-auto">
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
                  <div className="grid grid-cols-1  sm:grid-cols-1 sm:p-3 md:grid-cols-3  lg:mt-10 gap-5 mt-1">
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
                  <h2 className="text-xl font-serif text-gray-400 p-4 m-5 mt-2 md:mt-10">
                    Whether you're on the averge of launching your practical AI
                    application or exploring groundbreaking AI technologies, our
                    AI will help supercharge your brand. Find inspiration and
                    craft the perfect, professional logo to represent your AI
                    business—in just a few clicks.
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
