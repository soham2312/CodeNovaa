import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import user from "../../assets/default.jpg";
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
  return (
    <div className="profile">
      <div className="profile-center">
        <div className="photo">
          <img src={user} alt="user" />
        </div>
        <div className="profile-platform">
          <Platform />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Me;
