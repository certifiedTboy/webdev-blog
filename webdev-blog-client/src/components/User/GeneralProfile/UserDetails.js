import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { onGetOtherUserProfilePicture } from "../../../lib/generaRequestRedux/profileActions";
import UpdateUser from "./Modals/UpdateUser";
import ProfileUpload from "./Modals/ProfileUpload";
import classes from "./GeneralProfile.module.css";

const UserDetails = ({ userData }) => {
  const { success } = useSelector((state) => state.request);
  const { otherUserProfilePicture } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.login);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const dispatch = useDispatch();
  const params = useParams();
  const { username } = params;

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

  useEffect(() => {
    const getProfilePicture = async () => {
      dispatch(onGetOtherUserProfilePicture(username));
    };
    getProfilePicture();
  }, [username, dispatch]);

  useEffect(() => {
    if (success.successStatus === true) {
      setShowUpdateModal(false);
      setShowUploadModal(false);
    }
  }, [success.successStatus]);

  return (
    <>
      {showUpdateModal && (
        <UpdateUser onShowModal={onShowModal} userData={userData} />
      )}
      {showUploadModal && <ProfileUpload onShowModal={onShowProfileModal} />}
      <div className={classes.user_details}>
        <div>
          <img
            className={classes.profile_image}
            src={`http://localhost:3001/${otherUserProfilePicture}`}
            alt="profile_picture"
          />
          {user && user.username === userData.username && (
            <div>
              <a
                className={classes.upload_btn}
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
        <div>
          <h3>
            {userData.firstName} {userData.lastName}
          </h3>
        </div>
        <div>
          <p>{userData.email}</p>
        </div>

        <div className="mt-3 mb-5">
          {user && userData.username === user.username && (
            <a href="#" className={classes.edit_btn} onClick={onShowModal}>
              Edit Profile
            </a>
          )}
        </div>

        {/* <div className={classes.following}>
          <h4>following</h4>
          <div>
            {following.length > 0 &&
              following.map((follow) => {
                return (
                  <div className="mb-3">
                    <a href="/profile">
                      <img
                        className="d-inline"
                        src={`http://localhost:3001/${follow.data.profilePicture}`}
                        alt="profile_picture"
                      />
                      <p className="d-inline">{follow.data.username} </p>
                    </a>
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
                );
              })}
          </div>
        </div> */}
      </div>
    </>
  );
};

export default UserDetails;
