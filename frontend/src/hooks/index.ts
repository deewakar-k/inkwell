import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export interface Blog {
  id: string;
  title: string;
  subTitle: string;
  content: string;
  createdAt: Date;
  author: {
    name: string;
  };
}

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setBlog(response.data.blog);
        setLoading(false);
      });
  }, [id]);

  return {
    loading,
    blog,
  };
};

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setBlogs(response.data.blogs);
        setLoading(false);
      });
  }, []);

  return {
    loading,
    blogs,
  };
};

export const useBlogLike = ({ id }: { id: string }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  const fetchLikes = useCallback(async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/v1/blog/like/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      setLikes(res.data.likes);
      setLiked(res.data.liked); // Ensure this is set correctly
    } catch (error) {
      console.error("Error fetching likes:", error);
    }
  }, [id]);

  const toggleLike = async () => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/blog/like/${id}`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        },
      );
      setLiked(res.data.liked); // Update the liked state
      setLikes((prevLikes) => (res.data.liked ? prevLikes + 1 : prevLikes - 1));
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  useEffect(() => {
    fetchLikes();
  }, [fetchLikes]);

  return {
    likes,
    liked,
    toggleLike,
  };
};

export const useBlogCommentCount = ({ id }: { id: string }) => {
  const [count, setCount] = useState();

  const fetchComments = useCallback(async () => {
    const res = await axios.get(`${BACKEND_URL}/api/v1/blog/comments/${id}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    setCount(res.data.count);
  }, [id]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return {
    count,
  };
};

export interface Comments {
  content: string;
}

export const useBlogComment = ({ id }: { id: string }) => {
  const [comments, setComments] = useState<Comments[]>([]);

  const fetchComments = useCallback(async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/v1/blog/comment/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      setComments(res.data.comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }, [id]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return {
    comments,
    fetchComments,
  };
};

export const useBlogSave = ({ id }: { id: string }) => {
  const [save, setSave] = useState(false);

  const toggleSave = async () => {
    try {
      await axios.post(
        `${BACKEND_URL}/api/v1/blog/save/${id}`,
        {
          delete: save,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        },
      );

      setSave((prevSave) => {
        return !prevSave;
      });
    } catch (e) {
      console.error(e);
    }
  };
  return {
    save,
    toggleSave,
  };
};
