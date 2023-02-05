import React, { useEffect, useState } from "react";
import axios from "axios";


const Github = () => {
  const [data, setData] = useState([]);


  useEffect(() => {
    const getdata = async () => {
      const handle = "Shubh942";
      const fdata = await axios.get(`http://localhost:8080/api/v1/github/${handle}`);
      setData(fdata.data);

      console.log(fdata.data);

    };
    getdata();
  }, []);

  return (
    <div>
     Github
    </div>
  );
};

export default Github;
