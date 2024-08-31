import { useEffect } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import "../index.css";

const convertEmptyParagraphs = (html: string): string => {
  return html
    .replace(/<p>\s*<\/p>/g, "<br/>") // Convert empty paragraphs to <br/>
    .replace(/<\/p>\s*<p>/g, "</p><br/><p>"); // Add <br/> between paragraphs
};

export const RichTextContext = ({ content }: { content: string }) => {
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  const formattedContent = convertEmptyParagraphs(content);

  return (
    <div
      className="tiptap-content"
      dangerouslySetInnerHTML={{ __html: formattedContent }}
    ></div>
  );
};
