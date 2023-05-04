import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { onFollowUser } from "../../../lib/generaRequestRedux/FollowActions";
import { getUserByUsername } from "../../../lib/APIs/UserApi/userApi";
import Details from "./Details";
import About from "./About";
import classes from "./GeneralProfile.module.css";

const Story = ({ userData }) => {
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [profileOwner, setProfileOwner] = useState("");
  const [userIsFollowing, setUserIsFollowing] = useState(false);
  const [showAbout, setShowAbout] = useState(true);
  const [showStory, setShowStory] = useState(false);
  const dispatch = useDispatch();
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

  useEffect(() => {
    if (userData.username) {
      setProfileOwner(userData.username);
    }
  }, [userData]);

  const followUserHandler = async () => {
    await dispatch(onFollowUser(userData.username));
  };

  const { follow_loading, follow_success, follow_failed } = useSelector(
    (state) => state.follow
  );

  useEffect(() => {
    const onGetUserByUsername = async () => {
      const response = await getUserByUsername(profileOwner);
      if (!response.error) {
        setFollowers(response.data.followers);
        return setFollowing(response.data.following);
      }
    };

    onGetUserByUsername();
  }, [profileOwner, follow_success, follow_failed]);

  useEffect(() => {
    const userFollow = followers.find(
      (follow) => follow.username === user.username
    );

    if (userFollow) {
      return setUserIsFollowing(true);
    } else {
      return setUserIsFollowing(false);
    }
  }, [followers]);

  return (
    <div className={classes.user_story}>
      <div>
        <h2>
          {userData.firstName} {userData.lastName}
        </h2>
        {userData.following && (
          <div>
            <button type="button" class="btn-primary mr-2">
              following{" "}
              <span className={`badge text-bg-secondary`}>
                {following.length}
              </span>
            </button>

            <button type="button" class="btn-primary">
              followers{" "}
              <span class="badge text-bg-secondary">{followers.length}</span>
            </button>

            {user && userData.username !== user.username && (
              <button
                type="submit"
                className="btn-success d-inline ml-2"
                onClick={followUserHandler}
              >
                {userIsFollowing ? "unfollow" : "follow"}
              </button>
            )}
          </div>
        )}
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className={`bi bi-three-dots ${classes.nav_icon}`}
          viewBox="0 0 16 16"
        >
          <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
        </svg> */}
      </div>
      <div className={classes.nav_border}>
        <nav
          className="navbar navbar-expand-sm bg-body-tertiary"
          style={{ position: "relative", paddingBottom: "0px" }}
        >
          <div className="container-fluid pl-0">
            <ul className={`navbar-nav mb-2 mb-lg-0 ${classes.nav_tab}`}>
              <li className="nav-item">
                <a
                  className={`nav-link ${showAbout ? "disabled" : ""} ${
                    classes.link
                  }`}
                  aria-current="page"
                  href="#"
                  onClick={navigateProfile}
                >
                  About
                </a>
              </li>

              <li className="nav-item">
                <a
                  className={`nav-link ${showStory ? "disabled" : ""} ${
                    classes.link
                  }`}
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
                    class={`nav-link ${!user ? "disabled" : ""} ${
                      classes.link
                    }`}
                  >
                    Write Article
                  </a>
                </li>
              )}
            </ul>
          </div>
        </nav>
        {showAbout && <About userData={userData} />}
        {showStory && <Details userData={userData} />}
      </div>
    </div>
  );
};

export default Story;
