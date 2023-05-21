import React, { Fragment, useState, useEffect } from "react";
import Home from "../components/Home/Home";
import Loader from "../components/UI/Loader/Loader";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 2000);
  return (
    <Fragment>
      {isLoading && <Loader />}
      <Home />
    </Fragment>
  );
};

export default HomePage;
