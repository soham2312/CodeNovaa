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
      toast.error("Passwords do not match!", {
        autoClose: 1000,
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
          toast.error("invalid credentials", {
            autoClose: 1000,
          });
        } else {
          toast.success("Account Created Successfully!", {
            autoClose: 1000,
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
              <AiOutlineEye className="btn-see" onClick={handleClick} />
            ) : (
              <AiOutlineEyeInvisible
                className="btn-see"
                onClick={handleClick}
              />
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
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default SignUp;
