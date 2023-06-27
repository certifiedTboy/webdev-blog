import React, { useEffect, Fragment } from "react";
import { increaseVisits } from "../lib/APIs/Admin/AdminApis";
import AboutBanner from "../components/About/AboutBanner";
import About from "../components/About/About";
import Team from "../components/About/Team";

const AboutPage = () => {
  useEffect(() => {
    const onVisitPage = async () => {
      await increaseVisits();
    };

    onVisitPage();
  }, []);

  return (
    <Fragment>
      <AboutBanner />
      <About />
      <Team />
    </Fragment>
  );
};

export default AboutPage;
