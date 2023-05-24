import React from "react";
import { AnimationOnScroll } from "react-animation-on-scroll";
import { NavLink } from "react-router-dom";
import "./Intro.css";

const Banner = () => {
  return (
    <AnimationOnScroll
      animateIn="animate__pulse"
      className=""
      data-wow-delay="0.1s"
    >
      <div className="abt-section mb-150" id="about">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <div className="abt-bg">
                <a
                  href="https://www.youtube.com/watch?v=DBLlFWYcIGQ"
                  className="video-play-btn popup-youtube"
                >
                  <i className="fas fa-play"></i>
                </a>
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="abt-text">
                <p className="top-sub">Since Year 1999</p>
                <h2>
                  Wed-Dev <span className="orange-text">Blog</span>
                </h2>
                <p>
                  Welcome to web-dev blog, where we delve into the exciting
                  world of technology, innovation, and the digital landscape. In
                  this rapidly evolving era, where advancements occur at an
                  unprecedented pace, it is crucial to stay informed and
                  connected to the latest trends, breakthroughs, and
                  transformative ideas that shape our lives.
                </p>
                <p>
                  Here, we aim to be your go-to destination for all things tech,
                  offering thought-provoking insights, informative articles, and
                  engaging discussions that cater to both tech enthusiasts and
                  casual readers alike...
                </p>
                <NavLink to="/about" className="boxed-btn mt-4">
                  Read more
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimationOnScroll>
  );
};

export default Banner;
