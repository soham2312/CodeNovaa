import { React, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BeatLoader } from "react-spinners";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/codenova.png";

const Registration = () => {
  const [loading, setLoading] = useState(false);

  // const [githubHandle, setGithubHandle] = useState("");
  // const [codeforcesHandle, setcodeforcesHandle] = useState("");
  // const [codechefHandle, setCodechefHandle] = useState("");
  // const [leetcodeHandle, setLeetcodeHandle] = useState("");
  // const [gfgHandle, setGfgHandle] = useState("");
  // const [college, setCollege] = useState("");
  // const [techStack, setTechStack] = useState("");

  let college = useRef(null);
  let githubHandle = useRef(null);
  let codeforcesHandle = useRef(null);
  let codechefHandle = useRef(null);
  let leetcodeHandle = useRef(null);
  let gfgHandle = useRef(null);
  let techStack = useRef(null);

  const register = async (e) => {
    e.preventDefault();
    college = college.current.value;
    githubHandle = githubHandle.current.value;
    codeforcesHandle = codeforcesHandle.current.value;
    codechefHandle = codechefHandle.current.value;
    leetcodeHandle = leetcodeHandle.current.value;
    gfgHandle = gfgHandle.current.value;
    techStack = techStack.current.value;

    console.log("register button clicked");
    console.log(college);
    console.log(githubHandle);
    console.log(codeforcesHandle);
    console.log(codechefHandle);
    console.log(leetcodeHandle);
    console.log(gfgHandle);
    console.log(techStack);

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userInfo")).token
          }`,
        },
      };
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/users/register",
        {
          college: college,
          githubHandle: githubHandle,
          codeforcesHandle: codeforcesHandle,
          codechefHandle: codechefHandle,
          leetcodeHandle: leetcodeHandle,
          gfgHandle: gfgHandle,
          techStack: techStack,
        },
        config
      );

      console.log(data);
      toast.success("registration successfull", {
        autoClose: 1000,
      });
      // console.log(data);
      setLoading(false);
    } catch (err) {
      toast.error("registration failed", {
        autoClose: 1000,
      });
    }
  };

  return (
    <div className="signup">
      <form className="signup-container">
        <img src={logo} />
        <h3 className="signup-welcome">Welcome</h3>
        <div className="signup-input">
          <input
            type="text"
            placeholder="college name"
            name="college"
            className="signup-username"
            ref={college}
          />
          <input
            type="text"
            placeholder="github username"
            name="githubHandle"
            className="signup-username"
            ref={githubHandle}
          />
          <input
            type="text"
            placeholder="codeforces username"
            name="codeforcesHandle"
            className="signup-username"
            ref={codeforcesHandle}
          />
          <input
            type="text"
            placeholder="codechef username"
            name="codechefHandle"
            className="signup-username"
            ref={codechefHandle}
          />
          <input
            type="text"
            placeholder="leetcode username"
            name="leetcodeHandle"
            className="signup-username"
            ref={leetcodeHandle}
          />
          <input
            type="text"
            placeholder="gfg username"
            name="gfgHandle"
            className="signup-username"
            ref={gfgHandle}
          />
          <input
            type="text"
            placeholder="Tech Stack : java c++ python javascript"
            name="techStack"
            className="signup-username"
            ref={techStack}
          />
        </div>
        <div>
          <button type="submit" className="btn-cta-orange" onClick={register}>
            {loading ? <BeatLoader color="#fff" /> : "Register"}
          </button>
        </div>
      </form>
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

export default Registration;
