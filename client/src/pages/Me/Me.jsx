import React, { useState } from "react";
import { NavLink, Outlet, Link } from "react-router-dom";
import userpic from "../../assets/default.jpg";
import { ChatState } from "../../context/ChatProvider";
import "./Me.css";

const Platform = () => (
  <div className="platform">
    <NavLink to="/me/github" className="platform-link">
      Github
    </NavLink>
    <NavLink to="/me/codeforces" className="platform-link">
      Codeforces
    </NavLink>
    <NavLink to="/me/codechef" className="platform-link">
      Codechef
    </NavLink>
    <NavLink to="/me/leetcode" className="platform-link">
      Leetcode
    </NavLink>
    <NavLink to="/me/geeksforgeeks" className="platform-link">
      GFG
    </NavLink>
  </div>
);

const Me = () => {
  const { user } = ChatState();

  return (
    <div className="profile">
      <div className="profile-center">
        <div className="photo">
          <img src={userpic} alt="user" />
        </div>
        {user.data.user.role === "admin" ? (
          // <button className="btn">View Chats</button>
          <Link to="/admin-chats">View Chats</Link>
        ) : (
          <p></p>
        )}
        <div className="profile-platform">
          <Platform />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Me;
