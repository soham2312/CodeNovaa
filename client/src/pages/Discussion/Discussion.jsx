import React, { useEffect, useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import { Helmet } from "react-helmet";
import axios from "axios";
import "./Discussion.css";
import { Link } from "react-router-dom";
import DiscussionCard from "../../components/DiscussionCard/DiscussionCard";

const Discussion = () => {
  const { user } = ChatState();

  const [newDiscussion, setNewDiscussion] = useState("");
  const [discussion, setDiscussion] = useState([]);
  const [discussionName, setDiscussionName] = useState("");
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
          },
          config
        );
        setNewDiscussion(data);

        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const pageLoad = async () => {
    // console.log(user);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
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

  useEffect(() => {
    pageLoad();
  }, []);

  useEffect(() => {
    setDiscussion([...discussion, newDiscussion]);
  }, [newDiscussion]);

  return (
    <div>
      <div className="discussion-Ask">
        <h4>Home</h4>
        <div className="discussion-question">
          <input
            type="text"
            className="discussion-question-input"
            placeholder="Create New discussion"
            value={discussionName}
            onChange={(e) => {
              setDiscussionName(e.target.value);
            }}
          />
        </div>
        <button className="btn" onClick={handleClick}>
          Create
        </button>
      </div>
      <div className="discussion">
        {discussion ? (
          discussion.map((item) => <DiscussionCard item={item} />)
        ) : (
          <p>Loading...</p>
        )}
        {/* <DiscussionCard/> */}
      </div>
    </div>
  );
};
export default Discussion;
