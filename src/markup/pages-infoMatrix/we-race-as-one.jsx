import React, { useState, useEffect } from "react";
import Masonry from "react-masonry-component";
import { Link } from "react-router-dom";
import { Button, Grid, IconButton, Input, MenuItem, Select } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import HeaderInfoMatrix from "../layout/header/header-homepage";
import FooterBlack from "../layout/footer/footer-black";

import bannerImg from "../../images/we-race-as-one/OIP.jpg";

const ITEMS_PER_PAGE = 9;

function CoursesContent() {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchVisible, setSearchVisible] = useState(false);
    const [filterType, setFilterType] = useState('All');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch("/we_race_as_one");
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const indexOfLastPost = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstPost = indexOfLastPost - ITEMS_PER_PAGE;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE);
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    const filteredPosts = currentPosts.filter(post =>
        post.subject.toLowerCase().includes(searchKeyword.toLowerCase()) &&
        (filterType === 'All' || post.type.toString() === filterType)
    );

    return (
        <>
            <HeaderInfoMatrix />
            <div className="page-banner ovbl-dark" style={{ backgroundImage: `url(${bannerImg})` }}>
                <div className="container">
                    <div className="page-banner-entry">
                        <h1 className="text-white">"We Race As One"</h1>
                    </div>
                </div>
            </div>
            <div className="breadcrumb-row" style={{ background: "linear-gradient(to bottom, rgba(59,35,113,0.9), #141414)", borderBottom: "0", height: "8vh" }}>
                <div className="container">
                    <ul className="list-inline">
                        <li><Link to="/" style={{ color: "gray" }}>Home</Link></li>
                        <li style={{ color: "gray" }}>We Race As One</li>
                    </ul>
                </div>
            </div>
            <div className="profile-head">
                <h5>Topics</h5>
                <div className="feature-filters style1 ml-auto">
                    <Grid container alignItems="center">
                        <Grid item>
                            <IconButton onClick={() => setSearchVisible(!searchVisible)}>
                                <SearchIcon />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            {searchVisible && (
                                <div style={{ marginTop: '10px', width: '300px' }}>
                                    <Input
                                        placeholder="Search"
                                        value={searchKeyword}
                                        onChange={(e) => setSearchKeyword(e.target.value)}
                                        fullWidth
                                        multiline={false}
                                        sx={{ borderBottom: '1px solid #ccc' }}
                                    />
                                </div>
                            )}
                        </Grid>
                        <Grid item>
                            <Select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                variant="outlined"
                                style={{ marginLeft: '10px', width: '150px' }}
                            >
                                <MenuItem value="All">All</MenuItem>
                                <MenuItem value="0">Employability</MenuItem>
                                <MenuItem value="1">Academia</MenuItem>
                            </Select>
                        </Grid>
                    </Grid>
                </div>
            </div>
            <div className="courses-filter">
                <Masonry>
                    <ul className="ttr-gallery-listing magnific-image row" style={{ marginTop: '15px' }}>
                        {filteredPosts.map((post, index) => (
                            <li className="action-card col-xl-4 col-lg-6 col-md-12 col-sm-6" key={index}>
                                <div className="cours-bx">
                                    <div className="action-box">
                                        <div style={{ width: '100%', height: '200px', overflow: 'hidden' }}>
                                            <img style={{ width: '100%', height: 'auto' }} src={`data:image/png;base64,${post.image}`} alt="Post" />
                                        </div>
                                        <Link to={{
                                            pathname: `/we-race-as-one/${post.id}`
                                        }} className="btn">Read More</Link>
                                    </div>
                                    <div className="info-bx">
                                        <h6><Link to={{
                                            pathname: `/we-race-as-one/${post.id}`
                                        }}>{post.subject}</Link></h6>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </Masonry>
            </div>
            <div className="pagination" style={{ display: 'flex', justifyContent: 'center' }}>
                <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Prev</Button>
                {pages.map((page, index) => (
                    <Button key={index} onClick={() => handlePageChange(page)}>{page}</Button>
                ))}
                <Button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === pages.length}>Next</Button>
            </div>
            <FooterBlack />
        </>
    );
}

const WeRaceAsOne = () => {
    return (
        <CoursesContent />
    );
};

export default WeRaceAsOne;

