import { OpenAI } from "langchain/llms/openai";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { context, query } = await req.json();

  const model = new OpenAI({
    modelName: "gpt-3.5-turbo-instruct",
    temperature: 0.7,
  });

  try {
    const sequence = await model.call(
      `Answer the question based on the context you have been given. Do not answer if you do not know the answer.
    
        Context: ${context}
    
        Question: ${query}`
    );

    return new NextResponse(JSON.stringify(sequence), { status: 200 });
  } catch {
    (err: any) => {
      return new NextResponse(
        JSON.stringify(
          `Unknown error occured while generating sequence: ${err}`
        ),
        { status: 500 }
      );
    };
  }
};
