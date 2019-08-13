import React from "react";

const Logout = props => {
  return (
    <div className="logout-container">
      <img src="./assets/logoutIllustration.png" alt="Logout Illustration" />
      <p>Are You Sure You Want To Log Out?</p>
      <div>
        <button>Leave</button>
        <button>Cancel</button>
      </div>
    </div>
  )
}

export default Logout;
