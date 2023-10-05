import React, { useState } from "react";
import Copy from "../icons/Copy";
import CodeBlock from "./CodeBlock";

const Response = (props) => {
  const { data } = props;
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = (codeContent) => {
    const textarea = document.createElement("textarea");
    textarea.value = codeContent;
    document.body.appendChild(textarea);
    textarea.select();

    try {
      document.execCommand("copy");
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
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
    <div className="flex  overflow-y-hidden  ">
      <div className="text-gray-800 sm:w-screen sm:px-2  rounded-lg  ">
        <div className=" overflow-y-hidden overflow-x-hidden">
          <div className="bg-gray-100 rounded-lg p-4 mb-2">
            <h2 className="text-xl font-semibold items-start sm:pl-2 sm:text-base">
              <span className="text-gray-500">Q:{"  "}</span>
              {data.question}
            </h2>
          </div>
          <div className="rounded-lg p-6 mb-2  bg-gray-100 max-h-[600px] max-w-[1200px] overflow-y-auto">
            <div id="output">
              {lines.map((line, index) => {
                if (line.startsWith("```")) {
                  if (inCodeBlock) {
                    const codeContent = codeSnippet.join("\n");
                    codeSnippet = [];

                    return (
                      <div key={index} className="relative">
                        <CodeBlock codeSnippet={codeContent} language="bash" />
                        <button
                          className="absolute top-0 right-0 m-2 p-2 bg-gray-800 text-white rounded"
                          onClick={() => handleCopyClick(codeContent)}
                          disabled={isCopied}
                        >
                          {isCopied ? "Copied" : <Copy />}
                        </button>
                      </div>
                    );

                    inCodeBlock = false;
                  } else {
                    inCodeBlock = true;
                  }
                } else if (inCodeBlock) {
                  codeSnippet.push(line);
                } else {
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
