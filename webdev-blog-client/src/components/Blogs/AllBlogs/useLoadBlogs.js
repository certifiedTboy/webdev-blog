import { useEffect, useState } from "react";
import { getAllBlogs } from "../../../lib/APIs/BlogAPIs/BlogAPI";

const useLoadBlogs = (pageNumber) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ error: "" });
  const [hasMore, setHasMore] = useState(true);
  const [newBlogs, setNewBlogs] = useState([]);

  useEffect(() => {
    const onGetAllBlogs = async () => {
      setLoading(true);
      try {
        const response = await getAllBlogs(pageNumber);

        if (response.error) {
          return setError({ error: response.error });
        }

        if (response.data.length === 0) {
          return setError({ error: "No blog found!" });
        }

        if (response.data.length === 0) {
          setLoading(false);
          return setHasMore(false);
        }
        if (!response.error) {
          setLoading(false);
          const publishedBlogs = response.data.filter(
            (blog) => blog.isPublished
          );
          return setNewBlogs((prevBlogs) => {
            return [...prevBlogs, ...response.data];
          });
        }
      } catch (error) {
        setLoading(false);
        setError({ error: "something went wrong" });
      }
    };

    onGetAllBlogs();
  }, [pageNumber]);

  return { newBlogs, hasMore, loading, error };
};

export default useLoadBlogs;
