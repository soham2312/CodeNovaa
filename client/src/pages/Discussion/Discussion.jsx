import React, { useEffect, useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import { Helmet } from "react-helmet";
import axios from "axios";
import "./Discussion.css";
import { Link } from "react-router-dom";
import DiscussionCard from "../../components/DiscussionCard/DiscussionCard";

const data=[
{
    "id": 1,
    "title": "Microsoft Online Assessment Questions",
},{

    "id": 2,
    "title": "Google Online Assessment Questions",
},
{
    "id": 3,
    "title": "Amazon Online Assessment Questions",
},
{
    "id": 4,
    "title": "Facebook Online Assessment Questions",
},
{
    "id": 5,
    "title": "Striver Dsa Sheet",
},
{
    "id": 6,
    "title": "Babbar Dsa Sheet",
},
{
    "id": 7,
    "title": "Placement Questions",
}
]


const Discussion = () => {
    return( 
        <div>
            <div className="discussion-Ask">
                <h4>Home</h4>
               <div className="discussion-question">
                <input type="text" className="discussion-question-input"></input>
               </div>
                <Link to="/discussion" className="btn-discussion">Create Discussion</Link>
            </div>
        <div className="discussion">
                {data?data.map((item)=>(
                    <DiscussionCard item={item}/>
                )):<p>Loading...</p>}
               {/* <DiscussionCard/> */}
               
        </div>
        </div>
    )
}
export default Discussion; 
