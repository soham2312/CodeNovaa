import React from "react";
import "./DiscussionCard.css";
import utkarsh from "../../assets/utkarsh.jpg";
import { Link } from "react-router-dom";

const DiscussionCard = ({ item }) => {
  return (
    <div className="discussion-card">
      <div className="discussion-content">
        <p className="discussion-content-question">{item.chatName}</p>
        <div className="discussion-chat-user-img">
          <img src={utkarsh} alt="utkarsh" />
          <img src={utkarsh} alt="utkarsh" />
          <img src={utkarsh} alt="utkarsh" />
          <img src={utkarsh} alt="utkarsh" />
        </div>
      </div>
      <Link to="/" className="btn-discussion">
        Join Discussion
      </Link>
    </div>
  );
};

export default DiscussionCard;
