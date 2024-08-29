import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";

// Layout
import HeaderInfoMatrix from "../layout/header/header-homepage";
import Footer from "../layout/footer/footer1";

// Images
import bannerImg from "../../images/banner/banner3.jpg";
import FooterBlack from "../layout/footer/footer-black";

function IDESearch() {
  // Store fetched questions in a useState, refresh the component whenever the questions have changed
  const [questions, setQuestions] = useState([]);

  // Function for fetching questions
  function fetchQuestions(url) {
    fetch(url)
      .then((response) => response.json())
      .then((questions) => {
        setQuestions(questions);
        console.log(questions);
      });
  }

  // Initially fetch all programming problems
  useEffect(() => {
    fetchQuestions("/all_coding_questions");
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

  // Tag filter
  const [isVisible, setIsVisible] = useState(false);
  const popupRef = useRef(null); // create a reference to the popup
  // Click anywhere outside the popup to close it
  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsVisible(false); // 如果点击的是文本框外部，则隐藏文本框
      }
    }
    // 绑定点击事件监听器
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // 组件卸载时，移除事件监听器
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupRef]);

  // Selected Tags list
  const [selectedTags, setSelectedTags] = useState([]);
  function handleTagClicked(tagName) {
    // handle clicking tags in the popup
    // update the selected tag list
    let indexOfTag = selectedTags.indexOf(tagName);
    if (indexOfTag !== -1) {
      // if the list contains the tag
      let newList = selectedTags.filter((item) => item !== tagName);
      setSelectedTags(newList);
    } else {
      setSelectedTags(selectedTags.concat(tagName));
    }
  }
  // handle cancelling tags in the tag-show row
  function handleCancelTag(tagName) {
    console.log("Cancel Tag: " + tagName);
    let newList = selectedTags.filter((item) => item !== tagName);
    setSelectedTags(newList);
  }
  // useEffect(() => {
  //   console.log(selectedTags);
  // }, [selectedTags]);

  // fetch tags from backend
  const [fetchedTags, setFetchedTags] = useState([]);
  useEffect(() => {
    fetch("/get_tags")
      .then((res) => res.json())
      .then((fetchedTags) => {
        setFetchedTags(fetchedTags);
        console.log(1);
      });
  }, []);

  // Difficulty filter
  const [difficulty, setDifficulty] = useState("NoDifficulty");

  // Automate the search process when `searchText` have changed
  function getTagString(list) {
    let tagString = "";
    list.forEach((oneTag) => (tagString += oneTag + "$"));
    tagString = tagString.slice(0, tagString.length - 1);
    return tagString;
  }
  useEffect(() => {
    let tagString = getTagString(selectedTags);
    // If the search box is empty
    if (searchText === "") {
      // If no tag have been selected
      if (selectedTags.length === 0) {
        fetchQuestions("/all_coding_questions");
      } else {
        fetchQuestions("/search_coding_questions_by_tag/" + tagString);
      }
    }
    // If there are texts in the search box
    else {
      if (selectedTags.length === 0) {
        fetchQuestions("/search_coding_questions_by_word/" + searchText);
      } else {
        fetchQuestions(
          "/search_coding_questions_nested/" + tagString + "/" + searchText
        );
      }
    }
    console.log(
      "Search for: [" +
        searchText +
        "] with tag: {" +
        tagString +
        "} on\nhttp://62.234.214.127//search_coding_questions_nested/" +
        tagString +
        "/" +
        searchText
    );
  }, [searchText, selectedTags]);

  // handle Search by Difficulty
  const [previousDifficulty, setPreviousDifficulty] = useState("");
  const [classNameDifficulty0, setClassNameDifficulty0] =
    useState("selectedTag");
  const [classNameDifficulty1, setClassNameDifficulty1] =
    useState("unselectedTag");
  const [classNameDifficulty2, setClassNameDifficulty2] =
    useState("unselectedTag");
  const [classNameDifficulty3, setClassNameDifficulty3] =
    useState("unselectedTag");
  // set previous Difficulty
  function handleSelectDifficulty(difficulty_new) {
    setPreviousDifficulty(difficulty); // pass in the last selected one
    setDifficulty(difficulty_new); // update the current one
  }

  // set previous Difficulty to 'unselectedTag'
  useEffect(() => {
    switch (previousDifficulty) {
      default:
        break;
      case "NoDifficulty":
        setClassNameDifficulty0("unselectedTag");
        break;
      case "Easy":
        setClassNameDifficulty1("unselectedTag");
        break;
      case "Medium":
        setClassNameDifficulty2("unselectedTag");
        break;
      case "Hard":
        setClassNameDifficulty3("unselectedTag");
        break;
    }
  }, [previousDifficulty]);

  // set current Difficulty to 'selectedTag'
  useEffect(() => {
    switch (difficulty) {
      default:
        break;
      case "NoDifficulty":
        setClassNameDifficulty0("selectedTag");
        // fetchQuestions("/all_questions");
        break;
      case "Easy":
        setClassNameDifficulty1("selectedTag");
        // fetchQuestions("/search_questions_by_difficulty/" + difficulty);
        break;
      case "Medium":
        setClassNameDifficulty2("selectedTag");
        // fetchQuestions("/search_questions_by_difficulty/" + difficulty);
        break;
      case "Hard":
        setClassNameDifficulty3("selectedTag");
        // fetchQuestions("/search_questions_by_difficulty/" + difficulty);
        break;
    }
  }, [difficulty]);

  // Set color for difficulties
  const difficulties_dict = {
    Easy: "easyDifficulty",
    Medium: "mediumDifficulty",
    Hard: "hardDifficulty",
  };

  function handleTransfer(){
    if (questions){
      localStorage.setItem('totalNum', JSON.stringify(questions.length));
    }
  }

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
              <h1 className="text-white">Programming Problems</h1>
            </div>
          </div>
        </div>
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>Programming Problems</li>
            </ul>
          </div>
        </div>

        {/* Search Bar */}
        <div
          className="container"
          style={{ paddingTop: "30px", marginBottom: "-60px" }}
        >
          <div className="row">
            {/* The tag filter */}
            <div className="col-lg-1 col-md-2 col-sm-12">
              <button
                className="btn category-btn"
                onClick={() => setIsVisible(!isVisible)}
              >
                Select Tags
              </button>
              {isVisible && (
                <div className="popup" ref={popupRef}>
                  <b>Source:</b>
                  <br />
                  <div>
                    {fetchedTags.sources.map((this_tag, index) => (
                      <button
                        className={
                          selectedTags.indexOf(this_tag) !== -1
                            ? "popup-selected-tags"
                            : "popup-unselected-tags"
                        }
                        onClick={() => handleTagClicked(this_tag)}
                      >
                        {this_tag}
                      </button>
                    ))}
                  </div>

                  <b>Content:</b>
                  <br />
                  {fetchedTags.content.map((this_tag1, index) => (
                    <button
                      className={
                        selectedTags.indexOf(this_tag1) !== -1
                          ? "popup-selected-tags"
                          : "popup-unselected-tags"
                      }
                      onClick={() => handleTagClicked(this_tag1)}
                    >
                      {this_tag1}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* The search box */}
            <div className="col-lg-11 col-md-10 col-sm-12 search-wrapper">
              <div className="search-bx style-1">
                <form role="search" onSubmit={handleSearchSubmit}>
                  <div className="input-group">
                    <input
                      name="text"
                      className="form-control"
                      placeholder="Search Here..."
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
          </div>

          {/* The tags selected */}
          <div className="row row-selected-tags">
            {selectedTags.map((t) => (
              <>
                <span>
                  {t}
                  {"   "}
                  <i
                    class="fa fa-times-circle"
                    aria-hidden="true"
                    onClick={() => handleCancelTag(t)}
                  ></i>
                </span>
              </>
            ))}
          </div>
        </div>

        <div className="content-block">
          <div className="section-area section-sp1">
            <div className="container">
              <div className="row">
                {/* The left side bar */}
                <div className="col-lg-2 col-md-3 col-sm-12">
                  {/* Select for filters */}
                  <div className="widget widget_archive">
                    <h5 className="widget-title style-1">Difficulties</h5>
                    <ul style={{ textAlign: "center" }}>
                      <li className={classNameDifficulty0}>
                        <Link
                          to="#"
                          onClick={() => handleSelectDifficulty("NoDifficulty")}
                        >
                          All Question
                        </Link>
                      </li>
                      <li className={classNameDifficulty1}>
                        <Link
                          to="#"
                          onClick={() => handleSelectDifficulty("Easy")}
                        >
                          Easy
                        </Link>
                      </li>
                      <li className={classNameDifficulty2}>
                        <Link
                          to="#"
                          onClick={() => handleSelectDifficulty("Medium")}
                        >
                          Medium
                        </Link>
                      </li>
                      <li className={classNameDifficulty3}>
                        <Link
                          to="#"
                          onClick={() => handleSelectDifficulty("Hard")}
                        >
                          Hard
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* The result list */}
                <div className="col-lg-10 col-md-9 col-sm-12">
                  <div className="row">
                    {/* Result list for programming problems */}
                    {questions.length === 0 ? (
                      <h5>No questions fetched</h5>
                    ) : (
                      <>
                        <span className="coding-question-results">
                          <table>
                            <thead>
                              <tr>
                                {/* <th>State</th> */}
                                <th>ID</th>
                                <th>Question</th>
                                <th>Category</th>
                                <th>Difficulty</th>
                              </tr>
                            </thead>
                            <tbody>
                              {questions.map((question, index) => (
                                <tr
                                  key={question.id}
                                  className={index % 2 === 1 ? "even-row" : ""}
                                  // specify the link to the specific page
                                >
                                  {/* <td>{"✓"}</td> */}
                                  {/* <td>{"?"}</td> */}
                                  {/* <td>{"o"}</td> */}
                                  <td>{question.id}</td>
                                  <td>
                                    <Link
                                      to={{
                                        pathname: "/IDE/" + question.id,
                                      }}
                                      onClick={handleTransfer}
                                    >
                                      {question.name}
                                    </Link>
                                  </td>
                                  <td>{question.tag}</td>
                                  <td
                                    className={
                                      difficulties_dict[question.difficulty]
                                    }
                                  >
                                    {question.difficulty}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </span>
                      </>
                    )}

                    {/* The pager */}
                    {/* <div className="col-lg-12 m-b20">
                      <div className="pagination-bx rounded-sm gray clearfix">
                        <ul className="pagination">
                          <li className="previous">
                            <Link to="#">
                              <i className="ti-arrow-left"></i> Prev
                            </Link>
                          </li>
                          <li className="active">
                            <Link to="#">1</Link>
                          </li>
                          <li>
                            <Link to="#">2</Link>
                          </li>
                          <li>
                            <Link to="#">3</Link>
                          </li>
                          <li className="next">
                            <Link to="#">
                              Next <i className="ti-arrow-right"></i>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div> */}
                  </div>
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

export default IDESearch;
