import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
import axios from "axios";

// Images
import bannerImg from "../../images/banner/banner1.jpg";

// Header and Footer
import HeaderInfoMatrix from "../layout/header/header-homepage";
import FooterBlack from "../layout/footer/footer-black";
import SideGeneral from "../elements/forum-components/side-general.jsx";

const ForumJob = () => {
  const [fetchedCompanyList, setFetchedCompanyList] = useState([]);
  const [CompanyList, setCompanyList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  // fetch resources
  const fetchSchools = async () => {
    setLoading(true);
    const res = await axios.get("/forum/enterprise");
    setFetchedCompanyList(res.data);
    setCompanyList(res.data);
    setLoading(false);
  };
  // render the init school list
  useEffect(() => {
    fetchSchools();
  }, []);

  // handle search text
  useEffect(() => {
    if (searchText === "") {
      setCompanyList(fetchedCompanyList);
    } else {
      let newCompanyList = [];
      fetchedCompanyList.forEach(function (school) {
        console.log(school.name);
        if (school.name.toLowerCase().includes(searchText.toLowerCase())) {
          newCompanyList.push(school);
        }
      });
      console.log(newCompanyList);
      setCompanyList(newCompanyList);
    }
  }, [searchText, fetchedCompanyList]);

  // Set the update search lag to 500ms
  const debounced = useDebouncedCallback(
    (searchText) => setSearchText(searchText),
    500
  );
  function handleSearchSubmit(e) {
    e.preventDefault();
  }

  // handle too long description
  function sliceDescription(des) {
    return des.substring(0, 90) + "...";
  }

  return (
    <div>
      <HeaderInfoMatrix />

      <div className="page-content">
        <div
          className="page-banner ovbl-dark"
          style={{ backgroundImage: "url(" + bannerImg + ")" }}
        >
          <div className="container">
            <div className="page-banner-entry">
              <h1 className="text-white">Apply for Occupation</h1>
            </div>
          </div>
        </div>
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/forum">Forum</Link>
              </li>
              <li>Job</li>
            </ul>
          </div>
        </div>

        <div className="content-block">
          <div className="section-area section-sp8">
            <div className="container">
              <div className="row">
                <div className="col-lg-9">
                  <div className="search-bx mb-10 style-1">
                    <form role="search" onSubmit={handleSearchSubmit}>
                      <div className="input-group">
                        <input
                          name="text"
                          className="form-control"
                          placeholder="Search by Company"
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
                  <div className="result-list">
                    {loading && (
                      <div className="loading-icon">
                        <i className="fa fa-spinner fa-spin fa-2x mt-3"></i>
                      </div>
                    )}

                    {/* The Item */}
                    {CompanyList.length === 0 ? (
                      <span>No Company Found</span>
                    ) : (
                      CompanyList.map(
                        (this_company, id) =>
                          this_company.id !== 1 && (
                            <div className="univ-item">
                              <a href={"/forum/job/" + this_company.id}>
                                <div className="slot_left">
                                  <div className="cover">
                                    <img
                                      src={"data:;base64," + this_company.icon}
                                      alt="#"
                                    />
                                  </div>
                                </div>
                              </a>
                              <div className="slot_mid">
                                <a href={"/forum/job/" + this_company.id}>
                                  <div className="name">{this_company.name}</div>
                                  <div className="ename line-1">
                                    {sliceDescription(this_company.description)}
                                  </div>
                                  {/* <div className="anchor">
                        <span>University Intro</span>
                        <span>Popular Majors</span>
                        <span>Discussion</span>

                      </div> */}
                                </a>
                                <div className="tag-list">
                                  <a href={"/forum/job/" + this_company.id}>
                                    <div className="tag-item">
                                      Company Intro
                                    </div>
                                  </a>
                                  <a href={"/forum/job/" + this_company.id}>
                                    <div className="tag-item">
                                      Popular Job Posts
                                    </div>
                                  </a>
                                  <a href={"/forum/job/" + this_company.id}>
                                    <div className="tag-item">Discussion</div>
                                  </a>
                                </div>
                              </div>
                              <div className="slot_right">
                                {/* <div className="sort">
                                  Rank: {this_company.id}
                                </div> */}

                                <Link to={"/forum/job/" + this_company.id} className="contact-btn blue">
                                  See Details{" "}
                                  <i className="fa fa-arrow-right"></i>
                                </Link>
                              </div>
                            </div>
                          )
                      )
                    )}
                  </div>
                </div>

                {/* Side bar */}
                <div className="col-lg-3">
                  <SideGeneral forumType='job'/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterBlack />
    </div>
  );
};

export default ForumJob;
