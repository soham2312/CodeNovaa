import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FriendCard.css";

const FriendCard = ({ item }) => {
  const navigate = useNavigate();
  const handleChat = async () => {
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
        `https://codenova-api.onrender.com/api/v1/chat`,
        { userId: item._id },
        config
      );

      console.log(data);
      navigate("/chat");
    } catch (error) {
      console.error(error);
    }
  };
  //   const [color, setColor] = useState(item.isResolved ? item.isResolved : false);

  return (
    <div className="question">
      <div className="question-txt">
        {/* <p>Requested By:</p> */}
        <div className="profile-pic-2">
          <img src={item.photo ? item.photo : ""} alt="user-image" />
        </div>
        <h3>{item.name ? item.name : ""}</h3>
        {/* <h5>{item.chatId ? item.chatId.discription : ""}</h5> */}
        <button className="btn-cta-orange" onClick={handleChat}>
          Chat
        </button>
      </div>
    </div>
  );
};

export default FriendCard;
