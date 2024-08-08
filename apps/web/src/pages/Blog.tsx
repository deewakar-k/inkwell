import { Singleblog } from "@repo/ui/singleblog";
import { useBlog } from "../hooks"
import { useParams } from "react-router-dom";

function Blog() {
  const { id } = useParams();
  const { loading, blog } = useBlog({
    id: id || ""
  });

  if (loading || !blog) {
    return <div>
      loading...
    </div>
  }
  return <div>
    hi from blog
  </div>
}

export default Blog
