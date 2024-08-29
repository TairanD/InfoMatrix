import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

//IDE Elements
import Editor from "../elements/IDE/coding-space";
import QuestionAbout from "../elements/IDE/question-about";
import logoNoText from "../../images/logo-infoMatrix/logo-noText.png";

// import QuestionList from "../elements/IDE/question-list";
// import QuestionOperation from "../elements/IDE/question-operation";
// import QuestionResults from "../elements/IDE/question-results";
// import IDEHeader from "../elements/IDE/ide-header";

const IDE = () => {
  // get info from useLocation
  // const location = useLocation();
  // console.log("Location state:", location.state);
  // const { totalNum } = location.state || { totalNum: "Error" };
  // console.log("totalNum: ", totalNum);

  const totalNum = JSON.parse(localStorage.getItem('totalNum')) || "Error";
  console.log("totalNum:", totalNum, typeof(totalNum));

  const { q_id } = useParams();
  const [id, setId] = useState(parseInt(q_id)); // 使用useState来定义id状态

  useEffect(() => {
    console.log("Current id: " + id);
  }, [id]);

  return (
    <>
      {/*<Header />*/}
      {/* <IDEHeader question_id={id} redirectTo={setQuestionId} /> */}
      <div className="top-bar fix-box">
        <div className="container-ide-header">
          <div className="row d-flex justify-content-between">
            <div className="topbar-left">
              <ul>
                <li style={{}}>
                  <a href="/">
                    <img className="ide-menu-logo" src={logoNoText} alt="" />
                    <span>{"  "}Home</span>
                  </a>
                </li>
                <li>
                  <Link to="/IDE-search">
                    <i className="fa fa-list-ul"></i>Programming Problems List
                  </Link>
                </li>
                <li>
                  <Link to={"/IDE/" + id !== 1 ? id - 1 : id}>
                    <div
                      className="arrow-box"
                      onClick={() =>
                        setId(
                          id !== 1 ? id - 1 : id
                        )
                      }
                    >
                      <i class="fa fa-chevron-left"></i>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link to={"/IDE/" + id !== totalNum ? id + 1 : id}>
                    <div
                      className="arrow-box"
                      onClick={() => setId(
                        id !== totalNum ? id + 1 : id
                      )}
                    >
                      <i className="fa fa-chevron-right"></i>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="topbar-right">
              <ul style={{ float: "right" }}>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="page-content" style={{ marginTop: "60px" }}>
        <div className="row ide-big-box">
          {/*左侧题目信息*/}
          <div className="col-6">
            <div className="question-describe">
              {/*这里是题目的信息*/}
              <QuestionAbout id={id} />
            </div>
          </div>

          <div className="col-6">
            {/*这里是IDE的代码块*/}
            <Editor id={id} />
          </div>
        </div>
      </div>

      {/*<Footer/>*/}
    </>
  );
};

export default IDE;
