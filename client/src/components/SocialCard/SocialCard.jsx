import React from "react";
import { Link } from "react-router-dom";
import codeforces from "../../assets/codeforces.png";
import leetcode from "../../assets/leetcode.png";
import utkarsh from "../../assets/utkarsh.jpg";
import "./SocialCard.css";

const SocialCard = ({ user }) => {
  return (
    <div className="socialcard">
      <div className="socialcard-image">
        <img src={utkarsh} alt="user-image" />
      </div>
      <div className="socialcard-details">
        <div className="socialcard-user">{user.name}</div>
        <div className="socialcard-user-rating">
          <img src={leetcode} alt="leetcode" />
          310 Problems
        </div>
        <div className="socialcard-user-rating">
          <img src={codeforces} alt="codeforces" />
          <div>9780 rating</div>
        </div>
        <Link to="/me" className="btn-round">
          show profile
        </Link>
      </div>
    </div>
  );
};

export default SocialCard;
