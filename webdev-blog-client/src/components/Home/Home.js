import React, { Fragment } from "react";
import Intro from "./intro/Intro";
import Banner from "./banner/Banner";
import RecentTopic from "./recentTopic/RecentTopics";

const Home = () => {
  return (
    <Fragment>
      <Intro />
      <Banner />
      <RecentTopic />
    </Fragment>
  );
};

export default Home;
