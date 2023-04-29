import React from "react";

const About = ({ userData }) => {
  return (
    <div className="ml-2">
      <div className="row">
        <div className="col-12">
          <div>
            <p>{userData.about}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
