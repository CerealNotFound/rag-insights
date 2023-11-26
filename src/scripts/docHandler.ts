import { PDFLoader } from "langchain/document_loaders/fs/pdf";

const loader = new PDFLoader("@/arg_doc/rag-research.pdf");

const docs = await loader.load();
console.log(docs);
