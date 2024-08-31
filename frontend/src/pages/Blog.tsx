import { useParams } from "react-router-dom";
import { MainBody } from "../components/MainBody";
import { MainDesc } from "../components/MainDesc";
import { MainHeading } from "../components/MainHeading";
import Navbar from "../components/Navbar";
import Subheading from "../components/Subheading";
import { useBlog } from "../hooks";
import { Comment } from "../components/Comment";
import { CommentInput } from "../components/CommentInput";
import { useCallback, useState } from "react";
import { Loader } from "../components/Loader";

const formatDate = (dateString: Date) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

export const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({
    id: id || "",
  });

  const [refresh, setRefresh] = useState(false);
  const handleComment = useCallback(() => {
    setRefresh((prev) => !prev); // Toggle to trigger re-render
  }, []);
  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (!blog) {
    return <div>blog not found</div>;
  }

  return (
    <>
      <div className="border-b border-[#D5CDC4] pb-6">
        <Navbar />
      </div>
      <div className="flex flex-col items-center justify-center mt-14 w-full">
        <div className="w-full max-w-2xl">
          <MainHeading label={blog.title} />
          <div className="mt-4 font-medium">
            <Subheading label={blog.subTitle} />
          </div>
          <div className="mt-8 text-left text-sm">
            <MainBody body={blog.content} />
          </div>
          <div className="mt-14 border-b border-[#D5CDC4] border-opacity-20 pb-6">
            <MainDesc
              author="Anonymous"
              date={formatDate(blog.createdAt)}
              blogId={blog.id}
            />
          </div>
          <div className="mt-4 w-full">
            <CommentInput handleComment={handleComment} />
          </div>
          <div className="w-full">
            <Comment key={refresh ? "refresh" : "no-refresh"} />
          </div>
        </div>
      </div>
    </>
  );
};
