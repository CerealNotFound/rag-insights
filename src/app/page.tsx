"use client";
import { useRef, useContext, useEffect } from "react";
import { DocContext } from "@/contexts/docContext";
import Link from "next/link";

const Home = () => {
  const context = useContext(DocContext);
  useEffect(() => {
    context.setDoc("1234");
  }, []);
  console.log(context);
  const menuRef = useRef<HTMLSelectElement>(null);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log(menuRef.current?.value);

    if (menuRef.current?.value == "rag") {
      context.setDoc("123244: metaaa");
      console.log(context);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-r from-black to-gray-800 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-serif mb-12">
          Analyse complex PDFs using Retrival-Augmented Generation and OpenAI
        </h1>
        <div className="max-w-md mx-auto">
          <select
            className="block w-full border border-gray-400 p-2 mb-4 text-black rounded appearance-none"
            placeholder="Select research paper"
            ref={menuRef}
          >
            <option value={""}>Select a Research</option>
            <option value="rag">
              Meta: Retrieval-Augmented Generation for Knowledge-Intensive NLP
              Tasks
            </option>
          </select>
          <Link
            href={"/chat"}
            className="bg-green-500 cursor-pointer text-white p-2 rounded-full inline-flex items-center"
          >
            Chat with PDF
            <button type="submit" />
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
        </div>
      </div>
    </main>
  );
};

export default Home;
