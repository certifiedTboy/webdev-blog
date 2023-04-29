import React, { useState, Fragment } from "react";
import AboutBanner from "../components/About/AboutBanner";
import About from "../components/About/About";
import Team from "../components/About/Team";
import Loader from "../components/UI/Loader/Loader";

const AboutPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 2000);
  return (
    <Fragment>
      {isLoading && <Loader />}
      <AboutBanner />
      <About />
      <Team />
    </Fragment>
  );
};

export default AboutPage;
