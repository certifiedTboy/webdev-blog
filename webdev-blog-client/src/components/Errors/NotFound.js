import React from "react";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="full-height-section error-section">
      <div className="full-height-tablecell">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 text-center">
              <div className="error-text">
                <i className="far fa-sad-cry"></i>
                <h1>Oops! Not Found.</h1>
                <p>The page you requested for is not found.</p>
                <a href="/home" className="btn boxed-btn">
                  Back to Home
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
