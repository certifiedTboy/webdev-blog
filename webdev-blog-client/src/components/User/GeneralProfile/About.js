import React from "react";
import classes from "./GeneralProfile.module.css";

const About = ({ userData }) => {
  return (
    <div className="ml-2">
      <div className="row">
        <div className="col-12">
          <div className={classes.about}>
            <p>{userData.about}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
