import React from "react";
import "../Components/Navbar.css";
import logo from "../images/logo-app.png";

export default function Navbar() {
  return (
    <nav className="navbar-container">
      <img className="logo-img" src={logo} alt="logo" />
      <p className="appname-container">Weather App</p>
    </nav>
  );
}
