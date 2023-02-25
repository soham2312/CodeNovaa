import React, { useState } from "react";
import { BrowserRouter, Route, Link, Router, Routes } from "react-router-dom";
import About from "./pages/About";
import Me from "./pages/Me/Me";
import Header from "./components/Header/Header";
import Codeforces from "./components/platform/Codeforces";
import Github from "./components/platform/Github";
import Leetcode from "./components/platform/Leetcode";
import Home from "./pages/Home";
import Codechef from "./components/platform/Codechef";
import Chat from "./pages/Chat/Chat";
import Login from "./pages/Login/Login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="about" element={<About />} />
          <Route path="" element={<Home />} />
          <Route path="chat" element={<Chat />} />
          <Route path="login" element={<Login />} />
          <Route path="me" element={<Me />}>
            <Route path="codeforces" element={<Codeforces />} />
            <Route path="codechef" element={<Codechef />} />
            <Route path="leetcode" element={<Leetcode />} />
            <Route path="github" element={<Github />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
