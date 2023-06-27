import React, { useState, useEffect, Fragment } from "react";
import Banner from "../components/layouts/banner/Banner";
import AllBlogs from "../components/Blogs/AllBlogs/AllBlogs";
import { increaseVisits } from "../lib/APIs/Admin/AdminApis";

const Blogs = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const onVisitPage = async () => {
      await increaseVisits();
    };

    onVisitPage();
  }, []);

  return (
    <Fragment>
      <Banner />
      <AllBlogs />
    </Fragment>
  );
};

export default Blogs;
