import React, { useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { increaseVisits } from "../lib/APIs/Admin/AdminApis";
import Banner from "../components/layouts/banner/Banner";
import Login from "../components/Auth/login/Login";

const LoginPage = () => {
  const { user } = useSelector((state) => state.login);
  const navigate = useNavigate();
  useEffect(() => {
    const onVisitPage = async () => {
      await increaseVisits();
    };

    onVisitPage();
  }, []);
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
