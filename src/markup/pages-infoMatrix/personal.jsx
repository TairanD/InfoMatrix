import React, { useState, useEffect } from "react";
import bannerImg from "../../images/banner/banner1.jpg";
import {Link, useParams} from "react-router-dom";
import {Nav, Tab} from "react-bootstrap";
import QuizResults from "../elements/profile-content/quiz-results";
import ChangePassword from "../elements/profile-content/change-password";
import Footer from "../layout/footer/footer1";
import Posts from "../elements/profile-content/posts";
import EditYourProfile from "../elements/profile-content/edit-your-profile";
import HeaderInfoMatrix from "../layout/header/header-homepage";
import YourBlogs from "../elements/profile-content/posts";
import YourReplies from "../elements/profile-content/replies";
import YourFollowings from "../elements/profile-content/your-followings";
import YourFollowers from "../elements/profile-content/your-followers";

const PersonalPage =()=> {
    const { u_id } = useParams();
    console.log("User ID: ", u_id);

    const [data, setData] = useState({
        avatar: "",
        email: "",
        id: 0,
        mark: 0,
        name: "",
        password : "",
        posts : [],
        role: 0
    });

    useEffect(() => {
        fetch("/personal/" + u_id)
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            })
            .catch((error) => {
                console.error("Error fetching backend URL:", error);
            });
    }, [u_id]);
    return <>
        <HeaderInfoMatrix />

        <div className="page-content">

            <div className="page-banner ovbl-dark" style={{backgroundImage: "url("+bannerImg+")"}}>
                <div className="container">
                    <div className="page-banner-entry">
                        <h1 className="text-white">Profile</h1>
                    </div>
                </div>
            </div>
            <div className="breadcrumb-row">
                <div className="container">
                    <ul className="list-inline">
                        <li><Link to="/">Home</Link></li>
                        <li>Profile</li>
                    </ul>
                </div>
            </div>

            <div className="content-block">

                <div className="section-area section-sp1">
                    <div className="container">
                        <Tab.Container defaultActiveKey="tabOne">
                            <Tab.Content>
                                <div className="row">
                                    <div className="col-lg-3 col-md-4 col-sm-12 m-b30">
                                        <div className="profile-bx text-center">
                                            <div className="user-profile-thumb">
                                                <img src={"data:image/png;base64,"+data.avatar} alt=""/>
                                            </div>
                                            <div className="profile-info">
                                                <h4>{data.name}</h4>
                                                <span>{data.email}</span>
                                            </div>
                                            <div className="profile-social">
                                                <ul className="list-inline m-a0">
                                                    <li><Link to="#"><i className="fa fa-facebook"></i></Link></li>
                                                    <li><Link to="#"><i className="fa fa-twitter"></i></Link></li>
                                                    <li><Link to="#"><i className="fa fa-linkedin"></i></Link></li>
                                                    <li><Link to="#"><i className="fa fa-google-plus"></i></Link></li>
                                                </ul>
                                            </div>
                                            <div className="profile-tabnav">
                                                <Nav className="nav-tabs">
                                                    <Nav.Item><Nav.Link eventKey="tabOne"><i className="ti-book"></i>All Posts</Nav.Link></Nav.Item>
                                                    <Nav.Item><Nav.Link eventKey="tabTwo"><i className="ti-bookmark-alt"></i>Replies</Nav.Link></Nav.Item>
                                                    <Nav.Item><Nav.Link eventKey="tabFive"><i className="ti-bookmark-alt"></i>Following</Nav.Link></Nav.Item>
                                                    <Nav.Item><Nav.Link eventKey="tabSix"><i className="ti-bookmark-alt"></i>Follower</Nav.Link></Nav.Item>
                                                    <Nav.Item><Nav.Link eventKey="tabThree"><i className="ti-pencil-alt"></i>Edit Profile</Nav.Link></Nav.Item>
                                                    <Nav.Item><Nav.Link eventKey="tabFour"><i className="ti-lock"></i>Change Password</Nav.Link></Nav.Item>
                                                </Nav>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-9 col-md-8 col-sm-12 m-b30">
                                        <div className="profile-content-bx">
                                            <div className="tab-content">
                                                <Tab.Pane eventKey="tabOne">
                                                    <YourBlogs
                                                        posts = { data.posts }
                                                    />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="tabTwo">
                                                    <YourReplies />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="tabFive">
                                                    <YourFollowings />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="tabSix">
                                                    <YourFollowers />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="tabThree">
                                                    <EditYourProfile
                                                        id = { data.id }
                                                        name = {data.name}
                                                        email = {data.email}
                                                        avatar = {data.avatar}
                                                        password = {data.password}

                                                    />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="tabFour">
                                                    <ChangePassword
                                                        id = { data.id }
                                                        password = {data.password}
                                                    />
                                                </Tab.Pane>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Tab.Content>
                        </Tab.Container>
                    </div>
                </div>

            </div>

        </div>

        <Footer/>

    </>;
}

export default PersonalPage;