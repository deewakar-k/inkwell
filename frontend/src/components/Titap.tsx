// src/Tiptap.tsx
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { useState } from "react";
import Button2 from "./Button2";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { RiBold, RiDoubleQuotesL, RiH2, RiItalic } from "react-icons/ri";

const Tiptap = () => {
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const navigate = useNavigate();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Tell your story...",
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class: "focus:outline-none",
      },
    },
  });

  return (
    <>
      <div>
        <div>
          <input
            type="text"
            placeholder="Title"
            className="font-['Inter'] font-extrabold text-5xl bg-black focus:outline-none"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mt-4 mb-6">
          <input
            type="text"
            placeholder="Subtitle"
            className="text-lg bg-black focus:outline-none font-['Inter']"
            onChange={(e) => setSubTitle(e.target.value)}
          />
        </div>
      </div>

      {editor && (
        <BubbleMenu
          className="bubble-menu bg-black rounded-md pt-[2px] text-white"
          tippyOptions={{ duration: 100 }}
          editor={editor}
        >
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={
              editor.isActive("bold") ? "is-active text-green-200" : ""
            }
          >
            <RiBold size={20} />
          </button>
          <span className="seperator"></span>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={
              editor.isActive("italic") ? "is-active text-green-200" : ""
            }
          >
            <RiItalic size={20} />
          </button>
          <span className="seperator"></span>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor.isActive("heading", { level: 2 })
                ? "is-active text-green-200"
                : ""
            }
          >
            <RiH2 size={20} />
          </button>
          <span className="seperator"></span>
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive("blockquote") ? "is-active" : ""}
          >
            <RiDoubleQuotesL size={20} />
          </button>
        </BubbleMenu>
      )}

      <EditorContent editor={editor} />

      <div className="mt-10">
        <Button2
          label="publish"
          onClick={async () => {
            if (!editor) return;

            const jsonContent = editor.getJSON();
            const content = extractTextFromJSON(jsonContent);

            console.log("Extracted Content:", content);
            const res = await axios.post(
              `${BACKEND_URL}/api/v1/blog`,
              {
                title,
                subTitle,
                content,
              },
              {
                headers: {
                  Authorization: localStorage.getItem("token"),
                },
              },
            );
            navigate(`/blog/${res.data.id}`);
          }}
        />
      </div>
    </>
  );
};

const extractTextFromJSON = (json: any): string => {
  const getTextFromNode = (node: any): string => {
    if (node.type === "text") {
      return node.text || "";
    }
    if (node.content && Array.isArray(node.content)) {
      return node.content.map(getTextFromNode).join("");
    }
    return "";
  };

  return getTextFromNode(json).trim(); // Ensure no extra spaces or unwanted characters
};

export default Tiptap;
