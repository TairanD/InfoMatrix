import React, { Component } from "react";
import Slider from "react-slick";

// Images
import bg7 from "../../images/background/bg7.jpg";
import userIcon from "../../images/testimonials/user-icon.jpg";
import vIcon from "../../images/members-pics/v.jpg";
import dingIcon from "../../images/members-pics/ding.png";
import fuIcon from "../../images/members-pics/fu.jpg";
import louIcon from "../../images/members-pics/lou.jpg";
import liuIcon from "../../images/members-pics/liu.jpg";

// Content
const content = [
  {
    thumb: dingIcon,
    name: "Tairan Ding",
    work: "Lead Front-End Developer",
    text: "Proficient in HTML5, CSS3, JavaScript, JQuery, ReactJS, Bootstrap",
  },
  {
    thumb: louIcon,
    name: "Yiming Lou",
    work: "Project Manager",
    text: "Experienced in project management, feature design, and project schedule control.",
  },
  {
    thumb: vIcon,
    name: "Mingwei Yan",
    work: "System Analyst",
    text: "Expert in market analysis, requirement gathering, and specification development.",
  },
  {
    thumb: liuIcon,
    name: "Mutian Liu",
    work: "Operator",
    text: "Expert in functionality implementation, backend, unit testing, and code review.",
  },
  {
    thumb: fuIcon,
    name: "Zhaoyu Fu",
    work: "Quality Engineer",
    text: "Expert in technical knowledge and testing experience, always aims to satisfy the customer.",
  },
];

function IntroduceTeamMember() {
  const settings = {
    infinite: true,
    dots: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <div
        className="section-area section-sp2"
        style={{
          backgroundImage: "url(" + bg7 + ")",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12 heading-bx style1 text-center">
              <h2 className="title-head">See Our Brilliant Members</h2>
              <p>
                All team members work seamlessly to achieve the highest
                efficiency of teamwork.
              </p>
            </div>
          </div>
          <Slider
            {...settings}
            className="testimonial-carousel-2 slick-slider owl-btn-1 owl-none"
          >
            {content.map((item) => (
              <div className="slider-item">
                <div className="testimonial-bx style1">
                  <div className="testimonial-head">
                    <div className="testimonial-thumb">
                      <img src={item.thumb} alt="" />
                    </div>
                    <div className="testimonial-info">
                      <h5 className="name">{item.name}</h5>
                      <p>-{item.work}</p>
                    </div>
                  </div>
                  <div className="testimonial-content">
                    <p>{item.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
}

export default IntroduceTeamMember;
