import { useNavigate } from "react-router-dom";
import Description from "../components/Description";
import Heading from "../components/Heading";
import Navbar from "../components/Navbar";
import Subheading from "../components/Subheading";
import { useBlogs } from "../hooks";

const formatDate = (dateString: Date) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

function Blogs() {
  const navigate = useNavigate();
  const { loading, blogs } = useBlogs();
  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <>
      <div className="border-b pb-6">
        <Navbar />
      </div>
      <div className="flex flex-col items-center justify-center mt-6">
        <div className="w-full max-w-2xl">
          {blogs.map((blog) => (
            <div key={blog.id}>
              <div
                className="cursor-pointer"
                onClick={() => navigate(`/blog/${blog.id}`)}
              >
                <Heading label={blog.title} />
              </div>
              <div className="mt-2 text-left text-sm">
                <Subheading label={blog.subTitle} />
              </div>
              <div className="mt-6 border-b border-[#D5CDC4] border-opacity-20 pb-4">
                <Description
                  date={formatDate(blog.createdAt)}
                  blogId={blog.id}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Blogs;
