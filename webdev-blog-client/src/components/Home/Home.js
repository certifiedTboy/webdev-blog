import React, { Fragment } from "react";
import Intro from "./intro/Intro";
import Banner from "../layouts/banner/Banner";
import RecentTopic from "./recentTopic/RecentTopics";

const Home = () => {
  return (
    <Fragment>
      <Banner />
      <Intro />
      <RecentTopic />
    </Fragment>
  );
};

export default Home;
