import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, Outlet, Link, useParams } from "react-router-dom";
import userpic from "../../assets/default.jpg";
import FriendRequest from "../../components/FriendRequest/FriendRequest";
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
  const [isTrue, setIsTrue] = useState(false);
  const [request, setRequest] = useState(false);
  const [alreadyFriend, setAlreadyFriend] = useState(false);
  // console.log(slug);

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
        `http://localhost:5000/api/v1/users/${slug}`,

        config
      );

      console.log(data.user);
      setViewUser(data.user[0]);

      const frnd = data.user[0].friends
        ? data.user[0].friends.includes(
            JSON.parse(localStorage.getItem("userInfo")).data.user._id
          )
        : false;
      if (frnd) {
        setAlreadyFriend(true);
      }

      const requested = data.user[0].friendsRequest
        ? data.user[0].friendsRequest.includes(
            JSON.parse(localStorage.getItem("userInfo")).data.user._id
          )
        : false;
      if (requested) {
        setRequest(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const makeFriend = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userInfo")).token
          }`,
        },
      };
      const { data } = await axios.post(
        `http://localhost:5000/api/v1/users/make-friend`,
        { friendId: viewUser._id },

        config
      );
      setIsTrue(true);
      console.log(data);
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
      {JSON.parse(localStorage.getItem("userInfo")).data.user._id !==
      (viewUser ? viewUser._id : "") ? (
        ""
      ) : (
        <button className="btn-cta-green">Edit Profile</button>
      )}
      {JSON.parse(localStorage.getItem("userInfo")).data.user._id !==
      (viewUser ? viewUser._id : "") ? (
        alreadyFriend ? (
          "Your are friends"
        ) : request ? (
          "already Requested"
        ) : isTrue ? (
          "Request sent"
        ) : (
          <button className="btn-cta-orange" onClick={makeFriend}>
            Make Connection
          </button>
        )
      ) : (
        ""
      )}

      {JSON.parse(localStorage.getItem("userInfo")).data.user._id ===
      (viewUser ? viewUser._id : "") ? (
        <div className="friendRequests">
          {viewUser.friendsRequest
            ? viewUser.friendsRequest.map((item) => (
                <FriendRequest item={item} key={item._id ? item._id : ""} />
              ))
            : ""}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Me;
