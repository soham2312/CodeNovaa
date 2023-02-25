import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import userpic from "../../assets/default.jpg";
import { ChatState } from "../../context/ChatProvider";

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
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

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
