import React, { useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Banner from "../components/layouts/banner/Banner";
import Login from "../components/Auth/login/Login";

const LoginPage = () => {
  const { user } = useSelector((state) => state.login);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);
  return (
    <Fragment>
      <Banner />
      <Login />
    </Fragment>
  );
};

export default LoginPage;
