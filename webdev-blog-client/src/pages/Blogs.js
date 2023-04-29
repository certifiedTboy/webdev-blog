import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogsBanner from "../components/Blogs/AllBlogs/BlogsBanner";
import AllBlogs from "../components/Blogs/AllBlogs/AllBlogs";
import Loader from "../components/UI/Loader/Loader";
import { getBlogs } from "../components/Blogs/blogRedux/BlogActions";

const Blogs = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.blog);
  useEffect(() => {
    const onGetAllBlogs = async () => {
      dispatch(getBlogs());
    };

    onGetAllBlogs();
  }, []);
  return (
    <Fragment>
      {isLoading && <Loader />}
      {!isLoading && <BlogsBanner />}
      {!isLoading && <AllBlogs />}
    </Fragment>
  );
};

export default Blogs;
