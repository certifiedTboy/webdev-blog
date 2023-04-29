import React from "react";

const Banner = ({ userData }) => {
  return (
    <div className="breadcrumb-section breadcrumb-bg" id="home">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2 text-center">
            <div className="breadcrumb-text">
              <h1>
                {userData.firstName} {userData.lastName}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
