import React from "react";
import { Link } from "react-router-dom";

// Images
import bannerImg from "../../images/banner/banner1.jpg";

// Header and Footer
import HeaderInfoMatrix from "../layout/header/header-homepage";
import FooterBlack from "../layout/footer/footer-black";

const ForumIndex = () => {
  return (
    <div>
      <HeaderInfoMatrix />

      <div className="page-content">
        <div
          className="page-banner ovbl-dark"
          style={{ backgroundImage: "url(" + bannerImg + ")" }}
        >
          <div className="container">
            <div className="page-banner-entry">
              <h1 className="text-white">What is your future plan?</h1>
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
          <div className="section-area section-sp8">
            <div className="container">
              <div className="row">
                {/* first column */}
                <div className="col-lg-6">
                  <Link to="/forum/study">
                    <button className={"button-forum-study"}>
                      <span>
                        <i className="fa fa-graduation-cap"></i>{" "}Study
                      </span>
                    </button>
                  </Link>
                </div>

                {/* Second Column */}
                <div className="col-lg-6">
                <Link to="/forum/job">
                  <button className={"button-forum-job"}>
                    <span><i class="fa fa-briefcase"></i>{" "}Jobs</span>
                  </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterBlack />
    </div>
  );
};

export default ForumIndex;
