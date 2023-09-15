import React, { createContext, useContext, useState } from "react";

const ResponseContext = createContext();

export function ResponseProvider({ children }) {
  const [responseData, setResponseData] = useState(null);

  return (
    <ResponseContext.Provider value={{ responseData, setResponseData }}>
      {children}
    </ResponseContext.Provider>
  );
}

// Create a custom hook to access the context
export function useResponse() {
  const context = useContext(ResponseContext);
  if (!context) {
    throw new Error("useResponse must be used within a ResponseProvider");
  }
  return context;
}
