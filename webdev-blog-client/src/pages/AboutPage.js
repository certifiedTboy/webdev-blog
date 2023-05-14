import React, { Fragment } from "react";
import AboutBanner from "../components/About/AboutBanner";
import About from "../components/About/About";
import Team from "../components/About/Team";

const AboutPage = () => {
  return (
    <Fragment>
      <AboutBanner />
      <About />
      <Team />
    </Fragment>
  );
};

export default AboutPage;
