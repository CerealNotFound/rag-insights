"use client";

import { useRef, useState, useContext, useEffect } from "react";
import Text from "@/components/Text";
import { DocContext } from "@/contexts/docContext";

const ChatWrapper = () => {
  const initialTexts = [
    {
      id: 1,
      text: "Ask a question to query the AI for the research paper",
      type: "sender",
    },
  ];

  const [texts, setTexts] = useState(initialTexts);

  const [newText, setNewText] = useState("");

  const textRef = useRef<HTMLInputElement>(null);

  let idTracker = texts[texts.length - 1].id + 1;
  const appendTexts = (text: string, type: string) => {
    setTexts((texts: any) => [
      ...texts,
      {
        id: idTracker,
        text: text,
        type: type,
      },
    ]);

    setNewText("");
    idTracker++;
  };

  const textHandler = async () => {
    if (textRef.current?.value != null) {
      const userQuery = textRef.current?.value;

      console.log(
        JSON.stringify({
          query: userQuery,
          id: "1",
        })
      );

      appendTexts(userQuery, "receiver");

      const response = await fetch("http://localhost:3000/api/retriever", {
        body: JSON.stringify({
          query: userQuery,
          pdf_id: "200511401",
        }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      console.log(result);

      const seqResponse = await fetch("http://localhost:3000/api/generator", {
        body: JSON.stringify({
          context: result,
          query: userQuery,
        }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const sequence = await seqResponse.json();
      console.log(sequence);
      appendTexts(sequence, "sender");
    }
  };

  return (
    <div className="flex flex-col justify-between w-10/12 h-full bg-black">
      {/* <div className="flex flex-row justify-between items-center p-4"></div> */}
      <div
        id="text-main-div"
        className="flex flex-col overflow-y-auto no-scrollbar p-4"
      >
        {texts.map((text) => {
          return <Text key={text.id} text={text.text} type={text.type} />;
        })}
      </div>
      <div className="flex flex-row justify-between w-10/12 items-center p-4">
        <input
          id="text-bar"
          placeholder="Type a message..."
          value={newText}
          ref={textRef}
          className="flex-1 bg-slate-800 text-white p-2 rounded-l-lg outline-none"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setNewText(e.target.value);
          }}
          onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key == "Enter") {
              textHandler();
            }
          }}
        />
        <div
          title="Send"
          className="bg-slate-800 text-white p-2 rounded-r-lg w-12 cursor-pointer"
          onClick={textHandler}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <g fill="none">
              <path d="M24 0v24H0V0h24ZM12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036c-.01-.003-.019 0-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.016-.018Zm.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01l-.184-.092Z" />
              <path
                fill="#699bf7"
                d="M20.235 5.686c.432-1.195-.726-2.353-1.921-1.92L3.709 9.048c-1.199.434-1.344 2.07-.241 2.709l4.662 2.699l4.163-4.163a1 1 0 0 1 1.414 1.414L9.544 15.87l2.7 4.662c.638 1.103 2.274.957 2.708-.241l5.283-14.605Z"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ChatWrapper;
