import React, { useEffect, useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import { Helmet } from "react-helmet";
import axios from "axios";

import "./Social.css";
import SocialCard from "../../components/SocialCard/SocialCard";

const Social = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = ChatState();

  const handleSearch = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userInfo")).token
          }`,
        },
      };

      const { data } = await axios.get(
        `https://codenova-api.onrender.com/api/v1/users?search=${search}`,
        config
      );
      setSearchResult(data.users);
      // console.log(data.users);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    handleSearch();
  }, [search]);

  return (
    <div>
      <Helmet>
        <title>CodeNova | Social</title>
      </Helmet>
      <div className="social-middle">
        <label>Search for user</label>
        <input
          type="text"
          placeholder="search for user"
          value={search}
          onChange={(e) => {
            e.preventDefault();
            setSearch(e.target.value);
          }}
        />
        <div className="user-card">
          {searchResult.length !== 0 ? (
            searchResult.map((user) => (
              <SocialCard user={user} key={user._id} />
            ))
          ) : (
            <p>user not found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Social;
