import { Chroma } from "langchain/vectorstores/chroma";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { query, pdf_id } = await req.json();
  const embedder = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY as string,
  });

  if (pdf_id == "200511401") {
    const vectorStore = await Chroma.fromExistingCollection(embedder, {
      collectionName: "rag-paper",
    });

    try {
      const response = await vectorStore.similaritySearch(query, 1);

      return new NextResponse(JSON.stringify(response), { status: 200 });
    } catch {
      (err: any) => {
        console.error(
          `Error occurred while performing similarity search: ${err}`
        );
        return new NextResponse(
          JSON.stringify(
            `Error occurred while performing similarity search: ${err}`
          ),
          { status: 500 }
        );
      };
    }
  }
};
