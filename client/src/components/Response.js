import React from "react";

const Response = (props) => {
  const { data } = props;

  const lines = data.response.split("\n");

  return (
    <div className="flex flex-col lg:flex-row mt-1 mx-2 lg:mx-8 p-2 lg:p-4">
      <div className="bg-gray-100 text-gray-800 rounded-lg overflow-hidden">
        <div className="flex justify-between m-2 p-2">
          <p className="text-xl font-serif">Search result:</p>
        </div>
        <div className="max-w-screen-lg mx-auto p-4">
          <div className="bg-gray-200 rounded-lg p-4 mb-2">
            <h2 className="text-xl font-semibold items-start  mb-2">
              Q: {data.question}
            </h2>
          </div>
          <div className="rounded-lg p-6 mb-4 bg-gray-300 max-h-96 overflow-y-auto">
            <p className="text-gray-700 items-start">Ans:</p>
            <div id="output">
              {lines.map((line, index) => (
                <p key={index} className="items-start">
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Response;
