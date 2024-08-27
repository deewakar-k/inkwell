import { useParams } from "react-router-dom";
import { useBlogComment } from "../hooks";
import { CommentAvatar } from "./CommentAvatar";
import { Content } from "./Content";

export const Comment = ({ blogId }: { blogId: string }) => {
  const { id } = useParams();
  const { count, comments } = useBlogComment({
    id: id || "",
  });
  return (
    <>
      <div className="italic mt-6">
        <div className="text-md font-bold">Comments</div>
        <div className="flex justify-start gap-3 mt-3">
          <div>
            <CommentAvatar />
          </div>
          <div>
            <Content content={comments} />
          </div>
        </div>
      </div>
    </>
  );
};
