import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { createClient } from "@supabase/supabase-js/dist/module";
import { NextResponse } from "next/server";

export const GET = async () => {
  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.SUPABASE_PRIVATE_KEY as string
  );

  const loader = new PDFLoader("src/arg_doc/rag-research.pdf");
  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY as string,
  });

  const docs = await loader.load();
  try {
    const store = new SupabaseVectorStore(embeddings, {
      client,
      tableName: "documents",
    });

    await store.addDocuments(docs);

    return new NextResponse(
      JSON.stringify(`Upload to supabase ran without any errors`)
    );
  } catch (err: any) {
    console.error(`Error occurred while loading the pdf: ${err}`);
    return new NextResponse(
      JSON.stringify(`Error occurred while loading the pdf: ${err}`)
    );
  }
};
