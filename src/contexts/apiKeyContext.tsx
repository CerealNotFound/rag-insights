"use client";

import { createContext, useState } from "react";

export const ApiKeyContext = createContext({
  apiKey: "",
  setApiKey: (apiKey: string) => {},
});

export const ApiKeyProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [apiKey, setApiKey] = useState("");

  return (
    <ApiKeyContext.Provider value={{ apiKey, setApiKey }}>
      {children}
    </ApiKeyContext.Provider>
  );
};
