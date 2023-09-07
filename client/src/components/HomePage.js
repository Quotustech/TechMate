import React from "react";

import Response from "../components/Response";
import { useAuth } from "../components/Auth";
import { useResponse } from "../components/ResponseContext";

const HomePage = () => {
  // const [responseData, setResponseData] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);
  const { responseData, setResponseData } = useResponse();

  return (
    <>
      <div className="relative h-[80vh] overflow-y-hidden overflow-x-auto row-span-8 col-span-12">
        {/* <img
          src="https://www.eweek.com/wp-content/uploads/2023/06/ew-what-is-ai-as-a-service.png"
          alt="Background"
          className="w-full object-cover"
        /> */}
        <div className="absolute inset-0 bg-[#FFFFFF] border opacity-90">
          {/* <div className="flex items-center justify-end p-5 absolute top-0 right-0">
            <button
              onClick={handleLogout}
              className="text-md flex items-center space-x-1 px-3 py-1 text-black bg-red-400 rounded-md font-bold hover:bg-red-300 dark:text-gray-400 dark:hover:text-white"
            >
              <span>
                <FiLogOut />
              </span>
              <span>Logout</span>
            </button>
          </div> */}

          <div className="flex justify-center h-screen  mt-8 ">
            <div className="max-w-5xl text-center ">
              <h2 className="text-5xl  font-bold font-serif text-black p-4 m-5 mt-1 ">
                TechMate
              </h2>

              {responseData === null ? (
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
                <Response data={responseData} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
