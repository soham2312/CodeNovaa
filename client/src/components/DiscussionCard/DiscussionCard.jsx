import React, { useState } from "react";
import "./DiscussionCard.css";
import utkarsh from "../../assets/utkarsh.jpg";
import { Link } from "react-router-dom";
import { BiUpvote, BiDownvote, BiComment } from "react-icons/bi";
import { BsThreeDotsVertical, BsShare, BsBookmark } from "react-icons/bs";
import { GoReport } from "react-icons/go";
import { RxCross1 } from "react-icons/rx";

const DiscussionCard = ({ item }) => {
  const [open, setOpen] = useState(false);
  const openPopup = () => {
    setOpen(!open);
  };
  return (
    <div className="discussion-card">
      <div className="discussion-card-content">
        <div className="discussion-card-ques">
          <p>{item.name}</p>
          <p className="discussion-card-question">
            Microsoft Online Assessment Questions
          </p>
          <div>
            <p className="discussion-card-text">created by</p>
            <img src={utkarsh} alt="utkarsh" />
            <h4>Utkarsh Raj</h4>
          </div>
        </div>
        <Link to="/" className="btn-cta-orange">
          Join Discussion
        </Link>
      </div>
      <div className="discussion-card-line"></div>

      <div className="discussion-card-datas">
        <div className="discussion-card-data">
          <div className="discussion-card-upvote">
            <BiUpvote className="discussion-icon" /> <p>3939</p>
          </div>
          <div className="discussion-card-downvote">
            <BiDownvote className="discussion-icon" /> <p>32</p>
          </div>
          <Link to="/" className="discussion-card-comment">
            <BiComment className="discussion-icon" />
            <p>4</p>
            <img src={utkarsh} alt="" />
            <img src={utkarsh} alt="" />
            <img src={utkarsh} alt="" />
            <img src={utkarsh} alt="" />
          </Link>
        </div>
        <div className="discussion-card-dropdown" onClick={openPopup}>
          {open ? <RxCross1 /> : <BsThreeDotsVertical />}
          {open && (
            <div className="discussion-dropdown">
              <div>
                <BsShare /> Share
              </div>
              <div>
                <BsBookmark /> Bookmark
              </div>
              <div>
                <GoReport /> Report
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiscussionCard;
