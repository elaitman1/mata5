import React from "react";

const Navbar = props => {
  const navbarText =
    props.displayChat || props.displayCamera
      ? props.displayCamera ? "Scanner" : props.displayChat[1]
      : "";
  const navbarLeft =
    props.displayChat || props.displayCamera ? (
      <span className="back-icon" onClick={props.hideChat}>
        &lsaquo;
      </span>
    ) : (
      <img
        className="logo"
        src="./assets/logo.png"
        alt="Logo"
        onClick={() => props.toggleNavbarMenu("chat")}
      />
    );
  const navbarRight = (
    <div className="navbar-icons">
      <img
        src="./assets/menu.png"
        alt="Menu"
        onClick={() => props.toggleNavbarMenu("profile")}
      />
    </div>
  );

  return (
    <div id="nav" className="navbar">
      {navbarLeft}
      <h4>{navbarText}</h4>
      {navbarRight}
    </div>
  );
};

export default Navbar;
