import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

function RecommendSlider() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("/recommend_questions")
      .then((response) => response.json())
      .then((questions) => {
        setQuestions(questions);
        // console.log(questions);
        // console.log(questions.length);
      });
  }, []);

  const settings = {
    infinite: true,
    dots: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 5000,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 4,
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
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 390,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  function separateTags(tags) {
    let parts = tags.split("$");
    return parts;
  }

  return (
    <>
      <Slider
        {...settings}
        className="courses-carousel-2 slick-slider owl-none"
      >
        {questions.length === 0 ? (
          <h4 style={{ color: "red", font: "Cooper" }}>No question fetched</h4>
        ) : (
          questions.map((this_question) => (
            <div className="slider-item" key={this_question.id}>
              <div className="cours-bx">
                <div className="action-box">
                  <img src={"data:;base64," + this_question.image} alt="#" />
                  {/* <img src={coursesPic1} alt="#" /> */}
                  <Link
                    to={"/specific-question/" + this_question.id}
                    className="btn"
                  >
                    Answers Here
                  </Link>
                </div>
                <div className="info-bx">
                  {separateTags(this_question.tags).map((tag) => (
                    <span>{tag}</span>
                  ))}
                  <h6>
                    <Link to={"/specific-question/" + this_question.id}>
                      {this_question.name}
                    </Link>
                  </h6>
                </div>
                <div className="cours-more-info">
                  <div className="review">
                    {this_question.view === undefined ? (
                      <span>{"x Views"}</span>
                    ) : (
                      <span>{this_question.view + " Views"}</span>
                    )}
                  </div>
                  <div className="review" style={{ float: "right" }}>
                    {this_question.num_answers === undefined ? (
                      <span>{"x Answers"}</span>
                    ) : (
                      <span>{this_question.num_answers + " Answers"}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </Slider>
    </>
  );
}

export default RecommendSlider;
