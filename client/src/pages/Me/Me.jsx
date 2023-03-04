import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, Outlet, Link, useParams } from "react-router-dom";
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
  const { slug } = useParams();
  const { user } = ChatState();
  const [viewUser, setViewUser] = useState(null);
  console.log(slug);

  const pageLoad = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userInfo")).token
          }`,
        },
      };
      const { data } = await axios.get(
        `https://codenova-api.onrender.com/api/v1/users/${slug}`,

        config
      );

      console.log(data.user);
      setViewUser(data.user[0]);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    pageLoad();
  }, []);
  return (
    <div className="profile">
      <div className="profile-center">
        <div className="photo">
          <img src={userpic} alt="user" />
        </div>
        {JSON.parse(localStorage.getItem("userInfo")).data.user.role ===
        "admin" ? (
          // <button className="btn">View Chats</button>

          <Link to="/admin-chats">View Chats</Link>
        ) : (
          // <Link to="/view-reports">View Reports</Link>
          ""
        )}
        {JSON.parse(localStorage.getItem("userInfo")).data.user.role ===
        "admin" ? (
          <Link to="/view-reports">View Reports</Link>
        ) : (
          ""
        )}

        <div className="profile-platform">
          <Platform />
        </div>
        <Outlet />
      </div>
      <h1>{viewUser ? viewUser.name : ""}</h1>
    </div>
  );
};

export default Me;
