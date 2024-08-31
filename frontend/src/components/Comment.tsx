import { useParams } from "react-router-dom";
import { CommentAvatar } from "./CommentAvatar";
import { Content } from "./Content";
import { useBlogComment } from "../hooks";
import { useEffect } from "react";

export const Comment = () => {
  const { id } = useParams();
  const { comments, fetchComments } = useBlogComment({
    id: id || "",
  });

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return (
    <>
      <div className="italic mt-6">
        <div className="text-md font-bold">Comments</div>
        <div className="flex flex-col justify-start gap-3 mt-3 mb-10">
          {comments.map((comment, index) => (
            <div key={index} className="flex items-start gap-3">
              <CommentAvatar />
              <Content content={comment.content} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
