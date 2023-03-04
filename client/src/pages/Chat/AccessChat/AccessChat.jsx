import React, { useEffect, useState } from "react";
import { ChatState } from "../../../context/ChatProvider";
import "./AcessChat.css";

import axios from "axios";
import {
  isSameSender,
  isLastMessage,
  isSameSenderMargin,
  isSameUser,
} from "../../../context/ChatLogics";
const AccessChat = ({ messages, setMessages, socket, selectedChatCompare }) => {
  //   const [messages, setMessages] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const fetchMessages = async () => {
    if (!selectedChat) {
      return;
    }
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `https://codenova-api.onrender.com/api/v1/message/${selectedChat._id}`,
        config
      );
      socket.emit("join chat", selectedChat._id);
      setMessages(data);
      // console.log(user);
      //   console.log(data[0].content);
      //   console.log(data[1].content);
      //   setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket
      ? socket.on("message recieved", (newMessageReceived) => {
          // console.log("oooooooooooooooooooooooooooooooooooooooooooooooo");
          if (
            !selectedChatCompare ||
            selectedChatCompare._id !== newMessageReceived.chat._id
          ) {
            //notification
          } else {
            // console.log(newMessageReceived);
            setMessages([...messages, newMessageReceived]);
          }
        })
      : "";
  });
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
      }}
      className="chatBox"
    >
      {messages ? (
        messages.map((m, i) => (
          <div className="right" style={{ display: "flex" }} key={m._id}>
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user.data.user._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
                marginLeft: isSameSenderMargin(
                  messages,
                  m,
                  i,
                  user.data.user._id
                ),
                marginTop: isSameUser(messages, m, i, user.data.user._id)
                  ? 3
                  : 10,
              }}
            >
              {m.content}
            </span>
          </div>
        ))
      ) : (
        <p>Loading..</p>
      )}
    </div>
  );
};

export default AccessChat;
