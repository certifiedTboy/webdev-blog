import React, { useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginBanner from "../components/Auth/login/LoginBanner";
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
      <LoginBanner />
      <Login />
    </Fragment>
  );
};

export default LoginPage;
