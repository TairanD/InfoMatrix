import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sticky from "react-stickynode";

import {connect} from "react-redux";

// Images
import logoWithText from "../../../images/logo-infoMatrix/logo-withText.png";

function HeaderInfoMatrix(props) {
  let navigate = useNavigate();
  useEffect(() => {
    // Search Form Popup
    var searchBtn = document.getElementById("quik-search-btn");
    var searchForm = document.querySelector(".nav-search-bar");
    var closeBtn = document.getElementById("search-remove");

    searchBtn.addEventListener("click", function () {
      searchForm.classList.add("show");
    });

    closeBtn.addEventListener("click", function () {
      searchForm.classList.remove("show");
    });

    // Mobile Menu sidebar function
    var btn = document.querySelector(".menuicon");
    var nav = document.querySelector(".menu-links");

    function toggleFunc() {
      btn.classList.toggle("open");
      nav.classList.toggle("show");
    }

    btn.addEventListener("click", toggleFunc);

    // Mobile Submenu open close function
    var navMenu = [].slice.call(
      document.querySelectorAll(".menu-links > ul > li")
    );
    for (var y = 0; y < navMenu.length; y++) {
      navMenu[y].addEventListener("click", function () {
        menuClick(this);
      });
    }

    function menuClick(current) {
      const active = current.classList.contains("open");
      navMenu.forEach((el) => el.classList.remove("open"));

      if (active) {
        current.classList.remove("open");
        console.log("active");
      } else {
        current.classList.add("open");
        console.log("close");
      }
    }
  }, []);

  const handleScroll = () => {
    window.scrollTo({
      top: 2300,
      behavior: "smooth",
    });
  };

  // User status
  const [currentUser, setCurrentUser] = useState([]);
  useEffect(() => {
    fetch("/user_status")
      .then((res) => res.json())
      .then((currentUser) => {
        setCurrentUser(currentUser);
        // console.log(currentUser);
      });
  }, []);

  // handle logout event
  function handleLogout() {
    fetch("/logout")
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 200) {
          alert("Logout Successfully");
        }
        navigate("/");
        props.logoutAction();
        // set the currentUser as un-login state, trigging component refresh
        setCurrentUser({ code: 400 });
      });
  }

  return (
    <>
      <header className="header rs-nav">
        <div className="top-bar">
          <div className="container">
            <div className="row d-flex justify-content-between">
              <div className="topbar-left">
                <ul>
                  <li>
                    <Link to="">
                      <i className="fa fa-question-circle"></i>Report a Question
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <i className="fa fa-envelope-o"></i>
                      { currentUser.email }
                    </Link>
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
                  {currentUser.code === 400 && (
                    <>
                      <li>
                        <Link to="/login">Login</Link>
                      </li>
                      <li>
                        <Link to="/register">Register</Link>
                      </li>
                    </>
                  )}
                  {currentUser.code === 200 && (
                    <>
                      <Link to={"/personal/" + currentUser.id}>
                        <li className="headerAvatar">
                          <img
                            src={"data:;base64," + currentUser.avatar}
                            alt="#"
                          />
                        </li>
                      </Link>
                      <li>
                        <Link to="/" onClick={handleLogout}>
                          Logout
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <Sticky enabled={true} className="sticky-header navbar-expand-lg">
          <div className="menu-bar clearfix">
            <div className="container clearfix">
              {/* <!-- Header Logo ==== --> */}
              <div className="menu-logo">
                <Link to="/">
                  <img src={logoWithText} alt="" />
                </Link>
              </div>
              {/* <!-- Mobile Nav Button ==== --> */}
              <button
                className="navbar-toggler collapsed menuicon justify-content-end"
                type="button"
                data-toggle="collapse"
                data-target="#menuDropdown"
                aria-controls="menuDropdown"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
              {/* <!-- Author Nav ==== --> */}
              <div className="secondary-menu">
                <div className="secondary-inner">
                  <ul>
                    <li>
                      <Link to="#" className="btn-link">
                        <i className="fa fa-weixin"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="btn-link">
                        <i className="fa fa-qq"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="btn-link">
                        <i className="fa fa-weibo"></i>
                      </Link>
                    </li>
                    {/* <!-- Search Button ==== --> */}
                    <li className="search-btn">
                      <button
                        id="quik-search-btn"
                        type="button"
                        className="btn-link"
                        title="Click to Search Globally"
                        disabled
                      >
                        <i className="fa fa-search"></i>
                      </button>
                    </li>
                    {/* Contact Us button */}
                    <li>
                    <Link to="/contact-us" className="btn-link" title="Contact Us">
                        <i className="fa fa-phone"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              {/* <!-- Navigation Menu ==== --> */}
              <div
                className="menu-links navbar-collapse collapse justify-content-start"
                id="menuDropdown"
              >
                <div className="menu-logo">
                  <Link to="/">
                    <img src={logoWithText} alt="" />
                  </Link>
                </div>
                <ul className="nav navbar-nav">
                  <li className="active">
                    <Link to="/">
                      <b>Home</b> <i className="fa fa-chevron-down"></i>
                    </Link>
                    {/*<ul className="sub-menu">*/}
                    {/*  <li>*/}
                    {/*    <Link to="/my-infomatrix">My InfoMatrix</Link>*/}
                    {/*  </li>*/}
                    {/*</ul>*/}
                  </li>
                  {/* Question Bank */}
                  <li>
                    <Link to="#">
                      Questions <i className="fa fa-chevron-down"></i>
                    </Link>
                    <ul className="sub-menu">
                      <li>
                        <Link to="/question-bank">All Questions</Link>
                      </li>
                      <li>
                        <Link to="/" onClick={handleScroll}>
                          Upload Questions
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li>
                    <Link to="#">
                      Programming <i className="fa fa-chevron-down"></i>
                    </Link>
                    <ul className="sub-menu">
                      <li>
                        <Link to="/IDE-search">Programming Problems</Link>
                      </li>
                      <li>
                        <Link to="/IDE/1">IDE</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link to="/forum">
                      Forum <i className="fa fa-chevron-down"></i>
                    </Link>
                    <ul className="sub-menu">
                      <li>
                        <Link to="/forum/study">Studying Abroad</Link>
                      </li>
                      <li>
                        <Link to="/forum/job">Looking for Jobs</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link to="#">
                      Athena Swan <i className="fa fa-chevron-down"></i>
                    </Link>

                    <ul className="sub-menu">
                      <li>
                        <Link to="/she-power">She Power</Link>
                      </li>
                      <li>
                        <Link to="/we-race-as-one">We Race As One 🌈</Link>
                      </li>
                      <li>
                        <Link to="/share-your-feeling">Share Your Feeling 🌈</Link>
                      </li>
                    </ul>
                  </li>
                  {/* <li>
                    <Link to="/staff-new">
                      <span style={{color:'rgb(70 143 223)'}}>Staff</span> <i className="fa fa-chevron-down"></i>
                    </Link>
                  </li> */}
                </ul>
                
              </div>
              {/* <!-- Navigation Menu END ==== --> */}
            </div>
          </div>
        </Sticky>
        {/* <!-- Search Box ==== --> */}
        <div className="nav-search-bar">
          <form action="#">
            <input
              name="search"
              type="text"
              className="form-control"
              placeholder="Type to search"
            />
            <span>
              <i className="ti-search"></i>
            </span>
          </form>
          <span id="search-remove">
            <i className="ti-close"></i>
          </span>
        </div>
      </header>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    logoutAction: ()=>{
      dispatch({
        type: "logout"
      })
    }
  }
}

export default connect(null, mapDispatchToProps)(HeaderInfoMatrix);
