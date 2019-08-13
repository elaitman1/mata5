import React from "react";

const Navbar = props => {
  let navbarText;
  if (props.displayChat || props.displayProfile || props.displayCamera) {
    if (props.displayCamera) {
      navbarText = "Scanner";
    } else if (props.displayChat) {
      navbarText = props.displayChat[1];
    } else if (props.displayProfile) {
      navbarText = props.displayProfile;
    }
  }

  let navbarLeft;
  if (props.displayChat || props.displayCamera) {
    navbarLeft = (
      <span className="back-icon" onClick={props.hideChat}>
        &lsaquo;
      </span>
    );
  } else if (props.displayProfile) {
    navbarLeft = (
      <span className="back-icon" onClick={props.hideProfile}>
        &lsaquo; Back
      </span>
    );
  } else {
    navbarLeft = (
      <img
        className="logo"
        src="./assets/logo.png"
        alt="Logo"
        onClick={() => props.toggleNavbarMenu("chat")}
      />
    );
  }

  const navbarRight = !props.displayProfile ? (
    <div className="navbar-icons">
      <img
        src="./assets/menu.png"
        alt="Menu"
        onClick={() => props.toggleNavbarMenu("profile")}
      />
    </div>
  ) : (
    ""
  );

  const className = props.displayProfile ? "navbar profile" : "navbar";
  return (
    <div id="nav" className={className}>
      {navbarLeft}
      <h4>{navbarText}</h4>
      {navbarRight}
    </div>
  );
};

export default Navbar;
