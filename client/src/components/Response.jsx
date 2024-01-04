import React, { useState } from "react";
import Copy from "../icons/Copy";
import CodeBlock from "./CodeBlock";

const Response = (props) => {
  const { data } = props;
  const [copiedStates, setCopiedStates] = useState([]);

  const handleCopyClick = (codeContent, index) => {
    const textarea = document.createElement("textarea");
    textarea.value = codeContent;
    document.body.appendChild(textarea);
    textarea.select();

    try {
      document.execCommand("copy");
      const updatedStates = [...copiedStates];
      updatedStates[index] = true;
      setCopiedStates(updatedStates);

      setTimeout(() => {
        const resetStates = [...copiedStates];
        resetStates[index] = false;
        setCopiedStates(resetStates);
      }, 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    } finally {
      document.body.removeChild(textarea);
    }
  };

  if (!data) {
    return null;
  }

  const lines = data.response ? data.response.split("\n") : [];

  let inCodeBlock = false;
  let codeSnippet = [];

  return (
    <div className="flex  overflow-y-scroll  ">
      <div className="text-gray-800 sm:w-screen sm:px-2  rounded-lg  ">
        <div className=" overflow-y-hidden overflow-x-hidden">
          <div className="bg-[#F3F4F6] rounded-lg p-4 mb-2">
            <h2 className="text-xl font-semibold items-start sm:pl-2 sm:text-base">
              <span className="text-gray-500">{"  "}</span>
              {data.question}
            </h2>
          </div>
          <div className="rounded-lg p-6 mb-2  bg-[#F3F4F6]   max-h-[600px] max-w-[1200px] overflow-y-auto">
            <div id="output">
              {lines.map((line, index) => {
                if (line.startsWith("```") && !inCodeBlock) {
                  // Start of a code block
                  inCodeBlock = true;
                  codeSnippet = [];
                } else if (line.startsWith("```") && inCodeBlock) {
                  // End of a code block
                  inCodeBlock = false;
                  const codeContent = codeSnippet.join("\n");

                  return (
                    <div key={index} className="relative">
                      <CodeBlock codeSnippet={codeContent} language="bash" />
                      <button
                        className="absolute top-0 right-0 m-2 p-2 bg-gray-800 text-white rounded"
                        onClick={() => handleCopyClick(codeContent, index)}
                        disabled={copiedStates[index]}
                      >
                        {copiedStates[index] ? "Copied" : <Copy />}
                      </button>
                    </div>
                  );
                } else if (inCodeBlock) {
                  // Inside a code block
                  codeSnippet.push(line);
                } else {
                  // Outside a code block
                  return (
                    <p
                      key={index}
                      className="flex flex-start items-start font-semibold lg:py-2 sm:py-1 sm:text-base"
                    >
                      {line}
                    </p>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Response;
