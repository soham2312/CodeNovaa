import React, { Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import user from "../../assets/default.jpg";
// import "./Header.css";
import "./tempheader.css";
// import { IoNewspaper } from "react-icons/io5";

const Menu = () => {
  return (
    <div className="menu">
      <NavLink to="/" className="menu-link">
        Questions
      </NavLink>
      <NavLink to="discusssion" className="menu-link">
        Discussion
      </NavLink>
      <NavLink to="chat" className="menu-link">
        Chat
      </NavLink>
      <NavLink to="social" className="menu-link">
        Social
      </NavLink>
    </div>
  );
};

const Header = () => {
  return (
    <div className="header">
      <Link to="/" className="logo">
        {"<Code Smashers />"}
      </Link>
      <Menu />
      <Link to="/me" className="user">
        <p>Swati Dagar</p>
        <img src={user} alt="user" className="user-img" />
      </Link>
    </div>
  );
};

export default Header;
