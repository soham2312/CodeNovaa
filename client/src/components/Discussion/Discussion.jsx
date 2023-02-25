import React from "react";
import "./Discussion.css";
import utkarsh from "../../assets/utkarsh.jpg";
import { Link } from "react-router-dom";

const Discussion = () => {
  return (
    <div className="discussion">
      <div className="discussion-content">
        <p className="discussion-content-question">
          Microsoft Online Assessment Questions
        </p>
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

export default Discussion;
