import React from "react";
import Logout from "../logout";

const ProfileItem = props => {
  switch (props.displayProfile) {
    case "Log Out":
      return <Logout />
    default:
      return "";
  }
}

export default ProfileItem;
