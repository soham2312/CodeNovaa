import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import user from "../../assets/default.jpg";
import "./Me.css";

const Platform = () => (
  <>
    <div className="link">
      <p>
        <Link to="/me/github" className="link2">
          Github
        </Link>
      </p>
    </div>
    <div className="link">
      <p>
        <Link to="/me/codeforces" className="link2">
          Codeforces
        </Link>
      </p>
    </div>
    <div className="link">
      <p>
        <Link to="/me/codechef" className="link2">
          Codechef
        </Link>
      </p>
    </div>
    <div className="link">
      <p>
        <Link to="/me/leetcode" className="link2">
          Leetcode
        </Link>
      </p>
    </div>
    <div className="link">
      <p>
        <Link to="/me/geeksforgeeks" className="link2">
          GFG
        </Link>
      </p>
    </div>
  </>
);

const Me = () => {
  return (
    <div className="profile">
      <Header />
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
