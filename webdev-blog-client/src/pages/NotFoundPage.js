import React, { Fragment } from "react";
import ErrorBanner from "../components/Errors/ErrorBanner";
import NotFound from "../components/Errors/NotFound";

const NotFoundPage = () => {
  return (
    <Fragment>
      <ErrorBanner />
      <NotFound />
    </Fragment>
  );
};

export default NotFoundPage;
