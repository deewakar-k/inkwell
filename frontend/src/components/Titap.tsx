// src/Tiptap.tsx
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { useState } from "react";
import Button2 from "./Button2";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import {
  RiBold,
  RiCodeLine,
  RiDoubleQuotesL,
  RiH2,
  RiItalic,
} from "react-icons/ri";
import Bold from "@tiptap/extension-bold";
import Blockquote from "@tiptap/extension-blockquote";
import Heading from "@tiptap/extension-heading";
import CodeBlockLowLight from "@tiptap/extension-code-block-lowlight";
import { all, createLowlight } from "lowlight";
import rust from "highlight.js/lib/languages/rust";
import "highlight.js/styles/github-dark.css";

const lowlight = createLowlight(all);

lowlight.register("rust", rust);

const Tiptap = () => {
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const navigate = useNavigate();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        hardBreak: {
          keepMarks: true,
        },
      }),
      Bold,
      Blockquote,
      CodeBlockLowLight.configure({
        lowlight,
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),

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
            className="font-['Inter'] font-extrabold text-5xl bg-black focus:outline-none placeholder-zinc-800"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mt-4 mb-6">
          <input
            type="text"
            placeholder="Subtitle"
            className="text-lg bg-black focus:outline-none font-['Inter'] placeholder-zinc-800"
            onChange={(e) => setSubTitle(e.target.value)}
          />
        </div>
      </div>

      {editor && (
        <BubbleMenu
          className="bubble-menu bg-zinc-900 p-2 text-center justify-between rounded-md pt-[2px] text-white flex gap-2"
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
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={
              editor.isActive("italic") ? "is-active text-green-200" : ""
            }
          >
            <RiItalic size={20} />
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive("heading", { level: 2 })
                ? "is-active text-green-200"
                : ""
            }
          >
            <RiH2 size={20} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={
              editor.isActive("blockquote") ? "is-active text-green-200" : ""
            }
          >
            <RiDoubleQuotesL size={20} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editor.isActive("codeBlock") ? "is-active" : ""}
          >
            <RiCodeLine size={20} />
          </button>
        </BubbleMenu>
      )}

      <EditorContent editor={editor} />

      <div className="mt-10 flex justify-end">
        <Button2
          label="publish"
          onClick={async () => {
            if (!editor) return;

            const content = editor.getHTML();

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

export default Tiptap;
