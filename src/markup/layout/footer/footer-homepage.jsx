import React from "react";
import { Link } from "react-router-dom";

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

const options = {
  settings: {
    overlayColor: "rgba(0,0,0,0.9)",
    backgroundColor: "#3f3e85",
    slideAnimationType: "slide",
  },
  buttons: {
    backgroundColor: "#3f3e85",
    iconColor: "rgba(255, 255, 255, 1)",
    showDownloadButton: false,
    showAutoplayButton: false,
    showThumbnailsButton: false,
  },
  caption: {
    captionColor: "#3f3e85",
    captionFontFamily: "Raleway, sans-serif",
    captionFontWeight: "300",
    captionTextTransform: "uppercase",
  },
};

function GalleryImg() {
  return (
    <>
      {/* <SimpleReactLightbox>
        <SRLWrapper options={options}> */}
          <ul className="magnific-image">
            {content.map((item) => (
              <li>
                <Link to="/she-power">
                <img src={item.thumb} alt="" /></Link>
              </li>
            ))}
          </ul>
        {/* </SRLWrapper>
      </SimpleReactLightbox> */}
    </>
  );
}

function FooterHomepage() {
  return (
    <>
      <footer className="footer-white">
        <div className="footer-top bt0">
          <div className="container">
            <div className="subscribe-box">
              <div className="subscribe-title m-b20">
                <h4>Subscribe to receive updates of your posted questions</h4>
              </div>
              <div className="subscribe-form m-b20">
                <form className="subscription-form">
                  <div className="ajax-message"></div>
                  <div className="input-group">
                    <input
                      name="email"
                      required="required"
                      className="form-control"
                      placeholder="Your Email Address"
                      type="email"
                    />
                    <span className="input-group-btn">
                      <button
                        name="submit"
                        value="Submit"
                        type="submit"
                        className="btn radius-xl"
                      >
                        Subscribe
                      </button>
                    </span>
                  </div>
                </form>
              </div>
            </div>
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
                © 2024 <span className="text-primary">京ICP备2024059314号-1</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default FooterHomepage;
