import React from "react";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="nav-container">
      <div className="nav-items-container">
        <h1 className="nav-heading">Resorts</h1>
        <div className="nav-heading-items">
          <Link to="/" className="link">
            <h1>Home</h1>
          </Link>
          <Link to="rooms" className="link">
            <h1>Rooms</h1>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
