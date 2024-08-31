import { useEffect } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";

export const RichTextContext = ({ content }: { content: string }) => {
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <div
      className="tiptap-content"
      dangerouslySetInnerHTML={{ __html: content }}
    ></div>
  );
};
