import React, { useState, Fragment } from "react";
import Banner from "../components/layouts/banner/Banner";
import AllBlogs from "../components/Blogs/AllBlogs/AllBlogs";
import Loader from "../components/UI/Loader/Loader";

const Blogs = () => {
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 2000);
  return (
    <Fragment>
      {loading && <Loader />}
      <Banner />
      <AllBlogs />
    </Fragment>
  );
};

export default Blogs;
