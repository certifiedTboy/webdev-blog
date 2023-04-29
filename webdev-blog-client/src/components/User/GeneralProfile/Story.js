import React, { useState } from "react";
import { useSelector } from "react-redux";
import Details from "./Details";
import About from "./About";
import classes from "./GeneralProfile.module.css";

const Story = ({ userData }) => {
  const [showAbout, setShowAbout] = useState(true);
  const [showStory, setShowStory] = useState(false);
  const { user } = useSelector((state) => state.login);

  const navigateProfile = (event) => {
    event.preventDefault();
    if (showAbout) {
      setShowAbout(false);
      setShowStory(true);
    } else {
      setShowAbout(true);
      setShowStory(false);
    }
  };

  return (
    <div className={classes.user_story}>
      <div>
        <h2>
          {userData.firstName} {userData.lastName}
        </h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-three-dots"
          viewBox="0 0 16 16"
        >
          <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
        </svg>
      </div>
      <div className={classes.nav_border}>
        <nav
          className="navbar navbar-expand-sm bg-body-tertiary"
          style={{ position: "relative", paddingBottom: "0px" }}
        >
          <div className="container-fluid pl-0">
            <div id="navbarSupportedContent">
              <ul className="navbar-nav mb-2 mb-lg-0">
                <li className="nav-item">
                  <a
                    className={`nav-link ${showAbout ? "disabled" : ""}`}
                    aria-current="page"
                    href="#"
                    onClick={navigateProfile}
                  >
                    About
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    className={`nav-link ${showStory ? "disabled" : ""}`}
                    aria-current="page"
                    href="#"
                    onClick={navigateProfile}
                  >
                    Articles
                  </a>
                </li>

                {user && user.username === userData.username && (
                  <li className="nav-item">
                    <a
                      href="/write-article"
                      class={`nav-link ${!user ? "disabled" : ""}`}
                    >
                      Write Article
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
        {showAbout && <About userData={userData} />}
        {showStory && <Details userData={userData} />}
      </div>
    </div>
  );
};

export default Story;
