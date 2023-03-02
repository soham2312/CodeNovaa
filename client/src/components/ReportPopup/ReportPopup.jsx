import React, { useEffect } from "react";
import "./ReportPopup.css";
import TextField from "@mui/material/TextField";
import axios from "axios";

const ReportPopup = () => {
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  return (
    <div className="reportpopup">
      <div className="report-bg"></div>
      <div className="discussion-answer-self">
        <h3>Reason for reporting</h3>
        <div>
          <TextField
            id="filled-basic"
            label="Write your query"
            variant="outlined"
            multiline
            className="discussion-question-input"
          />
        </div>
        <div className="reportpopup-buttons">
          <div className="btn-cta-orange">Post Query</div>
          <div className="btn-cta-light">Close</div>
        </div>
      </div>
    </div>
  );
};

export default ReportPopup;
