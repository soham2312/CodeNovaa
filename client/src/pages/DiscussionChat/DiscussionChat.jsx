import { React, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md ";

import { BiUpvote, BiDownvote, BiComment } from "react-icons/bi";
import { BsThreeDotsVertical, BsShare, BsBookmark } from "react-icons/bs";
import { GoReport } from "react-icons/go";
import { RxCross1 } from "react-icons/rx";
import "./DiscussionChat.css";
import utkarsh from "../../assets/utkarsh.jpg";

const DiscussionChat = () => {
  const [open, setOpen] = useState(false);

  // update this
  const [up, setUp] = useState(0);
  const [down, setDown] = useState(0);
  //
  const openPopup = () => {
    setOpen(!open);
  };

  const { slug } = useParams();
  const navigate = useNavigate();

  const back = () => {
    navigate(-1);
  };

  const faltu = () => {
    console.log("");
  };

  console.log(slug);

  return (
    <div>
      <div className="back-button" onClick={back}>
        <MdArrowBackIos />
      </div>
      <div className="discussion-chat-question">
        <div className="discussion-chat-question-content">
          <h2>How to center a Div?</h2>
          <p>
            Hey I know to center div using flex property but I want to implement
            it using some other method...
          </p>
          <pre className="discussion-chat-question-code">
            <code>
              {`.discussion-chat-question {
  display: flex;
  flex-direction: column;
  gap: 25px;
}
`}
            </code>
          </pre>
        </div>
        <div className="discussion-chat-question-line"></div>

        <div className="discussion-card-datas">
          <div className="discussion-card-data">
            <div className="discussion-card-upvote" onClick={faltu}>
              <BiUpvote className="discussion-icon" /> <p>{up}</p>
            </div>
            <div className="discussion-card-downvote" onClick={faltu}>
              <BiDownvote className="discussion-icon" /> <p>{down}</p>
            </div>
            <div className="discussion-card-comment">
              <Link
                // to={item ? item.slug : "/"}
                to="/"
                className="discussion-card-comment-link"
              >
                <BiComment className="discussion-icon" />
                <p>4</p>
              </Link>
              <img src={utkarsh} alt="" />
              <img src={utkarsh} alt="" />
              <img src={utkarsh} alt="" />
              <img src={utkarsh} alt="" />
            </div>
          </div>
          {/* {user.data.user.role === "admin" ? (
              <AiTwotoneDelete onClick={handleDelete} />
            ) : (
              ""
            )} */}
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
    </div>
  );
};

export default DiscussionChat;
