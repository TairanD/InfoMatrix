import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
import axios from "axios";
import { Link as ScrollTo } from "react-scroll";
import Count from "../elements/counter/counter-sensor.jsx";
import { useParams } from "react-router-dom";

// Header and Footer
import HeaderInfoMatrix from "../layout/header/header-homepage";
import FooterBlack from "../layout/footer/footer-black";

// Images
import bannerImg from "../../images/banner/banner2.jpg";
import testiPic1 from "../../images/testimonials/pic1.jpg";
import testiPic2 from "../../images/testimonials/pic2.jpg";
import blogDefaultThum1 from "../../images/blog/default/thum1.jpg";
import {connect} from "react-redux";

function ForumSpecificOrg(props) {
  // Get the org_id from the url
  const { org_id } = useParams();
  const [id, setId] = useState(org_id);
  const [org, setOrg] = useState({});
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isGeneralStudy, setIsGeneralStudy] = useState(false);
  const [isGeneralJob, setIsGeneralJob] = useState(false);

  useEffect(() => {
    console.log("Current id: " + id);
    if (id === "2") {
      setIsGeneralStudy(true);
    } else if (id === "1") {
      setIsGeneralJob(true);
    }

    // fetch
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/forum/organisation/" + id);
        setOrg(res.data[0]);
        setPosts(res.data[1]);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Get the info of the organization and get the posts
  // useEffect(() => {
  //   console.log(org);
  //   console.log(posts);
  // }, [org, posts]);

  const newPathname = props.isAuthenticated ? "/forum/upload" : "/login";

  return (
    <>
      <HeaderInfoMatrix />

      <div className="page-content">
        <div
          className="page-banner ovbl-dark"
          style={{ backgroundImage: "url(" + bannerImg + ")" }}
        >
          <div className="container">
            <div className="page-banner-entry">
              <h1 className="text-white">
                {isGeneralStudy && "General Questions about Study"}
                {isGeneralJob && "General Questions about Occupation"}
                {!isGeneralStudy && !isGeneralJob && "About " + org.name}
              </h1>
            </div>
          </div>
        </div>
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/forum">Forum</Link>
              </li>

              <li>
                {org.type === 1 && <Link to="/forum/study">Study</Link>}
                {org.type === 0 && <Link to="/forum/job">Job</Link>}
              </li>
              <li>{org.name}</li>
            </ul>
          </div>
        </div>

        <div className="content-block">
          <div className="section-area section-sp8">
            <div className="container">
              <div className="row d-flex flex-row-reverse">
                <div className="col-xl-3 col-lg-4 col-md-12 col-sm-12 m-b30">
                  <div className="course-detail-bx">
                    <div className="course-price">
                      <h1>
                        {posts.length !== 0 && <Count counter={posts.length} />}
                        <h4>Discussions</h4>
                      </h1>
                    </div>
                    <div className="course-buy-now text-center">
                      <Link to={{ pathname: newPathname, state: { orgId: id } }} className="btn radius-xl">
                        Start a New Discussion
                      </Link>
                    </div>

                    <div className="course-info-list scroll-page">
                      <ul className="navbar">
                        {!isGeneralStudy && !isGeneralJob && (
                          <li>
                            <ScrollTo
                              smooth={true}
                              activeClass="active"
                              spy={true}
                              className="nav-link"
                              to={"overview"}
                            >
                              <i className="ti-zip"></i> Overview
                            </ScrollTo>
                          </li>
                        )}
                        {!isGeneralStudy && !isGeneralJob && (
                          <li>
                            <ScrollTo
                              smooth={true}
                              activeClass="active"
                              spy={true}
                              className="nav-link"
                              to={"curriculum"}
                            >
                              <i className="ti-bookmark-alt"></i> Curriculum
                            </ScrollTo>
                          </li>
                        )}
                        <li>
                          <ScrollTo
                            smooth={true}
                            activeClass="active"
                            spy={true}
                            className="nav-link"
                            to={"instructor"}
                          >
                            <i className="ti-user"></i> Discussions
                          </ScrollTo>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="col-xl-9 col-lg-8 col-md-12 col-sm-12">
                  <div className="courses-post">
                    <div className="ttr-post-media media-effect org-image">
                      <img src={"data:;base64," + org.icon} alt="#" />
                    </div>
                    <div className="ttr-post-info m-b30">
                      <div className="ttr-post-title ">
                        <h2 className="post-title">{org.name}</h2>
                      </div>
                      <div className="ttr-post-text">
                        <p>{org.description}</p>
                      </div>
                    </div>
                  </div>
                  {/*{!isGeneralJob && !isGeneralStudy && (*/}
                  {/*  <div className="courese-overview" id="overview">*/}
                  {/*    <h4>Overview</h4>*/}
                  {/*    <div className="row">*/}
                  {/*      <div className="col-md-12 col-lg-4">*/}
                  {/*        <ul className="course-features">*/}
                  {/*          <li>*/}
                  {/*            <i className="ti-book"></i>{" "}*/}
                  {/*            <span className="label">QS Ranking</span>{" "}*/}
                  {/*            <span className="value">8</span>*/}
                  {/*          </li>*/}
                  {/*          <li>*/}
                  {/*            <i className="ti-help-alt"></i>{" "}*/}
                  {/*            <span className="label">US News Ranking</span>{" "}*/}
                  {/*            <span className="value">1</span>*/}
                  {/*          </li>*/}
                  {/*          <li>*/}
                  {/*            <i className="ti-time"></i>{" "}*/}
                  {/*            <span className="label">Duration</span>{" "}*/}
                  {/*            <span className="value">1 Year</span>*/}
                  {/*          </li>*/}
                  {/*          <li>*/}
                  {/*            <i className="ti-stats-up"></i>{" "}*/}
                  {/*            <span className="label">Postgraduate</span>{" "}*/}
                  {/*            <span className="value">Beginner</span>*/}
                  {/*          </li>*/}
                  {/*          <li>*/}
                  {/*            <i className="ti-smallcap"></i>{" "}*/}
                  {/*            <span className="label">Language</span>{" "}*/}
                  {/*            <span className="value">English</span>*/}
                  {/*          </li>*/}
                  {/*          <li>*/}
                  {/*            <i className="ti-user"></i>{" "}*/}
                  {/*            <span className="label">Students</span>{" "}*/}
                  {/*            <span className="value">32</span>*/}
                  {/*          </li>*/}
                  {/*          <li>*/}
                  {/*            <i className="ti-check-box"></i>{" "}*/}
                  {/*            <span className="label">Assessments</span>{" "}*/}
                  {/*            <span className="value">Yes</span>*/}
                  {/*          </li>*/}
                  {/*        </ul>*/}
                  {/*      </div>*/}
                  {/*      <div className="col-md-12 col-lg-8">*/}
                  {/*        <h5 className="m-b10">Programme Description</h5>*/}
                  {/*        <p>*/}
                  {/*          Apply novel science and engineering approaches to*/}
                  {/*          solve large scale problems on this Master's course,*/}
                  {/*          designed to advance your knowledge of numerical*/}
                  {/*          methods and computational science. You'll develop*/}
                  {/*          skills and techniques for a range of science and*/}
                  {/*          engineering applications utilising high performance*/}
                  {/*          computing resources, with guidance from world-class*/}
                  {/*          researchers.*/}
                  {/*        </p>*/}
                  {/*        <h5 className="m-b10">Future Career</h5>*/}
                  {/*        <p>*/}
                  {/*          Provide real-world problem-solving experience with*/}
                  {/*          applied, hands-on computational knowledge. As an*/}
                  {/*          expert industry analyst, you will be highly sought*/}
                  {/*          after in a wide range of careers. These include oil*/}
                  {/*          and gas, mineral exploration and climate science.*/}
                  {/*          Our graduates often pursue further study in master's*/}
                  {/*          programs or doctoral research. Pursue academic*/}
                  {/*          careers in fields such as optimisation and*/}
                  {/*          inversion, fluid mechanics, and machine learning*/}
                  {/*          applications.*/}
                  {/*        </p>*/}
                  {/*        <h5 className="m-b10">Learning Outcomes</h5>*/}
                  {/*        <ul className="list-checked primary">*/}
                  {/*          <li>Over 37 lectures and 55.5 hours of content!</li>*/}
                  {/*          <li>*/}
                  {/*            LIVE PROJECT End to End Software Testing Training*/}
                  {/*            Included.*/}
                  {/*          </li>*/}
                  {/*          <li>*/}
                  {/*            Learn Software Testing and Automation basics from*/}
                  {/*            a professional trainer from your own desk.*/}
                  {/*          </li>*/}
                  {/*          <li>*/}
                  {/*            Information packed practical training starting*/}
                  {/*            from basics to advanced testing techniques.*/}
                  {/*          </li>*/}
                  {/*          <li>*/}
                  {/*            Best suitable for beginners to advanced level*/}
                  {/*            users and who learn faster when demonstrated.*/}
                  {/*          </li>*/}
                  {/*          <li>*/}
                  {/*            Course content designed by considering current*/}
                  {/*            software testing technology and the job market.*/}
                  {/*          </li>*/}
                  {/*          <li>*/}
                  {/*            Practical assignments at the end of every session.*/}
                  {/*          </li>*/}
                  {/*          <li>*/}
                  {/*            Practical learning experience with live project*/}
                  {/*            work and examples.cv*/}
                  {/*          </li>*/}
                  {/*        </ul>*/}
                  {/*      </div>*/}
                  {/*    </div>*/}
                  {/*  </div>*/}
                  {/*)}*/}
                  {!isGeneralJob && !isGeneralStudy && (
                    <div className="m-b30" id="curriculum">
                      <h4>Curriculum</h4>
                      <ul className="curriculum-list">
                        <li>
                          <h5>Programme: Advanced Computing</h5>
                          <ul>
                            <li>
                              <div className="curriculum-list-box">
                                <span>Computer Systems</span>
                              </div>
                              <span>Autumn</span>
                            </li>
                            <li>
                              <div className="curriculum-list-box">
                                <span>
                                  Principles and Practice of Programming
                                </span>
                              </div>
                              <span>Autumn & Spring</span>
                            </li>
                            <li>
                              <div className="curriculum-list-box">
                                <span>Software System Engineering</span>
                              </div>
                              <span>Autumn & Spring</span>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <h5>Programme: Artificial Intelligence</h5>
                          <ul>
                            <li>
                              <div className="curriculum-list-box">
                                <span>Introduction to Machine Learning</span>
                              </div>
                              <span>Autumn</span>
                            </li>
                            <li>
                              <div className="curriculum-list-box">
                                <span>
                                  Introduction to Symbolic Artificial
                                  Intelligence
                                </span>
                              </div>
                              <span>Autumn & Spring</span>
                            </li>
                            <li>
                              <div className="curriculum-list-box">
                                <span>
                                  Ethics, Fairness and Explanation to AI
                                </span>
                              </div>
                              <span>Summer</span>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <h5>
                            Programme: Applied Computational Science and
                            Engineering
                          </h5>
                          <ul>
                            <li>
                              <div className="curriculum-list-box">
                                <span>Modern programming methods</span>
                              </div>
                              <span>Autumn</span>
                            </li>
                            <li>
                              <div className="curriculum-list-box">
                                <span>Modelling dynamical processes</span>
                              </div>
                              <span>Autumn & Spring</span>
                            </li>
                            <li>
                              <div className="curriculum-list-box">
                                <span>Patterns for parallel programming</span>
                              </div>
                              <span>Spring</span>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  )}

                  <div className="" id="instructor">
                    <h4>Discussions</h4>
                    {posts.map((post, index) => (
                      <div className="instructor-bx">
                        <div className="instructor-author">
                          <img src={"data:;base64," + org.icon} alt="#"/>
                        </div>
                        <div className="instructor-info">
                          <h6>Sender ID: {post.sender_id}</h6>
                          <span>
                            <i className="fa fa-calendar"></i> {post.Date}
                          </span>
                          <Link
                            to={{
                              pathname:
                                org.type === 1
                                  ? `/forum/study/${id}/post/${post.id}`
                                  : `/forum/job/${id}/post/${post.id}`,
                              state: {
                                orgName: org.name || "Default Name",
                                allPosts: posts,
                              },
                            }}
                            onClick={() => console.log('orgName: ', org.name, "allPosts: ", posts)}
                          >
                            <h6 className="m-b0 mt-2">"{post.Subject}"</h6>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterBlack />
    </>
  );
}

const mapStateToProps = (state) => {
    return {isAuthenticated: state.login.isAuthenticated};
}

export default connect(mapStateToProps)(ForumSpecificOrg);
