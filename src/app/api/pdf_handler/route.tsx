import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { NextResponse } from "next/server";
import { Chroma } from "langchain/vectorstores/chroma";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

export const GET = async () => {
  const loader = new PDFLoader("src/arg_doc/rag-research.pdf");
  const embedder = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY as string,
  });

  try {
    const docs = await loader.load();
    // return new NextResponse(
    //   JSON.stringify(
    //     `Loading of pdf was successful, value of 0th index: ${docs[0].pageContent}`
    //   )
    // );
    const vectorStore = await Chroma.fromDocuments(docs, embedder, {
      collectionName: "rag-paper",
      url: "http://localhost:8000", // Optional, will default to this value
      collectionMetadata: {
        "hnsw:space": "cosine",
      }, // Optional, can be used to specify the distance method of the embedding space https://docs.trychroma.com/usage-guide#changing-the-distance-function
    });

    return new NextResponse(
      JSON.stringify(`Successfully added the embedding to chromadb! 😎`)
    );
  } catch {
    (err: string) => {
      console.error(`Error occurred while loading the pdf: ${err}`);
      return new NextResponse(
        JSON.stringify(`Error occurred while loading the pdf: ${err}`)
      );
    };
  }
};
