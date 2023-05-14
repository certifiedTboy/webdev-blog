import React, { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserByUsername } from "../lib/APIs/UserApi/userApi";
import {
  requestLoading,
  requestSuccess,
  requestFailed,
} from "../lib/generaRequestRedux/requestSlice";
import Banner from "../components/layouts/banner/Banner";
import GeneraProfile from "../components/User/GeneralProfile/GeneralProfile";
import Loader from "../components/UI/Loader/Loader";

const ProfilePage = () => {
  const [userData, setUserData] = useState({});
  const dispatch = useDispatch();
  const params = useParams();
  const { username } = params;

  useEffect(() => {
    const onGetUserByUsername = async () => {
      dispatch(requestLoading());
      try {
        const response = await getUserByUsername(username);

        if (response.error) {
          return dispatch(requestFailed(response.error));
        }

        setUserData(response.data);
        dispatch(requestSuccess("success"));
      } catch (error) {
        dispatch(requestFailed("something went wrong"));
      }
    };
    onGetUserByUsername();
  }, [username, dispatch]);
  return (
    <Fragment>
      <Banner userData={userData} />
      <GeneraProfile userData={userData} />
    </Fragment>
  );
};

export default ProfilePage;
