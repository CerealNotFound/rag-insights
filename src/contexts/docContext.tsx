"use client";

import React, { createContext, useContext, useState } from "react";

export const DocContext = createContext({
  doc: "",
  setDoc: (pdfId: string) => {},
});

export const DocProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [doc, setDoc] = useState("");

  return (
    <DocContext.Provider value={{ doc, setDoc }}>
      {children}
    </DocContext.Provider>
  );
};
