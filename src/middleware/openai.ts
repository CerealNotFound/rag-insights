import { OpenAI } from "langchain/llms/openai";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing OpenAI Cedentials");
}

export const openai = new OpenAI({
  temperature: 0,
});
