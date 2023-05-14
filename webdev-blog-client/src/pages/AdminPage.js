import React, { Fragment } from "react";
import Banner from "../components/layouts/banner/Banner";
import GeneraProfile from "../components/User/GeneralProfile/GeneralProfile";

const AdminPage = () => {
  return (
    <Fragment>
      <Banner />
      <GeneraProfile />
    </Fragment>
  );
};

export default AdminPage;
