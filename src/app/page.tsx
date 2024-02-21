"use client";
import { useContext, useEffect, useState } from "react";
import { ApiKeyContext } from "@/contexts/apiKeyContext";
import Link from "next/link";

const Home = () => {
  const context = useContext(ApiKeyContext);
  const [openAiKey, setOpenAiKey] = useState("");

  const submitHandler = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (openAiKey != "") {
      context.setApiKey(openAiKey);
    } else {
      alert("Please enter an API key");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-r from-black to-gray-800 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-serif mb-12">
          Analyse complex PDFs using Retrival-Augmented Generation and OpenAI
        </h1>
        <div className="max-w-md mx-auto">
          <input
            onChange={(e) => {
              setOpenAiKey(e.target.value);
              console.log(openAiKey);
            }}
            type="text"
            className="block w-full border border-gray-400 p-2 mb-4 text-black rounded appearance-none"
            placeholder="Enter API Key"
          />
          <button
            type="submit"
            onClick={submitHandler}
            // href={"/chat"}
            className="bg-green-500 cursor-pointer text-white p-2 rounded-full inline-flex items-center"
          >
            <Link href={"/chat"}>
              Chat with PDF
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-4 h-4 ml-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </button>
        </div>
      </div>
    </main>
  );
};

export default Home;
