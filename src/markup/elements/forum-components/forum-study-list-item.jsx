import React from "react";
import { Link } from "react-router-dom";

const ForumStudyListItem = ({ this_school }) => {
  // handle too long description
  function sliceDescription(des) {
    return des.substring(0, 100) + "...";
  }

  return (
    <div>
      <div className="univ-item">
        <a href="/univ_85_12" target="_blank">
          <div className="slot_left">
            <div className="cover">
              <img src={"data:;base64," + this_school.icon} alt="#" />
            </div>
          </div>
        </a>
        <div className="slot_mid">
          <a href="/univ_85_12" target="_blank">
            <div className="name">{this_school.name}</div>
            <div className="ename line-1">
              {sliceDescription(this_school.description)}
            </div>
            {/* <div className="anchor">
                        <span>University Intro</span>
                        <span>Popular Majors</span>
                        <span>Discussion</span>

                      </div> */}
          </a>
          <div className="tag-list">
            <a href="/" target="_blank">
              <div className="tag-item">University Intro</div>
            </a>
            <a href="/" target="_blank">
              <div className="tag-item">Popular Majors</div>
            </a>
            <a href="/" target="_blank">
              <div className="tag-item">Discussion</div>
            </a>
          </div>
        </div>
        <div className="slot_right">
          <div className="sort">Rank: {this_school.id}</div>

          <div className="contact-btn blue">
            See Details <i className="fa fa-arrow-right"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumStudyListItem;
