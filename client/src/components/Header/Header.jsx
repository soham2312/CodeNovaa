import React from "react";
import { Link } from "react-router-dom";
import user from "../../assets/default.jpg";
import "./Header.css";

const Menu = () => (
  <>
    <div className="link">
      <p>
        <Link to="/questions" className="link2">
          Questions
        </Link>
      </p>
    </div>
    <div className="link">
      <p>
        <Link to="/discussion" className="link2">
          Discussion
        </Link>
      </p>
    </div>
    <div className="link">
      <p>
        <Link to="/chat" className="link2">
          Chat
        </Link>
      </p>
    </div>
    <div className="link">
      <p>
        <Link to="/social" className="link2">
          Social
        </Link>
      </p>
    </div>
  </>
);

const Header = () => {
  return (
    <div className="main-head">
      <div className="codepro">
        <Link to="/"> Code Pro</Link>
      </div>
      <div className="head">
        <Menu />
      </div>
      <Link to="/me" className="me">
        <div className="name">Sudheer Dagar</div>
        <div className="photo">
          <img src={user} alt="" />
        </div>
      </Link>
    </div>
  );
};

export default Header;
