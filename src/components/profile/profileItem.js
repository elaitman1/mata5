import React from "react";
import Logout from "../logout";

const ProfileItem = props => {
  switch (props.displayProfile) {
    case "Logout":
      return <Logout />
    default:
      return "";
  }
}

export default ProfileItem;
