import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeBlock = ({ codeSnippet, language }) => {
  return (
    <div className="bg-gray-800 p-2 mb-3 rounded-md">
      <SyntaxHighlighter language={language} style={coldarkDark}>
        {codeSnippet}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
