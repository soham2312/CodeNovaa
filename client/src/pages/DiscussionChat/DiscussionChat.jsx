import React from "react";
import { useParams } from "react-router";

const DiscussionChat = () => {
  const { slug } = useParams();
  console.log(slug);
  return <div>DiscussionChat</div>;
};

export default DiscussionChat;
