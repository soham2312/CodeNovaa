import React, { useState } from "react";
import "./Login.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/_.png"
import {BsGoogle,BsGithub,BsLinkedin} from "react-icons/bs"

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginstatus, setloginstatus] = useState("");

  const login = async (e) => {
    e.preventDefault();
    console.log(username);
    console.log(password);

    if (!password || !username) {
      alert("enter all the field");
    } else {
      try {
        const config = {
          headers: {
            "content-type": "application/json",
          },
        };
        const { data } = await axios.post(
          "http://localhost:5000/api/v1/users/login",
          { email: username, password: password },
          config
        );
        const fdata = await data.token;
        if (fdata) {
          console.log(data);
          localStorage.setItem("userInfo", JSON.stringify(data));
          navigate("/me");
        } else {
          throw new Error("Invalid");
        }
      } catch (err) {
        alert(err);
      }
    }
  };

  return (
    <div className="login-container">
    <div className="login">
      
        <img src={logo}/>
        <h3 className="login-welcome">Welcome Back</h3>
        <div className="login-input">
          <div className="login-username">
            <input
              type="text"
              placeholder="username"
              name="username"
              className="login-input-box"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="login-password">
            <input
              type="password"
              placeholder="Password"
              className="login-input-box"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          
        </div>
        <a type="submit" className="btn-cta-orange" onClick={login}>
            Login
          </a>
          <div className="login-options">
               <BsGoogle className="login-google"/>
               <BsGithub className="login-github"/>
               <BsLinkedin className="login-linkedin"/>
          </div>
          <div className="login-forgot">
            <Link exact="true" to="/forgotpassword" className="login-forgot-link">
              Forgot Password
            </Link>
            </div>
         
        <p>{loginstatus}</p>
    </div>
     <div className="login-signup">
      <div className="login-signup-text">Don't have an account?</div>
     <Link exact="true" to="/signup" className="login-signup-link">
       <a className="btn-cta-blue">Sign Up</a>
     </Link>
   </div>
   </div>
  );
};

export default Login;
