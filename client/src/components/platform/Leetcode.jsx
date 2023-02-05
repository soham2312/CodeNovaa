import React, { useEffect, useState } from "react";
import axios from "axios";


const Leetcode = () => {
  const [data, setData] = useState([]);


  useEffect(() => {
    const getdata = async () => {
      const handle = "anudeep0306";
      const fdata = await axios.get(`http://localhost:8080/api/v1/leetcode/${handle}`);
      setData(fdata.data);

      console.log(fdata.data);

    };
    getdata();
  }, []);

  return (
    <div>
     Leetcode
    </div>
  );
};

export default Leetcode;
