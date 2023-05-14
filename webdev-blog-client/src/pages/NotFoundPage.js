import React, { Fragment } from "react";
import Banner from "../components/layouts/banner/Banner";
import NotFound from "../components/Errors/NotFound";

const NotFoundPage = () => {
  return (
    <Fragment>
      <Banner />
      <NotFound />
    </Fragment>
  );
};

export default NotFoundPage;
