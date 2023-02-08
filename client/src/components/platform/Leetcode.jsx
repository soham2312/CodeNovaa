import React, { useEffect, useState } from "react";
import axios from "axios";
import { PacmanLoader } from "react-spinners";

const Leetcode = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getdata = async () => {
      try {
        const handle = "anudeep0306";
        const fdata = await axios.get(
          `http://localhost:8080/api/v1/leetcode/${handle}`
        );
        setData(fdata.data);

        console.log(fdata.data);
      } catch (error) {
        console.log(error);
        alert("user not found");
        setLoading(false);
        setError(true);
        setData(null);
      }
    };
    getdata();
  }, []);

  return (
    <div>
      Leetcode
      {data ? (
        " data arrived"
      ) : !error ? (
        <PacmanLoader color="#ffac2b" />
      ) : (
        " error occoured"
      )}
    </div>
  );
};

export default Leetcode;
