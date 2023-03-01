import React, { useEffect, useState } from "react";
import axios from "axios";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const pageLoad = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userInfo")).token
          }`,
        },
      };

      const { data } = await axios.get(
        `http://localhost:5000/api/v1/admin/all-reports`,
        config
      );

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    pageLoad();
  }, []);
  return <div>Reports</div>;
};

export default Reports;
