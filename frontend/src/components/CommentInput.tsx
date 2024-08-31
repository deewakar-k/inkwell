import { useParams } from "react-router-dom";
import Button2 from "./Button2";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useState } from "react";

interface CommentInputProps {
  handleComment: () => void;
}

export const CommentInput = ({ handleComment }: CommentInputProps) => {
  const { id } = useParams();

  const [comment, setComment] = useState({
    content: "",
  });

  const addComment = async () => {
    if (!comment.content.trim()) return;
    try {
      await axios.post(
        `${BACKEND_URL}/api/v1/blog/comment/${id}`,
        {
          content: comment.content,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        },
      );
      setComment({ content: "" });
      handleComment();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <div className="flex flex-col items-end gap-3w w-full max-w-2xl">
        <div className="flex gap-3 w-full">
          <textarea
            value={comment.content}
            onChange={(e) => setComment({ content: e.target.value })}
            className="flex-grow h-24 p-3 bg-black text-[#D5CDC4] border border-[#D5CDC4] border-opacity-20 rounded-md resize-none focus:outline-none focus:ring-1 focus:ring-[#D5CDC4] placeholder-zinc-700"
            placeholder="what are your thoughts?"
          ></textarea>
        </div>
        <div className="mt-2">
          <Button2 label="Comment" onClick={addComment} />
        </div>
      </div>
    </>
  );
};
