import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SingleBlog from "../components/Blogs/SingleBlog/SingleBlog";
import Banner from "../components/layouts/banner/Banner";
import { getABlog } from "../lib/APIs/BlogAPIs/BlogAPI";
import { increaseVisits } from "../lib/APIs/Admin/AdminApis";
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

  useEffect(() => {
    const onVisitPage = async () => {
      await increaseVisits();
    };

    onVisitPage();
  }, []);

  return (
    <Fragment>
      <Banner />
      <SingleBlog blog={blog} />
    </Fragment>
  );
};

export default Blog;
