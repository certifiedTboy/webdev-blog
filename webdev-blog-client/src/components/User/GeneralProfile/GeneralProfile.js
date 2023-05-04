import React from "react";
import Story from "./Story";
import UserDetails from "./UserDetails";
const GeneraProfile = ({ userData }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 col-12">
          <Story userData={userData} />
        </div>
        <div className="col-md-4 d-none d-sm-none d-md-block">
          <UserDetails userData={userData} />
        </div>
      </div>
    </div>
  );
};

export default GeneraProfile;
