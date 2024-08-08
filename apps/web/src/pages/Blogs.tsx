import { Appbar } from "@repo/ui/appbar"
import { Blogcard } from "@repo/ui/blogcard"
import { useBlogs } from "../hooks";

function Blogs() {

  const { loading, blogs } = useBlogs();

  if (loading) {
    return <>
      <p>loading...</p>
    </>
  }

  return (
    <>
      <Appbar />
      <div className="flex justify-center min-w-4xl">
        <div>
          {blogs.map(blog => <Blogcard
            id={blog.id}
            title={blog.title}
            content={blog.content}
            publishedDate="Aug 8"
          />
          )}
        </div>
      </div>
    </>
  )
}

export default Blogs
