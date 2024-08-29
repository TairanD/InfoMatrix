import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";

// Layout
import HeaderInfoMatrix from "../layout/header/header-homepage";

// Images
import bannerImg from "../../images/banner/banner3.jpg";

// Images
import sampleQuestion from "../../images/questions/sample-question.png";
import sampleQuestion2 from "../../images/questions/sample-question2.png";
import LeftSideBarQuestion from "../elements/question/left-side-bar-question";
import FooterBlack from "../layout/footer/footer-black";

// Pagination
import PaginatedItems from "../elements/question/pagination";

function QuestionBank() {
  // Store fetched questions in a useState, refresh the component whenever the questions have changed
  const [questions, setQuestions] = useState([]);

  // Function for fetching questions
  function
  fetchQuestions(url) {
    fetch(url)
      .then((response) => response.json())
      .then((questions) => {
        setQuestions(questions);
        console.log("Fetched Questions: ", questions);
      });
  }
  useEffect(() => {
    fetchQuestions("/all_questions");
    console.log("initial fetch");
  }, []);

  // Handle search operation
  const [searchText, setSearchText] = useState("");
  // Set the update search lag to 500ms
  const debounced = useDebouncedCallback(
    (searchText) => setSearchText(searchText),
    500
  );

  function handleSearchSubmit(e) {
    e.preventDefault();
  }

  const [currentTag, setCurrentTag] = useState("NoTag");

  // Automate the search process when `searchText` have changed
  useEffect(() => {
    if (searchText === "") {
      // If the search box is empty
      if (currentTag === "NoTag") {
        fetchQuestions("/all_questions");
      } else {
        fetchQuestions("/search_questions_by_tag/" + currentTag);
      }
    } else {
      // If there are texts in the search box
      if (currentTag === "NoTag") {
        fetchQuestions("/search_questions_by_word/" + searchText);
      } else {
        fetchQuestions(
          "/search_questions_nested/" + currentTag + "/" + searchText
        );
      }
    }
    console.log(
      "Search for: [" + searchText + "] with tag: {" + currentTag + "}"
    );
  }, [searchText, currentTag]);

  // handle Search by Tag
  const [previousTag, setPreviousTag] = useState("");
  const [classNameTag0, setClassNameTag0] = useState("selectedTag");
  const [classNameTag1, setClassNameTag1] = useState("unselectedTag");
  const [classNameTag2, setClassNameTag2] = useState("unselectedTag");
  const [classNameTag3, setClassNameTag3] = useState("unselectedTag");
  const [classNameTag4, setClassNameTag4] = useState("unselectedTag");
  // set previous tag
  function handleSelectTag(tag) {
    setPreviousTag(currentTag); // pass in the last selected tag
    setCurrentTag(tag); // update the current tag
  }
  // set previous tag to 'unselectedTag'
  useEffect(() => {
    switch (previousTag) {
      default:
        break;
      case "NoTag":
        setClassNameTag0("unselectedTag");
        break;
      case "Machine_Learning":
        setClassNameTag1("unselectedTag");
        break;
      case "C_Programming":
        setClassNameTag2("unselectedTag");
        break;
      case "Java_Programming":
        setClassNameTag3("unselectedTag");
        break;
      case "Python_Programming":
        setClassNameTag4("unselectedTag");
        break;
    }
  }, [previousTag]);

  // set current tag to 'selectedTag'
  useEffect(() => {
    switch (currentTag) {
      default:
        break;
      case "NoTag":
        setClassNameTag0("selectedTag");
        break;
      case "Machine_Learning":
        setClassNameTag1("selectedTag");
        break;
      case "C_Programming":
        setClassNameTag2("selectedTag");
        break;
      case "Java_Programming":
        setClassNameTag3("selectedTag");
        break;
      case "Python_Programming":
        setClassNameTag4("selectedTag");
        break;
    }
  }, [currentTag]);

  return (
    <>
      <HeaderInfoMatrix />

      <div className="page-content">
        <div
          className="page-banner ovbl-dark"
          style={{ backgroundImage: "url(" + bannerImg + ")" }}
        >
          <div className="container">
            <div className="page-banner-entry">
              <h1 className="text-white">All Question Posted</h1>
            </div>
          </div>
        </div>
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>All Questions</li>
            </ul>
          </div>
        </div>

        {/* Search Bar */}
        <div
          className="container"
          style={{ paddingTop: "30px", marginBottom: "-60px" }}
        >
          {/* Three Search Types */}
          <div
            className="row"
            style={{ marginBottom: "5px", textAlign: "center" }}
          >
            <h5 className="search-type-hint">
              Search By:{" "}
              <button className="btn-warning round-btn search-type-btn">
                Title & Content
              </button>
            </h5>

            {/* <div>
              <button
                className={classNameContent + " round-btn search-type-btn"}
                onClick={() => setSearchType("content")}
              >
                Content
              </button>
            </div>
            <div>
              <button
                className={classNameTag + " round-btn search-type-btn"}
                onClick={() => setSearchType("tag")}
              >
                Tag
              </button>
            </div> */}
          </div>
          <div className="search-bx style-1">
            <form role="search" onSubmit={handleSearchSubmit}>
              <div className="input-group">
                <input
                  name="text"
                  className="form-control"
                  placeholder="Type Here..."
                  type="text"
                  // value={searchText}
                  onChange={(e) => debounced(e.target.value)}
                />
                <span className="input-group-btn">
                  <button type="submit" className="btn">
                    <i className="fa fa-search"></i>
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>

        <div className="content-block">
          <div className="section-area section-sp1">
            <div className="container">
              <div className="row">
                {/* The left side bar */}
                <div className="col-lg-3 col-md-4 col-sm-12">
                  {/* Select for filters */}
                  <div className="widget widget_archive">
                    <h5 className="widget-title style-1">Apply Tag Filters</h5>
                    <ul style={{ textAlign: "center" }}>
                      <li className={classNameTag0}>
                        <Link to="#" onClick={() => handleSelectTag("NoTag")}>
                          All Question
                        </Link>
                      </li>
                      <li className={classNameTag1}>
                        <Link
                          to="#"
                          onClick={() => handleSelectTag("Machine_Learning")}
                        >
                          Machine Learning
                        </Link>
                      </li>
                      <li className={classNameTag2}>
                        <Link
                          to="#"
                          onClick={() => handleSelectTag("C_Programming")}
                        >
                          C Programming
                        </Link>
                      </li>
                      <li className={classNameTag3}>
                        <Link
                          to="#"
                          onClick={() => handleSelectTag("Java_Programming")}
                        >
                          Java Programming
                        </Link>
                      </li>
                      <li className={classNameTag4}>
                        <Link
                          to="#"
                          onClick={() => handleSelectTag("Python_Programming")}
                        >
                          Python Programming
                        </Link>
                      </li>
                      {/* <li>
                        <Link to="#">Design Pattern</Link>
                      </li>
                      <li>
                        <Link to="#">Machine Learning</Link>
                      </li>
                      <li>
                        <Link to="#">Computer Graphics</Link>
                      </li>
                      <li>
                        <Link to="#">Distributed Systems</Link>
                      </li> */}
                    </ul>
                  </div>
                  {/* Recent posted questions */}
                  <div className="widget recent-posts-entry widget-courses">
                    <h5 className="widget-title style-1">Recently Posted</h5>
                    <div className="widget-post-bx">
                      {/* A question showed in side bar */}
                      <LeftSideBarQuestion
                        imageSrc={sampleQuestion}
                        title={"Test Question A ez dd"}
                        answer={1}
                      />
                      {/* A question showed in side bar */}
                      <LeftSideBarQuestion
                        imageSrc={sampleQuestion2}
                        title={"Test Question B ez dd"}
                        answer={0}
                      />
                    </div>
                  </div>
                  {/* <div className="widget">
                    <Link to="/membership">
                      <img src={adv} alt="" />
                    </Link>
                  </div> */}
                </div>
                <div className="col-lg-9 col-md-8 col-sm-12">
                  <PaginatedItems
                    itemsPerPage={6}
                    item_fetched={questions}
                    itemType={"question"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterBlack />
    </>
  );
}

export default QuestionBank;
