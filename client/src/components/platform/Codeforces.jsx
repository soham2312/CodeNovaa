import React, { useEffect, useState } from "react";
import axios from "axios";
import Bargraph from "./Bargraph";
import { PacmanLoader } from "react-spinners";
import Pictograph from "./Pictograph";

const Codeforces = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getdata = async () => {
      try {
        const handle = "tourist";
        const fdata = await axios.get(
          `http://localhost:8080/api/v1/codeforces/${handle}`
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
      {loading ? (
        <PacmanLoader color="#ffac2b" />
      ) : (
        <div>
          codeforces
          {data ? (
            <Bargraph fdata={data} />
          ) : !error ? (
            <PacmanLoader color="#ffac2b" />
          ) : (
            " error occoured"
          )}
          {data ? (
            <Pictograph fdata={data} />
          ) : !error ? (
            <PacmanLoader color="#ffac2b" />
          ) : (
            " error occoured"
          )}
        </div>
      )}
      {/* <Example /> */}
    </div>
  );
};

export default Codeforces;
