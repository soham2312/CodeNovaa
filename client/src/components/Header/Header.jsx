import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import user from "../../assets/default.jpg";
// import "./Header.css";
import "./tempheader.css";
// import { IoNewspaper } from "react-icons/io5";

const Menu = () => {
  return (
    <div className="menu">
      <Link to="questions" className="menu-link">
        Questions
      </Link>
      <Link to="discusssion" className="menu-link">
        Discussion
      </Link>
      <Link to="chat" className="menu-link">
        Chat
      </Link>
      <Link to="social" className="menu-link">
        Social
      </Link>
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
        <p>Topa Tiwari</p>
        <img src={user} alt="user" className="user-img" />
      </Link>
    </div>
  );
};

export default Header;
