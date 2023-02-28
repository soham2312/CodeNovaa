import React, { useState } from "react";
import "./Login.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

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
    <div className="login">
      <div>
        <h3>Login</h3>
        <form>
          <div>
            <label>Username</label>
            <input
              type="text"
              placeholder="username"
              name="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button type="submit" className="btn" onClick={login}>
            Login
          </button>
          <div className="msg">
            <p>Don't have an Account?</p>
            <Link exact="true" to="/Signup" className="msg-link">
              SignUp
            </Link>
          </div>
        </form>
        <p>{loginstatus}</p>
      </div>
    </div>
  );
};

export default Login;
