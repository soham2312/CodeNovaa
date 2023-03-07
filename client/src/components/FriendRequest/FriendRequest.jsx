import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FriendRequest.css";

const FriendRequest = ({ item }) => {
  const navigate = useNavigate();
  const [color, setColor] = useState(item.isResolved ? item.isResolved : false);
  const handleAccept = () => {};
  const handleDecline = () => {};
  return (
    <div className="question">
      <div className="question-txt">
        <p>Requested By:</p>
        <h3>{item.name ? item.name : ""}</h3>
        {/* <h5>{item.chatId ? item.chatId.discription : ""}</h5> */}
      </div>

      <button className="btn" onClick={handleAccept}>
        Accept
      </button>
      <button className="btn" onClick={handleDecline}>
        Decline
      </button>
    </div>
  );
};

export default FriendRequest;
