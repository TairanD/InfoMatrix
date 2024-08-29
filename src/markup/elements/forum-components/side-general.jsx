import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Count from "../counter/counter-sensor";
import { Accordion, Card } from "react-bootstrap";
import axios from "axios";

function SideGeneral({ forumType }) {
  const [generalPosts, setGeneralPosts] = useState([]);
  const [postNum, setPostNum] = useState(0);

  // fetch resources

  // render the init school list
  useEffect(() => {
    const fetchGeneralPosts = async () => {
      let res;
      if (forumType === "study") {
        res = await axios.get("/forum/enter_general");
      } else if (forumType === "job") {
        res = await axios.get("/forum/college_general");
      }
      setGeneralPosts(res.data);
    };

    fetchGeneralPosts();
  }, [forumType]);

  // get the length
  useEffect(() => {
    setPostNum(generalPosts.length);
  }, [generalPosts]);

  return (
    <>
      <aside className="side-bar sticky-top">
        <div className="widget">
          <div className="heading-bx left mb-3">
            <h1 className="title-head mb-3">
              General Problems {"  "}
              <span style={{ fontSize: "30px", color: "rgb(154 153 153)" }}>
                {forumType === "study" && "for future study"}
                {forumType === "job" && "for occupation"}
              </span>
            </h1>
            <Accordion className="ttr-accordion m-b30 faq-bx">
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                  <Link to="#" className="acod-title">
                    What is in this section?
                  </Link>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    {forumType === "study" &&
                      "Any questions about academic and further education here, such as how to compose CV, how to fix a bug, or any problem you have ever met in academic."}
                    {forumType === "job" &&
                      "Any questions about your future job career here, such as interviews, what kind of technical stacks that a job position requires, or how to use LeetCode."}
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </div>
          <div className="heading-bx left mb-0">
            <h4 class="title-head">
              {generalPosts.length !== 0 && <Count counter={generalPosts.length} />} Posts
            </h4>
            {generalPosts &&
              generalPosts.slice(0, 3).map((post, index) => (
                <div className={"widget-post clearfix ex-post-" + (index + 1)}>
                  <div className="ttr-post-info">
                    <div className="ttr-post-header">
                      <h6 className="post-title">
                        <Link to="#">{post.Subject}</Link>
                      </h6>
                    </div>
                    <ul className="media-post">
                      <li>
                        <Link to="#">
                          <i className="fa fa-calendar"></i>
                          {post.Date}
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              ))}
            {/* The post example */}
            {/* <div className="widget-post clearfix ex-post-1">
              <div className="ttr-post-info">
                <div className="ttr-post-header">
                  <h6 className="post-title">
                    <Link to="/blog-details">
                      Eliminate Your Fears And Doubts About Education.
                    </Link>
                  </h6>
                </div>
                <ul className="media-post">
                  <li>
                    <Link to="#">
                      <i className="fa fa-calendar"></i>June 12 2021
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="widget-post clearfix ex-post-2">
              <div className="ttr-post-info">
                <div className="ttr-post-header">
                  <h6 className="post-title">
                    <Link to="/blog-details">
                      Eliminate Your Fears And Doubts About Education.
                    </Link>
                  </h6>
                </div>
                <ul className="media-post">
                  <li>
                    <Link to="#">
                      <i className="fa fa-calendar"></i>June 12 2021
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="widget-post clearfix ex-post-3">
              <div className="ttr-post-info">
                <div className="ttr-post-header">
                  <h6 className="post-title">
                    <Link to="/blog-details">
                      Eliminate Your Fears And Doubts About Education.
                    </Link>
                  </h6>
                </div>
                <ul className="media-post">
                  <li>
                    <Link to="#">
                      <i className="fa fa-calendar"></i>June 12 2021
                    </Link>
                  </li>
                </ul>
              </div>
            </div> */}
          </div>

          <Link to={forumType === "study" ? "/forum/study/2" : "/forum/job/1"} className="btn button-md full-btn">
            Click for More
          </Link>
        </div>
      </aside>
    </>
  );
}

export default SideGeneral;
