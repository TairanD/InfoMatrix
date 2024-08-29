import React, { Component } from "react";
import { Link } from "react-router-dom";
import Sticky from "react-stickynode";

// Images
import logoNoText from "../../../images/logo-infoMatrix/logo-noText.png";
import adv from "../../../images/adv/adv.jpg";

function IDEHeader({ question_id, redirectTo }) {
  // function for question switching
  function previousOne(id) {
    let this_id = parseInt(id);
    return this_id - 1;
  }
  function nextOne(id) {
    let this_id = parseInt(id);
    return this_id + 1;
  }

  return (
    <>
      <div className="top-bar">
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
                  <Link to="/coding-search">
                    <i className="fa fa-list-ul"></i>Programming Problems List
                  </Link>
                </li>
                <li>
                  <div>
                    <div
                      className="arrow-box"
                      onClick={() => redirectTo(previousOne(question_id))}
                    >
                      <i class="fa fa-chevron-left"></i>
                    </div>
                  </div>
                </li>
                <li>
                  <div>
                    <div
                      className="arrow-box"
                      onClick={() => redirectTo(nextOne(question_id))}
                    >
                      <i className="fa fa-chevron-right"></i>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="topbar-right">
              <ul style={{ float: "right" }}>
                <li>
                  <select className="header-lang-bx">
                    <option data-icon="flag flag-uk">English UK</option>
                    <option data-icon="flag flag-us">简体中文</option>
                  </select>
                </li>
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
    </>
  );
}

export default IDEHeader;
