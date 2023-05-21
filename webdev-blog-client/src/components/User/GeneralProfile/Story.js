import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Moment from "react-moment";
import { useParams } from "react-router-dom";
import { onFollowUser } from "../../../lib/generaRequestRedux/FollowActions";
import { getUserByUsername } from "../../../lib/APIs/UserApi/userApi";
import { onGetOtherUserProfilePicture } from "../../../lib/generaRequestRedux/profileActions";
import Details from "./Details";
import About from "./About";
import UpdateUser from "./Modals/UpdateUser";
import ProfileUpload from "./Modals/ProfileUpload";
import classes from "./GeneralProfile.module.css";

const Story = ({ userData }) => {
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [profilePicture, setProfilePicture] = useState("");
  const [profileOwner, setProfileOwner] = useState("");
  const [userIsFollowing, setUserIsFollowing] = useState(false);
  const [showAbout, setShowAbout] = useState(true);
  const [showStory, setShowStory] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const dispatch = useDispatch();
  const params = useParams();
  const { username } = params;

  const { user } = useSelector((state) => state.login);
  const { otherUserProfilePicture } = useSelector((state) => state.profile);

  const onShowModal = (event) => {
    event.preventDefault();
    if (!showUpdateModal) {
      setShowUpdateModal(true);
    } else {
      setShowUpdateModal(false);
    }
  };

  const onShowProfileModal = (event) => {
    event.preventDefault();
    if (!showUploadModal) {
      setShowUploadModal(true);
    } else {
      setShowUploadModal(false);
    }
  };

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
    const getProfilePicture = async () => {
      dispatch(onGetOtherUserProfilePicture(username));
    };
    getProfilePicture();
  }, [username, dispatch]);

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
    if (user) {
      const userFollow = followers.find(
        (follow) => follow.username === user.username
      );

      if (userFollow) {
        return setUserIsFollowing(true);
      } else {
        return setUserIsFollowing(false);
      }
    }
  }, [followers]);

  useEffect(() => {
    if (otherUserProfilePicture) {
      const splitedProfile = otherUserProfilePicture.split(":");
      if (splitedProfile[0] === "https") {
        return setProfilePicture(otherUserProfilePicture);
      } else {
        return setProfilePicture(
          `http://localhost:3001/${otherUserProfilePicture}`
        );
      }
    }
  }, [otherUserProfilePicture]);

  return (
    <>
      {showUpdateModal && (
        <UpdateUser onShowModal={onShowModal} userData={userData} />
      )}
      {showUploadModal && <ProfileUpload onShowModal={onShowProfileModal} />}
      <div className={classes.user_story}>
        <div className={classes.move_center}>
          <div
            className={`${classes.user_details} d-sm-block d-md-none d-lg-none text-center`}
          >
            <img
              className={classes.profile_image}
              src={`${profilePicture}`}
              alt="profile_picture"
            />
            {user && user.username === userData.username && (
              <div>
                <a
                  className={classes.upload_btn2}
                  href="#"
                  onClick={onShowProfileModal}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="currentColor"
                    className="bi bi-camera-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                    <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z" />
                  </svg>
                </a>
              </div>
            )}
          </div>
          <h2>
            {userData.firstName} {userData.lastName}
          </h2>
          <p>{userData.email}</p>

          <div className="mb-2">
            {user && userData.username === user.username && (
              <a href="#" className={classes.edit_btn} onClick={onShowModal}>
                Edit Profile
              </a>
            )}
          </div>

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

              {userData && (
                <div>
                  {" "}
                  <p className={classes.date}>
                    Joined:{" "}
                    <Moment className="meta-own" fromNow>
                      {userData.createdAt}
                    </Moment>
                  </p>{" "}
                </div>
              )}
            </div>
          )}
        </div>
        <div className={`${classes.nav_border} mt-5`}>
          <div style={{ width: "400px" }}>
            <ul class="nav nav-pills nav-justified">
              <li class="nav-item" style={{ textAlign: "left" }}>
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
              <li class="nav-item" style={{ textAlign: "left" }}>
                <a
                  className={`nav-link ${showStory ? "disabled" : ""} ${
                    classes.link
                  }`}
                  aria-current="page"
                  href="#"
                  onClick={navigateProfile}
                >
                  Article
                </a>
              </li>
              {user && user.username === userData.username && (
                <li class="nav-item" style={{ textAlign: "left" }}>
                  <a
                    className={`nav-link ${!user ? "disabled" : ""} ${
                      classes.link
                    }`}
                    href="/write-article"
                  >
                    Write Article
                  </a>
                </li>
              )}
            </ul>
          </div>
          {showAbout && <About userData={userData} />}
          {showStory && <Details userData={userData} />}
        </div>
      </div>
    </>
  );
};

export default Story;
