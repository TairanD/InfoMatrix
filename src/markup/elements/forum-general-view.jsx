import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


// Images
import bg4 from "../../images/background/bg4.jpg";
import EventImg10 from "../../images/courses/pic10.jpg";
import EventImg12 from "../../images/courses/pic12.jpg";
import EventImg13 from "../../images/courses/pic13.jpg";

import {CircularProgress, LinearProgress} from "@mui/material";

// Portfolio Content
const content = [
  {
    thumb: EventImg13,
    tag: ["Happening"],
    title: "What is the Most Difficult Courses You Have Taken?",
    text: "Someone says the algorithms in Machine Learning is too hard to understand, while other says the Computer Graphics requires too much fundamental knowledge...",
    date: 13,
    time: " just now",
  },
  {
    thumb: EventImg10,
    tag: ["Upcoming"],
    title:
      "Study abroad, apply for job or select domestic postgraduate programme?",
    text: "It is usually hard to making decision in the very first year of the university, but what they have in common is...",
    date: 12,
    time: " 1 days ago",
  },
  {
    thumb: EventImg12,
    tag: ["Expired"],
    title: "What are the most useful tools to learn programming?",
    text: "Despite the lecture have covered several realm of Computer Science, but students are still struggle with the programming problem from or outside their curriculum...",
    date: 11,
    time: " 2 days ago",
  },
];

function ForumGeneralView() {
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // fetch
    const fetchData = async (id) => {
      setLoading(true);
      try {
        const res = await axios.get("/forum/organisation/2");
        // setOrg(res.data[0]);
        // console.log(res.data[1]);
        setPosts(res.data[1]);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData(2);
  }, []);

  // useEffect(() => {
  //   console.log("posts: ", posts)
  // }, [posts])

  return (
    <>
      <div
        className="section-area section-sp2"
        style={{ backgroundImage: "url(" + bg4 + ")", backgroundSize: "cover" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12 style1 text-center heading-bx">
              <h2 className="title-head m-b0">Forum: the Information Center</h2>
              <p className="m-b0">
                Daily topic are presented below. Feel free to join in the
                discussion!
              </p>
            </div>
          </div>
          {loading && <CircularProgress />}
          <div className="row">
            {posts && posts.slice(0, 3).map((item, index) => (
              <div className="col-md-12">
                <div className="event-bx style1">
                  <div className="action-box">
                    {index === 0 && <img src={EventImg10} alt="#"/>}
                    {index === 1 && <img src={EventImg12} alt="#"/>}
                    {index === 2 && <img src={EventImg13} alt="#"/>}
                  </div>
                  <div className="info-bx d-flex">
                    <div className="event-info">
                      <ul className="media-post">
                        <li>
                          <Link to="">
                            <i className="fa fa-clock-o"></i>{" "}
                            {"Posted " + item.Date}
                          </Link>
                        </li>
                        <li>
                          <Link to="">
                            <i className="fa fa-map-marker"></i> BJUT, Beijing
                          </Link>
                        </li>
                      </ul>
                      <h4 className="event-title">
                        <Link to={"/forum/study/2/post/" + item.id}>{item.Subject}</Link>
                      </h4>
                      <p>{item.Subject}</p>
                    </div>
                  </div>
                  <div className="event-time">
                    <div className="event-date" style={{fontSize: "20pt"}}>{item.Date}</div>
                    {/*<div className="event-month">March</div>*/}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/forum/study/2" className="btn">
              View All Discussion
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForumGeneralView;
