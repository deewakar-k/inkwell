import { LikeButton } from "./LikeButton";
import { CommentButton } from "./CommentButton";
import { SaveButton } from "./SaveButton";

interface DescProps {
  blogId: string;
  date: string;
}

function Description({ date, blogId }: DescProps) {
  return (
    <div className="flex justify-between items-center text-xs">
      <div className="flex gap-4">
        <div className="flex items-center gap-1">{date}</div>
        <LikeButton blogId={blogId} />
        <CommentButton blogId={blogId} />
      </div>
      <SaveButton blogId={blogId} />
    </div>
  );
}

export default Description;
