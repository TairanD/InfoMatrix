import React, { Component, useState, useEffect } from "react";

// Layout
import FooterHomepage from "../layout/footer/footer-homepage";
import HeaderInfoMatrix from "../layout/header/header-homepage";

// Elements
import MainSlider from "../elements/slider/slider2";
import ServicesContent3 from "../elements/services-content-3";
import RecommendSlider from "../elements/recommend-slider";

// Images
import bg4 from "../../images/background/bg4.jpg";

// Components for infoMatrix
import UploadQuestionBox from "../elements/upload-question-box";
import ForumGeneralView from "../elements/forum-general-view";
import IntroduceTeamMember from "../elements/introduce-team-member";
import BackToTop from "../elements/back-top";

import {connect} from "react-redux";

function IndexInfoMatrix() {
  return (
    <>
      <HeaderInfoMatrix />

      <div className="page-content bg-white">
        <MainSlider />

        <div className="content-block" id="content-area">
          <div
            className="popular-courses-bx"
            style={{
              backgroundImage: "url(" + bg4 + ")",
              backgroundSize: "cover",
            }}
          >
            <div className="section-area section-sp3">
              <div className="container">
                <div className="row">
                  <div className="col-md-12 heading-bx style1 text-center">
                    <h2 className="title-head">Our Awesome Services</h2>
                    <p>
                      We provide you with the comprehensive learning material
                      and immersive learning experience.
                    </p>
                  </div>
                </div>

                <ServicesContent3 />
              </div>
            </div>

            <div className="section-area section-sp1">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-12 heading-bx style1 text-center">
                    <h2 className="title-head">
                      Recommended Question Just for You
                    </h2>
                    <p>
                      These questions are carefully selected through our
                      recommended system based on the question you have searched
                      for
                    </p>
                  </div>
                </div>

                {/* <PopularCoursesSlider2 /> */}
                <RecommendSlider />
              </div>
            </div>
          </div>

          {/* Upload Question */}
          <UploadQuestionBox />

          {/* Forum */}
          <ForumGeneralView />

          {/* <OurStory2 /> */}

          {/* Intro of team members */}
          <IntroduceTeamMember />

          <BackToTop />
        </div>
      </div>

      <FooterHomepage />
    </>
  );
}

const mapStateToProps = (state) => {
  return {isAuthenticated: state.login.isAuthenticated};
}

export default connect(mapStateToProps)(IndexInfoMatrix);
