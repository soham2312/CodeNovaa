import React, { Fragment } from "react";
import user from "../../assets/default.jpg";
import { Link, NavLink } from "react-router-dom";
import userpic from "../../assets/default.jpg";
import { ChatState } from "../../context/ChatProvider";

// import "./Header.css";
import "./tempheader.css";
// import { IoNewspaper } from "react-icons/io5";

const Menu = () => {
  return (
    <div className="menu">
      <NavLink to="/" className="menu-link">
        Questions
      </NavLink>
      <NavLink to="discussion" className="menu-link">
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
  const { user } = ChatState();

  return (
    <div className="header">
      <Link to="/" className="logo">
        {"<Code Smashers />"}
      </Link>
      <Menu />
      <Link to="/me" className="user">
        <p>{user ? user.data.user.name : <Link to="/login">login</Link>}</p>
        <img src={userpic} alt="user" className="user-img" />
      </Link>
    </div>
  );
};

export default Header;
