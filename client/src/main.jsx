import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import ChatProvider from "./context/ChatProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChatProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ChatProvider>
);
