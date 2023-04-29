import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SingleBlog from "../components/Blogs/SingleBlog/SingleBlog";
import BlogsBanner from "../components/Blogs/AllBlogs/BlogsBanner";
import { getABlog } from "../lib/APIs/BlogAPIs/BlogAPI";
import Loader from "../components/UI/Loader/Loader";

const Blog = () => {
  const [blog, setBlog] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const params = useParams();
  const { title } = params;
  useEffect(() => {
    const onGetABlog = async () => {
      setIsLoading(true);
      try {
        const response = await getABlog(title);
        if (response.error) {
          setIsLoading(false);
          return setErrorMessage("Seems this article was deleted");
        }
        setIsLoading(false);
        return setBlog(response.data);
      } catch (error) {
        setIsLoading(false);
        setErrorMessage("something went wrong");
      }
    };
    onGetABlog();
  }, [title]);

  return (
    <Fragment>
      {isLoading && <Loader />}
      {!isLoading && <BlogsBanner blog={blog} />}
      {!isLoading && <SingleBlog blog={blog} />}
    </Fragment>
  );
};

export default Blog;
