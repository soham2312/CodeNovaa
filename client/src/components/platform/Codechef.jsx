import React, { useEffect, useState } from "react";
import axios from "axios";
import { PacmanLoader } from "react-spinners";

const Codechef = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getdata = async () => {
      try {
        const handle = "cjfeucj123";
        const fdata = await axios.get(
          `http://localhost:8080/api/v1/codechef/${handle}`
        );
        setData(fdata.data);
        setLoading(false);
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
      <div>
        codechef
        {data ? (
          " data arrived"
        ) : !error ? (
          <PacmanLoader color="#ffac2b" />
        ) : (
          " error occoured"
        )}
      </div>
    </div>
  );
};

export default Codechef;
