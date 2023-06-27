import React, { useState, useEffect, Fragment } from "react";
import Banner from "../components/layouts/banner/Banner";
import AllBlogs from "../components/Blogs/AllBlogs/AllBlogs";
import { increaseVisits } from "../lib/APIs/Admin/AdminApis";
import Loader from "../components/UI/Loader/Loader";

const Blogs = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const onVisitPage = async () => {
      await increaseVisits();
    };

    onVisitPage();
  }, []);
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
