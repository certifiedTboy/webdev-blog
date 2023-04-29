import React from "react";
import { Link } from "react-scroll";
import classes from "./BackToTop.module.css";

const BackToTop = ({ scrollTop }) => {
  return (
    <Link
      activeClass="active"
      className={`btn back-to-top ${
        scrollTop > 200 ? classes.fadeIn : classes.fadeOut
      } ${scrollTop > 2100 || scrollTop === 3302 ? classes.background : ""}`}
      to="home"
      spy={true}
      smooth={true}
      delay={500}
      duration={500}
      isDynamic={true}
      ignoreCancelEvents={false}
      spyThrottle={500}
    >
      <i class="fa fa-chevron-up"></i>
    </Link>
  );
};

export default BackToTop;
