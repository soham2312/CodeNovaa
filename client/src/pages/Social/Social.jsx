import React, { useEffect, useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import { Helmet } from "react-helmet";
import axios from "axios";

import "./Social.css";

const Social = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, chats, setChats, setSelectedChat } = ChatState();

  const handleSearch = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `http://localhost:5000/api/v1/users?search=${search}`,
        config
      );
      setSearchResult(data);
      console.log(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleSearch();
  }, [search]);

  return (
    <div>
      <Helmet>
        <title>CodeSmashers | Social</title>
      </Helmet>
      <div className="social-middle">
        <label>Search for user</label>
        <input
          type="text"
          placeholder="search for user"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default Social;
