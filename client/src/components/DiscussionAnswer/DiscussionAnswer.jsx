import { React, useState } from "react";
import utkarsh from "../../assets/utkarsh.jpg";
import { BiUpvote, BiDownvote, BiCopy } from "react-icons/bi";
import "./DiscussionAnswer.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiTwotoneDelete } from "react-icons/ai";
import axios from "axios";

const DiscussionAnswer = ({ item }) => {
  const [up, setUp] = useState(0);
  const [down, setDown] = useState(0);

  const handleClick = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userInfo")).token
          }`,
        },
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/v1/admin/delete-message",
        { messageId: item._id },
        config
      );
      console.log(data);

      // console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="discussion-answer">
      <div className="discussion-answer-text">
        {/* <p>
          Just add this CSS content into your CSS file. It will automatically
          center the content. Align horizontally to center in CSS:
        </p> */}
        <p>{item.content ? item.content : ""}</p>
      </div>

      <pre
        className="discussion-chat-question-code"
        onClick={(e) => {
          e.preventDefault();
          navigator.clipboard.writeText(e.target.textContent);
          toast.success("Text copied!", {
            autoClose: 1000,
          });
        }}
      >
        <code>{`${item.code ? item.code : ""}`}</code>
        <BiCopy className="copy-icon" />
      </pre>

      <div className="discussion-answer-details">
        <div>
          <img src={utkarsh} alt="utkarsh" />
          {/* <p>Utkarsh Raj</p> */}
          <p>{item.sender ? item.sender.name : ""}</p>
        </div>
        <div className="discussion-answer-details-date">
          <p>posted on May 11, 2020 at 21:57</p>
          {JSON.parse(localStorage.getItem("userInfo")).data.user.role ===
          "admin" ? (
            <AiTwotoneDelete onClick={handleClick} />
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="discussion-answer-line"></div>
      <div className="discussion-answer-data">
        <div className="discussion-card-upvote">
          <BiUpvote className="discussion-icon" /> <p>{up}</p>
        </div>
        <div className="discussion-card-downvote">
          <BiDownvote className="discussion-icon" /> <p>{down}</p>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default DiscussionAnswer;