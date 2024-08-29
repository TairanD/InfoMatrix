import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

function brief(str) {
  let list = str.split(" ");
  return list[0] + " " + list[1] + " " + list[2];
}

function LeftSideBarQuestion({ imageSrc, title, answer }) {
  return (
    <div className="widget-post clearfix">
      <div className="ttr-post-media">
        {" "}
        <img src={imageSrc} width="200" height="143" alt="" />{" "}
      </div>
      <div className="ttr-post-info">
        <div className="ttr-post-header">
          <h6 className="post-title">
            <Link to="#">{brief(title)}</Link>
          </h6>
        </div>
        <div className="ttr-post-meta">
          <ul>
            <li className="price">
              {answer > 0 ? (
                <h5 style={{ color: "#1fd36b" }}>{answer + " Answers"}</h5>
              ) : (
                <h5 style={{ color: "lightpink" }}>0 Answer</h5>
              )}
            </li>
            {/* <li className="review">{view + " Views"}</li> */}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default LeftSideBarQuestion;
