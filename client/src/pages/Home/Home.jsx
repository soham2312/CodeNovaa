import React from "react";
import Question from "../../components/Question/Question";
import SocialCard from "../../components/SocialCard/SocialCard";
import Discussion from "../../components/Discussion/Discussion";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <Question />
      <SocialCard />
      <Discussion />
      <Link to="me">profile</Link>
    </div>
  );
};

export default Home;
