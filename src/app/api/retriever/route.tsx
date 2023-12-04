import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { supabaseClient } from "@/middleware/supabase";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { query } = await req.json();
  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY as string,
  });

  const store = new SupabaseVectorStore(embeddings, {
    client: supabaseClient,
    tableName: "documents",
    queryName: "match_documents",
  });

  try {
    const tableDoc = await store.similaritySearch(query, 1, {
      source: "src/arg_doc/rag-research.pdf",
    });

    const response = tableDoc[0].pageContent.replace(/\n/g, "");

    return new NextResponse(JSON.stringify(response));
  } catch (err: any) {
    console.error(`Error occurred while performing similarity search: ${err}`);
    return new NextResponse(
      JSON.stringify(
        `Error occurred while performing similarity search: ${err}`
      )
    );
  }
};
