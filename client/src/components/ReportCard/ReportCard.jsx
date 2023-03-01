import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./ReportCard.css";

const ReportCard = ({ item }) => {
  const navigate = useNavigate();
  const handleChat = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userInfo")).token
          }`,
        },
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/v1/chat",
        { userId: item.sender._id },
        config
      );
      //   console.log(data);
      navigate("/chat");
      // console.log(data);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="question">
      <div className="question-txt">
        <h3>{item.chatId ? item.chatId.chatName : ""}</h3>
        <p>Discription:</p>
        <h5>{item.chatId ? item.chatId.discription : ""}</h5>
        <p>Report arrised by</p>
        <h3>{item.sender ? item.sender.name : ""}</h3>
        <p>Report is</p>
        <h4>{item.content ? item.content : ""}</h4>
      </div>
      <p className="question-level">Easy</p>
      <p className="question-acceptance">69.69%</p>
      <button className="btn" onClick={handleChat}>
        Chat with the person
      </button>
    </div>
  );
};

export default ReportCard;
