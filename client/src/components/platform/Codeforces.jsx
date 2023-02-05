import React, { useEffect, useState } from "react";
import axios from "axios";
import Bargraph from "./Bargraph";
import { PacmanLoader } from "react-spinners";

const Codeforces = () => {
  const [data, setData] = useState(null);
  const [loading,setLoading]=useState(true)

  useEffect(() => {
    const getdata = async () => {
      const handle = "21bcs197";
      const fdata = await axios.get(
        `http://localhost:8080/api/v1/codeforces/${handle}`
      );
      setData(fdata.data);
      setLoading(false)
      console.log(fdata.data.problemStats);
    };
    getdata();
  }, []);

  return  (
    <div>
      {loading?<PacmanLoader color="#ffac2b" />:<div>
      
      codeforces
      
      {data?<Bargraph fdata={data} />:<PacmanLoader color="#36d7b7" />}
      </div>}
    </div>
  
  );
};

export default Codeforces;
