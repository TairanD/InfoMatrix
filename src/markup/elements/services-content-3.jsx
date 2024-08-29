import React, { Component } from "react";
import { Link } from "react-router-dom";

class ServicesContent3 extends Component {
  render() {
    return (
      <>
        <div className="row">
          <div className="col-lg-4 col-md-6">
            <div className="services-bx text-left m-b30">
              <div className="feature-lg text-white m-b30">
                <span className="icon-cell">
                  <i className="flaticon-exam"></i>
                </span>
              </div>
              <div className="icon-content">
                <h4 className="ttr-tilte">Question Bank</h4>
                <p>
                  Machine learning, computer graphics, etc. Every question about
                  any CS courses can be found here.
                </p>
                <Link to="/question-bank" className="readmore">
                  Learn More <i className="la la-arrow-right"></i>
                </Link>
              </div>
              <div className="service-no">01</div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="services-bx text-left m-b30">
              <div className="feature-lg text-white m-b30">
                <span className="icon-cell">
                  <i className="flaticon-earth-globe"></i>
                </span>
              </div>
              <div className="icon-content">
                <h4 className="ttr-tilte">Forum</h4>
                <p>
                  Feel free to ask any questions about studying abroad or
                  heading to job, where CS students like you are happy to answer
                  them!
                </p>
                <Link to="/forum" className="readmore">
                  Learn More <i className="la la-arrow-right"></i>
                </Link>
              </div>
              <div className="service-no">02</div>
            </div>
          </div>
          <div className="col-lg-4 col-md-12">
            <div className="services-bx text-left">
              <div className="feature-lg text-white m-b30">
                <span className="icon-cell">
                  <i className="flaticon-abacus"></i>
                </span>
              </div>
              <div className="icon-content">
                <h4 className="ttr-tilte">Practice</h4>
                <p>
                  Are you good at programming? Try solving the classic
                  programming problems within the online IDE and see your
                  ranking!
                </p>
                <Link to="/IDE-search" className="readmore">
                  Learn More <i className="la la-arrow-right"></i>
                </Link>
              </div>
              <div className="service-no">03</div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ServicesContent3;
