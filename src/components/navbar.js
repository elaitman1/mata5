import React from 'react';

const Navbar = () => {
  return (
    <div className="navbar">
      <img className="logo" src="./assets/logo.png" alt="Logo"/>
      <div className="navbar-icons">
        <img src="./assets/search.png" alt="Search"/>
        <img src="./assets/refresh.png" alt="Refresh"/>
        <img src="./assets/menu.png" alt="Menu"/>
      </div>
    </div>
  )
}

export default Navbar;
