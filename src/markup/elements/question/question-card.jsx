import React from "react";
import { Link } from "react-router-dom";

const QuestionCard = ({ this_question }) => {
  function separateTags(tags){
    
    let parts = tags.split("$");
    
    return parts;
  }

  return (
    <div className="col-md-6 col-lg-4 col-sm-6 m-b30">
      <div className="cours-bx">
        <div className="action-box">
          <img src={"data:;base64," + this_question.image} alt="#" />
          {/* <img src={sampleQuestion} alt="#" /> */}
          <Link to={`/specific-question/${this_question.id}`} className="btn">
            See Answers
          </Link>
        </div>
        <div className="info-bx">
          {separateTags(this_question.tags).map((tag) => (
            <span>{tag}</span>
          ))}        
          <h6>
            <Link to={`/specific-question/${this_question.id}`}>{this_question.name}</Link>
          </h6>
        </div>
        <div className="cours-more-info">
          <div className="review">
            {this_question.view === undefined ? (
              <span>{"x Views"}</span>
            ) : (
              <span>{this_question.view + " Views"}</span>
            )}
            <ul className="cours-star">
              <li className="active">
                <i className="fa fa-star"></i>
              </li>
              <li className="active">
                <i className="fa fa-star"></i>
              </li>
              <li className="active">
                <i className="fa fa-star"></i>
              </li>
              <li>
                <i className="fa fa-star"></i>
              </li>
              <li>
                <i className="fa fa-star"></i>
              </li>
            </ul>
          </div>
          <div className="price">
            {/* <del>${item.PriceDel}</del> */}
            <p
              style={{
                marginTop: "1.6em",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              {this_question.num_answers === undefined ? (
                <span>{"x Answers"}</span>
              ) : (
                <span>{this_question.num_answers + " Answers"}</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
