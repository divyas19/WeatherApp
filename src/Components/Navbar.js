import React from "react";
import "../Components/Navbar.css";
import logo from "../images/logo-app.png";

export default function Navbar() {
  return (
    <div className="navbar-parent-container">
      <div className="navbar-child-container1">
        <img className="logo-img" src={logo} alt="logo" />
        <p className="appname-container1">Weather App</p>
      </div>
    </div>
  );
}
