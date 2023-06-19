import React, { useEffect, Fragment, useState } from "react";
import Home from "../components/Home/Home";
import { increaseVisits } from "../lib/APIs/Admin/AdminApis";
import Loader from "../components/UI/Loader/Loader";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const onVisitPage = async () => {
      await increaseVisits();
    };

    onVisitPage();
  }, []);
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
