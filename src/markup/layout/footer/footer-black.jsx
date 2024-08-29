import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// Images
import logo from "../../../images/logo-infoMatrix/logo-infoMatrix-white.png";

import frances from "../../../images/shepower/frances.png";
import barbara from "../../../images/shepower/barbara.png";
import xia from "../../../images/shepower/xia.png";
import perlman from "../../../images/shepower/perlman.png";

const content = [
  {
    thumb: xia,
  },
  {
    thumb: perlman,
  },
  {
    thumb: frances,
  },
  {
    thumb: barbara,
  },
];

function GalleryImg() {
  return (
    <>
      {/* <SimpleReactLightbox>
        <SRLWrapper options={options}> */}
      <ul className="magnific-image">
        {content.map((item) => (
          <li>
            <Link to="/she-power">
              <img src={item.thumb} alt="" />
            </Link>
          </li>
        ))}
      </ul>
      {/* </SRLWrapper>
      </SimpleReactLightbox> */}
    </>
  );
}

function FooterBlack({ isAuthenticated }) {
  return (
    <>
      <footer>
        <div className="footer-top">
          <div className="pt-exebar">
            <div className="container">
              <div className="d-flex align-items-stretch">
                <div className="pt-logo mr-auto">
                  <Link to="/">
                    <img style={{ maxWidth: "200px" }} src={logo} alt="" />
                  </Link>
                </div>
                <div className="pt-social-link">
                  <ul className="list-inline m-a0">
                    <li>
                      <Link to="#" className="btn-link">
                        <i className="fa fa-weixin"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="btn-link">
                        <i className="fa fa-qq"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="btn-link">
                        <i className="fa fa-weibo"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
                {!isAuthenticated && (
                  <div className="pt-btn-join">
                    <Link to="/login" className="btn">
                      Join Now
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-4 col-lg-3 col-md-2 col-sm-6">
                <div className="widget footer_widget">
                  <h6 className="footer-title">Navigate</h6>
                  <ul>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/about-1">About Us</Link>
                    </li>
                    <li>
                      <Link to="/contact-us">Contact Us</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-4 col-lg-3 col-md-3 col-sm-6">
                <div className="widget footer_widget">
                  <h6 className="footer-title">Questions</h6>
                  <ul>
                    <li>
                      <Link to="/question-bank">Course Questions</Link>
                    </li>
                    <li>
                      <Link to="/IDE-search">Programming Questions</Link>
                    </li>
                    <li>
                      <Link to="/IDE/1">IDE</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-4 col-lg-3 col-md-2 col-sm-6">
                <div className="widget footer_widget">
                  <h6 className="footer-title">Forum</h6>
                  <ul>
                    <li>
                      <Link to="/forum/study">All Schools</Link>
                    </li>
                    <li>
                      <Link to="/forum/job">All Enterprises</Link>
                    </li>
                    <li>
                      <Link to="/forum/study/2">Discussion about Study</Link>
                    </li>
                    <li>
                      <Link to="/forum/job/1">Discussion about Job</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-12 col-lg-3 col-md-5 col-sm-6 footer-col-4">
                <div className="widget widget_gallery gallery-grid-4">
                  <h6 className="footer-title">She Power</h6>
                  <GalleryImg />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 text-center">
                {" "}
                © 2024{" "}
                <span className="text-secondary">京ICP备2024059314号-1</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

const mapStateToProps = (state) => {
  return { isAuthenticated: state.login.isAuthenticated };
};

export default connect(mapStateToProps)(FooterBlack);
