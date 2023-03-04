import React, { Fragment } from "react";
import user from "../../assets/default.jpg";
import { Link, NavLink, redirect, useNavigate } from "react-router-dom";
import userpic from "../../assets/default.jpg";
import { ChatState } from "../../context/ChatProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Header.css";
// import "./tempheader.css";
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
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    toast.error("You have been logged out", {
      autoClose: 1000,
    });
  };

  return (
    <div className="header">
      <Link to="/" className="logo">
        {"<Code Smashers />"}
      </Link>
      <Menu />
      <Link to={`profile/${user ? user.data.user.name : ""}`} className="user">
        <p>{user ? user.data.user.name : <Link to="/login">login</Link>}</p>
        <img src={userpic} alt="user" className="user-img" />
      </Link>
      <div onClick={handleLogout} style={{ cursor: "pointer" }}>
        Logout
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Header;
