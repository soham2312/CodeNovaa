import { createContext, useContext, useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
    if (!userInfo) {
      // navigate("/login");
      alert("n");
    }
  }, []);

  return (
    <ChatContext.Provider
      value={{ user, setUser, chats, setChats, selectedChat, setSelectedChat }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
