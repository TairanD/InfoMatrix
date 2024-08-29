import React from "react";
import { Link } from "react-router-dom";

function ContactInfoCard() {
  return (
    <>
      <div className="bg-primary text-white contact-info-bx">
        <div className="heading-bx left mb-4">
          <h3 className="m-b10 title-head">
            Our <span> Info</span>
          </h3>
          <p className="m-b0">You can find us here:</p>
        </div>
        <div className="widget widget_getintuch">
          <ul>
            <li>
              <i className="ti-location-pin"></i>Beijing University of
              Technology, 100 Pingleyuan, Haidian District, Beijing.
            </li>
            <li>
              <i className="ti-mobile"></i>+86 13501042170 (24/7 Support Line)
            </li>
            <li>
              <i className="ti-email"></i>mingwei.yan@ucdconnect.ie
            </li>
          </ul>
        </div>
        <h5 className="m-t0 m-b20">Follow Us</h5>
        <ul className="list-inline contact-social-bx m-b0">
          <li>
            <Link to="#" className="btn outline radius-xl">
              <i className="fa fa-weixin"></i>
            </Link>
          </li>
          <li>
            <Link to="#" className="btn outline radius-xl">
              <i className="fa fa-qq"></i>
            </Link>
          </li>
          <li>
            <Link to="#" className="btn outline radius-xl">
              <i className="fa fa-weibo"></i>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default ContactInfoCard;
