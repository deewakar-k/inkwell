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
    const res = await axios.get(`${BACKEND_URL}/api/v1/blog/like/${id}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    setLikes(res.data.likes);
  }, [id]);

  const toggleLike = async () => {
    await axios.post(
      `${BACKEND_URL}/api/v1/blog/like/${id}`,
      {},
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      },
    );
    setLiked((prevLiked) => {
      return !prevLiked;
    });
    await fetchLikes();
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

export const useBlogComment = ({ id }: { id: string }) => {
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

export const useBlogSave = ({ id }: { id: string }) => {
  const [saved, setSaved] = useState<boolean>(false);

  const toggleSave = useCallback(async () => {
    setSaved((prevSaved) => !prevSaved);

    try {
      await axios.post(
        `${BACKEND_URL}/api/v1/blog/save/${id}`,
        {
          delete: !saved,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        },
      );
    } catch (error) {
      // If the request fails, revert the state change
      setSaved((prevSaved) => !prevSaved);
      console.error("Error saving/unsaving blog", error);
    }
  }, [id, saved]);

  return {
    saved,
    toggleSave,
  };
};
