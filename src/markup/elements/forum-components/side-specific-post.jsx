import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// Images

import sampleQuestion from "../../../images/questions/sample-question.png";

function SideSpecificPost({ threePosts, currentPostId }) {
  const [posts, setPosts] = useState(threePosts)

  console.log("Posts passed in from parent: ", posts);
  console.log("Current Post ID: ", currentPostId);

  return (
    <>
      <aside className="side-bar sticky-top">
        <div className="widget recent-posts-entry">
          <h6 className="widget-title">Relevant Posts</h6>
          <div className="widget-post-bx">
            {posts.length !== 0 &&
              posts.map((post, index) => (
                <div className="widget-post clearfix">
                  <div className="ttr-post-media">
                    {" "}
                    <img
                      src={sampleQuestion}
                      width="200"
                      height="143"
                      alt=""
                    />{" "}
                  </div>
                  <div className="ttr-post-info">
                    <div className="ttr-post-header">
                      <h6 className="post-title">
                        <Link
                          to={
                            post.Belong_type === 1
                              ? "/forum/study/" +
                                post.Organisation_id +
                                "/post/" +
                                post.id
                              : "/forum/job/" +
                                post.Organisation_id +
                                "/post/" +
                                post.id
                          }
                        >
                          {post.Subject}
                        </Link>
                      </h6>
                    </div>
                    <ul className="media-post">
                      <li>
                        <Link to="/blog-details">
                          <i className="fa fa-calendar"></i>
                          {post.Date}
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              ))}

            {/* <div className="widget-post clearfix">
              <div className="ttr-post-media">
                {" "}
                <img
                  src={sampleQuestion}
                  width="200"
                  height="143"
                  alt=""
                />{" "}
              </div>
              <div className="ttr-post-info">
                <div className="ttr-post-header">
                  <h6 className="post-title">
                    <Link to="/blog-details">
                      What is the meaning of Agile Management?
                    </Link>
                  </h6>
                </div>
                <ul className="media-post">
                  <li>
                    <Link to="/blog-details">
                      <i className="fa fa-calendar"></i>Oct 23 2021
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="widget-post clearfix">
              <div className="ttr-post-media">
                {" "}
                <img
                  src={sampleQuestion}
                  width="200"
                  height="160"
                  alt=""
                />{" "}
              </div>
              <div className="ttr-post-info">
                <div className="ttr-post-header">
                  <h6 className="post-title">
                    <Link to="/blog-details">
                      Could you name a few usages of Template Design Pattern?
                    </Link>
                  </h6>
                </div>
                <ul className="media-post">
                  <li>
                    <Link to="/blog-details">
                      <i className="fa fa-calendar"></i>May 14 2021
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="widget-post clearfix">
              <div className="ttr-post-media">
                {" "}
                <img
                  src={sampleQuestion}
                  width="200"
                  height="160"
                  alt=""
                />{" "}
              </div>
              <div className="ttr-post-info">
                <div className="ttr-post-header">
                  <h6 className="post-title">
                    <Link to="/blog-details">
                      What should we do to handle imbalanced datasets?
                    </Link>
                  </h6>
                </div>
                <ul className="media-post">
                  <li>
                    <Link to="/blog-details">
                      <i className="fa fa-calendar"></i>June 12 2021
                    </Link>
                  </li>
                </ul>
              </div>
            </div> */}
          </div>
        </div>
      </aside>
    </>
  );
}

export default SideSpecificPost;
