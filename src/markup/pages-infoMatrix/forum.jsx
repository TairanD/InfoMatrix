import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Layout
import HeaderInfoMatrix from "../layout/header/header-homepage";
import FooterBlack from "../layout/footer/footer-black";

// Elements
import BlogAside from "../elements/blog-aside";

// Images
import bannerImg from "../../images/banner/banner1.jpg";
import blogPic1 from "../../images/blog/grid/pic1.jpg";
import blogPic2 from "../../images/blog/grid/pic2.jpg";
import blogPic3 from "../../images/blog/grid/pic3.jpg";

const content = [
  {
    BlogThumb: blogPic1,
    BlogTitle: "1. This Story Behind Education Will Haunt You Forever.",
    BlogText:
      "Knowing that, you’ve optimised your pages countless amount of times, written tons.",
    BlogUser: "William",
    BlogDate: "Jan 12 2019",
    BlogComment: "05 Comment",
    id: 1,
  },
  {
    BlogThumb: blogPic2,
    BlogTitle: "2. What Will Education Be Like In The Next 50 Years?",
    BlogText:
      "As desperate as you are right now, you have done everything you can on your.",
    BlogUser: "John",
    BlogDate: "Feb 05 2019",
    BlogComment: "14 Comment",
    id: 2,
  },
  {
    BlogThumb: blogPic3,
    BlogTitle: "3. Master The Skills Of Education And Be.",
    BlogText:
      "You will see in the guide all my years of valuable experience together with.",
    BlogUser: "George",
    BlogDate: "April 14 2019",
    BlogComment: "23 Comment",
    id: 3,
  },
  {
    BlogThumb: blogPic1,
    BlogTitle: "4. Eliminate Your Fears And Doubts About Education.",
    BlogText:
      "When I needed to start from scratch and figure out how things work. Getting people.",
    BlogUser: "Thomas",
    BlogDate: "March 21 2019",
    BlogComment: "28 Comment",
    id: 4,
  },
  {
    BlogThumb: blogPic2,
    BlogTitle: "5. Seven Reasons You Should Fall In Love With Education.",
    BlogText:
      "Honestly, I made ZERO money in the first year and I definitely do not want you to go.",
    BlogUser: "James",
    BlogDate: "May 08 2019",
    BlogComment: "26 Comment",
    id: 5,
  },
  {
    BlogThumb: blogPic3,
    BlogTitle: "6. The Biggest Contribution Of Education To Humanity.",
    BlogText:
      "You may have seen our tool that's been featured by many world-class SEO marketers.",
    BlogUser: "Arthur",
    BlogDate: "June 19 2019",
    BlogComment: "15 Comment",
    id: 6,
  },
  {
    BlogThumb: blogPic1,
    BlogTitle: "7. This Story Behind Education Will Haunt You Forever.",
    BlogText:
      "Knowing that, you’ve optimised your pages countless amount of times, written tons.",
    BlogUser: "William",
    BlogDate: "Jan 12 2019",
    BlogComment: "05 Comment",
    id: 7,
  },
  {
    BlogThumb: blogPic2,
    BlogTitle: "8. What Will Education Be Like In The Next 50 Years?",
    BlogText:
      "As desperate as you are right now, you have done everything you can on your.",
    BlogUser: "John",
    BlogDate: "Feb 05 2019",
    BlogComment: "14 Comment",
    id: 8,
  },
  {
    BlogThumb: blogPic3,
    BlogTitle: "9. Master The Skills Of Education And Be.",
    BlogText:
      "You will see in the guide all my years of valuable experience together with.",
    BlogUser: "George",
    BlogDate: "April 14 2019",
    BlogComment: "23 Comment",
    id: 9,
  },
];

function Forum() {
  const [posts, setPosts] = useState([]);

  function fetchPosts(url) {
    fetch(url)
      .then((response) => response.json())
      .then((posts) => {
        setPosts(posts);
      });
  }

  useState(() => {
    fetchPosts("/forum_index");
    console.log(posts);
  }, []);

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
              <h1 className="text-white">All Topics</h1>
            </div>
          </div>
        </div>
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>Forum</li>
            </ul>
          </div>
        </div>

        <div className="content-block">
          <div className="section-area section-sp2">
            <div className="container">
              <div className="row">
                {/* first column */}
                <div
                  className="col-lg-6"
                  // style={{ borderRight: "1px solid lightgrey" }}
                >
                  {content.map(
                    (item) =>
                      item.id % 2 === 1 && (
                        <>
                          <div className="blog-post blog-md clearfix">
                            {/* <div className="ttr-post-media">
                              <Link to="/blog-details">
                                <img src={item.BlogThumb} alt="" />
                              </Link>
                            </div> */}
                            <div className="ttr-post-info">
                              <ul className="media-post">
                                <li>
                                  <Link to="/blog-details">
                                    <i className="fa fa-calendar"></i>
                                    {item.BlogDate}
                                  </Link>
                                </li>
                                <li>
                                  <Link to="/blog-details">
                                    <i className="fa fa-user"></i>By
                                    {item.BlogUser}
                                  </Link>
                                </li>
                              </ul>
                              <h5 className="post-title">
                                <Link to="/blog-details">{item.BlogTitle}</Link>
                              </h5>
                              <p>{item.BlogText}</p>
                              <div className="post-extra">
                                <Link to="/blog-details" className="btn-link">
                                  Read More
                                </Link>
                                <Link
                                  to="/blog-details"
                                  className="comments-bx"
                                >
                                  <i className="fa fa-comments-o"></i>{" "}
                                  {item.BlogComment}
                                </Link>
                              </div>
                            </div>
                          </div>
                        </>
                      )
                  )}
                </div>

                {/* Second Column */}
                <div
                  className="col-lg-6"
                  // style={{ borderRight: "1px solid lightgrey" }}
                >
                  {content.map(
                    (item) =>
                      item.id % 2 === 0 && (
                        <div className="blog-post blog-md clearfix">
                          {/* <div className="ttr-post-media">
                            <Link to="/blog-details">
                              <img src={item.BlogThumb} alt="" />
                            </Link>
                          </div> */}
                          <div className="ttr-post-info">
                            <ul className="media-post">
                              <li>
                                <Link to="/blog-details">
                                  <i className="fa fa-calendar"></i>
                                  {item.BlogDate}
                                </Link>
                              </li>
                              <li>
                                <Link to="/blog-details">
                                  <i className="fa fa-user"></i>By
                                  {item.BlogUser}
                                </Link>
                              </li>
                            </ul>
                            <h5 className="post-title">
                              <Link to="/blog-details">{item.BlogTitle}</Link>
                            </h5>
                            <p>{item.BlogText}</p>
                            <div className="post-extra">
                              {/* <Link to="/blog-details" className="btn-link">
                                Read More
                              </Link> */}
                              <Link to="/blog-details" className="likes-bx">
                                <i className="fa fa-heart-o"></i> {item.likes}10
                                likes
                              </Link>
                              <Link to="/blog-details" className="comments-bx">
                                <i className="fa fa-comments-o"></i>{" "}
                                {item.BlogComment}
                              </Link>
                            </div>
                          </div>
                        </div>
                      )
                  )}
                </div>

                <div className="pagination-bx rounded-sm gray m-b30 clearfix">
                  <ul className="pagination">
                    <li className="previous">
                      <Link to="#">
                        <i className="ti-arrow-left"></i> Prev
                      </Link>
                    </li>
                    <li className="active">
                      <Link to="#">1</Link>
                    </li>
                    <li>
                      <Link to="#">2</Link>
                    </li>
                    <li>
                      <Link to="#">3</Link>
                    </li>
                    <li className="next">
                      <Link to="#">
                        Next <i className="ti-arrow-right"></i>
                      </Link>
                    </li>
                  </ul>
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

export default Forum;
