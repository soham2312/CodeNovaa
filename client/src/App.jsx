import React, { useState } from "react";
import { BrowserRouter, Route, Link, Router, Routes } from "react-router-dom";
import About from "./pages/About";
import Me from "./pages/Me/Me";
import Header from "./components/Header/Header";
import Codeforces from "./components/platform/Codeforces";
import Github from "./components/platform/Github";
import Leetcode from "./components/platform/Leetcode";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="about" element={<About />} />
          <Route path="me" element={<Me />}>
            <Route path="codeforces" element={<Codeforces />} />
            <Route path="leetcode" element={<Leetcode />} />
            <Route path="github" element={<Github />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
