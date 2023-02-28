import React, { useEffect, useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import { Helmet } from "react-helmet";
import axios from "axios";
import "./Discussion.css";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";

import DiscussionCard from "../../components/DiscussionCard/DiscussionCard";

const Discussion = () => {
  const { user, setUser } = ChatState();

  const [newDiscussion, setNewDiscussion] = useState("");
  const [discussion, setDiscussion] = useState([]);
  const [discussionName, setDiscussionName] = useState("");
  const [discription, setDiscription] = useState("");
  const [code, setCode] = useState("");
  const handleClick = async () => {
    if (!discussionName) {
      alert("Enter discussion Name");
    } else {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.post(
          `http://localhost:5000/api/v1/chat/create-discussion`,
          {
            chatName: discussionName,
            discription: discription,
            code: code,
          },
          config
        );
        setNewDiscussion(data);

        // console.log(data);
        setCode("");
        setDiscription("");
        setDiscussionName("");
      } catch (error) {
        console.log(error);
      }
    }
  };
  const pageLoad = async () => {
    // console.log("inside page load");
    // console.log(user);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userInfo")).token
          }`,
        },
      };
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/chat/discussion`,
        config
      );
      setDiscussion(data);
      //   console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  // window.addEventListener("beforeunload", pageLoad);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);

    pageLoad();
    // console.log("working");
  }, []);

  useEffect(() => {
    setDiscussion([...discussion, newDiscussion]);
  }, [newDiscussion]);

  return (
    <div className="discussion-page">
      <div className="discussion-Ask">
        <div className="discussion-question">
          <TextField
            id="filled-basic"
            label="Create New Discussion / Ask new question"
            variant="outlined"
            className="discussion-question-input"
            value={discussionName}
            onChange={(e) => {
              setDiscussionName(e.target.value);
            }}
          />
          <TextField
            id="filled-basic"
            label="Add description of question"
            variant="outlined"
            multiline
            value={discription}
            className="discussion-question-input"
            onChange={(e) => {
              setDiscription(e.target.value);
            }}
          />
          <TextField
            id="filled-multiline-static"
            label="Code"
            multiline
            variant="filled"
            value={code}
            className="discussion-question-input"
            onChange={(e) => {
              setCode(e.target.value);
            }}
          />
          <a className="btn-cta-orange" onClick={handleClick}>
            Create Discussion
          </a>
        </div>
      </div>
      <div className="discussion">
        {discussion ? (
          discussion.map((item) => (
            <DiscussionCard item={item} key={item._id} />
          ))
        ) : (
          <p>Loading...</p>
        )}
        {/* <DiscussionCard/> */}
      </div>
    </div>
  );
};
export default Discussion;
