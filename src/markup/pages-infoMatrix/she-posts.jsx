import React, {Component, useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import { Button } from '@mui/material';
import HeaderInfoMatrix from "../layout/header/header-homepage";
import FooterBlack from "../layout/footer/footer-black";
import bannerImg from "../../images/we-race-as-one/OIP.jpg";
import SideSpecificPost from "../elements/forum-components/side-specific-post";


const ShePosts = () => {
    const { id } = useParams();
    console.log("Post ID: ", id);
    const [formData, setFormData] = useState({ subject: '', content: '', type: '', photo: '' });
    const [imageFile, setImageFile] = useState(null);
    const [data, setData] = useState({});

    useEffect(() => {
        // 这块儿需要上一页传递题目id，maybe use useLocation
        fetch("/we_race_as_one/" + id)
            .then((response) => response.json())
            .then((response) => {
                // console.log("GOTIT");
                // console.log(response);
                setData(response);
                // 为什么setData之后，加了一些属性比如view: 0
            });
    }, [id]);


    return(
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
                        <li style={{ color: "gray" }}><Link to="/we-race-as-one" style={{ color: "gray" }}>We Race As One</Link></li>
                        <li style={{ color: "gray" }}>{data.subject}</li>
                    </ul>
                </div>
            </div>
            <div className="content-block">
                <div className="section-area section-sp2">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-xl-8">
                                <div className="recent-news blog-lg">
                                    <div className="action-box blog-lg">
                                        <img src={"data:;base64," + data.image} alt="" />
                                    </div>
                                    <div className="info-bx">
                                        <ul className="media-post">
                                            <li>
                                                <Link to="#">
                                                    <i className="fa fa-calendar"></i>
                                                    {data.Date}
                                                </Link>
                                            </li>

                                        </ul>
                                        <h3 className="post-title">{data.subject} </h3>
                                        <p>{data.content}</p>
                                        <div className="ttr-divider bg-gray">
                                            <i className="icon-dot c-square"></i>
                                        </div>
                                        <div className="widget_tag_cloud">
                                            <h6>Type</h6>
                                            <div className="tagcloud">
                                                <Link to="#">{data.type}</Link>
                                            </div>
                                        </div>
                                        <div className="ttr-divider bg-gray">
                                            <i className="icon-dot c-square"></i>
                                        </div>
                                        <h6>SHARE </h6>
                                        <ul className="list-inline contact-social-bx">
                                            <li>
                                                <Link to="#" className="btn outline radius-xl">
                                                    <i className="fa fa-weixin"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="#" className="btn outline radius-xl">
                                                    <i className="fa fa-qq"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="#" className="btn outline radius-xl">
                                                    <i className="fa fa-weibo"></i>
                                                </Link>
                                            </li>
                                        </ul>
                                        <div className="ttr-divider bg-gray">
                                            <i className="icon-dot c-square"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-xl-4">
                                    {/*{threePosts.length !== 0 && (*/}
                                    {/*    <SideSpecificPost*/}
                                    {/*        threePosts={threePosts}*/}
                                    {/*        currentPostId={post_id}*/}
                                    {/*    />*/}
                                    {/*)}*/}
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

export default ShePosts;