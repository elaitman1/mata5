import React from "react";

const Logout = props => {
  return (
    <div className="logout-container">
      <img src="./assets/logoutIllustration.png" alt="Logout Illustration" />
      <p>Are You Sure You Want To Log Out?</p>
      <div className="logout-buttons-container">
        <button className="form-submit-button">Leave</button>
        <button className="form-submit-button grey">Cancel</button>
      </div>
    </div>
  )
}

export default Logout;
