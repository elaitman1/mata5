import React from 'react';

const Navbar = props => {
  return (
    <div id="nav" className="navbar">
      <img className="logo" src="./assets/logo.png" alt="Logo" onClick={props.toggleChat}/>
      <div className="navbar-icons">
        <img src="./assets/menu.png" alt="Menu"/>
      </div>
    </div>
  )
}

export default Navbar;
