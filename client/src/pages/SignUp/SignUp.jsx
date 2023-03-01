import React, { useState } from "react";
import "./SignUp.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/_.png";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const SignUp = () => {
  const [show, setshow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleClick = () => setshow(!show);
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword || !password || !name) {
      toast({
        title: "Passwords do not match!",
        status: "warning",
        duration: 1000,
        isClosable: true,
        position: "bottom-right",
      });
      return;
    } else {
      try {
        const config = {
          headers: {
            "content-type": "application/json",
          },
        };
        const { data } = await axios.post(
          "http://localhost:5000/api/v1/users/signup",
          {
            name: name,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
          },
          config
        );
        console.log(data);
        const fdata = await data.token;
        if (res.status === 422 || !fdata) {
          toast({
            title: "Invalid Credentials!",
            status: "warning",
            duration: 1000,
            isClosable: true,
            position: "bottom-right",
          });
        } else {
          toast({
            title: "Account Created Successfully!",
            status: "success",
            duration: 1000,
            isClosable: true,
            position: "bottom-right",
          });
          setName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className="signup">
      <div className="signup-container">
        <img src={logo} />
        <h3 className="signup-welcome">Welcome</h3>
        <div className="signup-input">
          <input
            type="text"
            placeholder="username"
            name="username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="signup-username"
          />
          <input
            type="email"
            placeholder="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="signup-username"
          />
          <div className="signup-password">
            {show ? (
              <AiOutlineEyeInvisible
                className="btn-see"
                onClick={handleClick}
              />
            ) : (
              <AiOutlineEye className="btn-see" onClick={handleClick} />
            )}

            <input
              type={show ? "text" : "password"}
              placeholder="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="signup-username"
            />

            {/* <a
              h="1.75rem"
              size="sm"
              className="btn-cta-orange"
              onClick={handleClick}
            >
              {show ? "Hide" : "Show"}
            </a> */}
          </div>
          <input
            type={show ? "text" : "password"}
            placeholder="confirm password"
            name="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="signup-username"
          />
        </div>
        <a type="submit" className="btn-cta-orange" onClick={submitHandler}>
          Sign Up
        </a>
      </div>
      <div className="signup-footer">
        <p className="signup-footer-text">
          Already have an account?{" "}
          <Link to="/login" className="btn-cta-blue">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
