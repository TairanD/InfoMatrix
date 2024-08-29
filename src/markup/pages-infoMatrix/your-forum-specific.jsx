import React, { useEffect, useState } from "react";
import axios from "axios";
import HeaderInfoMatrix from "../layout/header/header-homepage";
import bannerImg from "../../images/banner/banner2.jpg";
import { Link } from "react-router-dom";
import { useParams, useLocation } from "react-router-dom";

import FooterBlack from "../layout/footer/footer-black";
import SideSpecificPost from "../elements/forum-components/side-specific-post";

const YourForumSpecific = (props) => {

    // get the ids from the url
    const { org_id, post_id } = useParams();

    const location = useLocation();
    const { orgName, Belong_type } = location.state ? location.state : {};
    // get the org_name from useLocation

    const [data, setData] = useState({
        id: 0,
        image: "",
        Subject: "",
        Content: "",
        Date: "",
        photos: [],
        Likes: "",
        comments: [],
    });

    // content & file are states for uploading function
    const [content, setContent] = useState("");
    const [file, setFile] = useState(null);

    // showFullImage state is to record the status of if we should zoom in/out answer's image
    const [showFullImage, setShowFullImage] = useState([]);

    // isActiveLike state records the status of the like button
    const [isActiveLike, setIsActiveLike] = useState(false);

    const [formData, setFormData] = useState({ url_last_part: 0, comment_content: '', sender_id : 0, date: ''});

    useEffect(() => {
        fetch("/forum/detail/" + post_id)
            .then((response) => response.json())
            .then((response) => {
                console.log("GOTIT");
                console.log(response);
                setData(response);
                setShowFullImage(Array(response.comments.length).fill(false));
                // 为什么setData之后，加了一些属性比如view: 0
            });
    }, [post_id]);

    // for debug
    useEffect(() => {
        console.log(data);
        console.log("data.answer: " + data.Content);
    }, [data]);
    useEffect(() => {
        console.log("showFullImage: ");
        console.log(showFullImage);
    }, [showFullImage]);

    const handleAnswerClick = (index) => {
        // copy the original array
        const temp = [...showFullImage];
        // conducting changes
        temp[index] = !showFullImage[index];
        // in here, the status showFullImage changes, and therefore render method will be executed
        setShowFullImage(temp);
    };

    const identifyClass = (ifShowFullImage) =>
        ifShowFullImage ? "full-img" : "small-img";

    const [label, setLabel] = useState("Upload an image");

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        const fileName = selectedFile.name;
        if (
            fileName.toLowerCase().endsWith(".png") ||
            fileName.toLowerCase().endsWith(".jpg")
        ) {
            setFile(selectedFile);
            setLabel(fileName);
        } else {
            alert("Please Select a Photo");
        }
    };

    // for debug
    useEffect(() => {
        console.log("file: ");
        console.log(file);
    }, [file]);

    const [commentContent, setCommentContent] = useState('');
    const [imageFile, setImageFile] = useState(null);

    const handleCommentChange = (e) => {
        setCommentContent(e.target.value);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const fileName = file.name;
        const reader = new FileReader();

        reader.onload = (event) => {
            // Read the image file as a data URL
            const base64Image = event.target.result;
            setImageFile(base64Image);
            setLabel(fileName);
        };

        // Read the image file
        reader.readAsDataURL(file);
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = {
                comment_content: commentContent,
                url_last_part: post_id,
                date: new Date().toISOString(),
                images: imageFile
            };

            const response = await fetch('/forum/submit_comment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error('Failed to submit comment.');
            }
            const data = response.json();
            console.log('Comment submitted successfully:', data.message);
            // Redirect or display message as needed
            window.location.reload();

        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };


    const handleAnswerSubmit = (e) => {
        e.preventDefault();

        console.log("handleUpload");

        const fd = new FormData();
        console.log(file);
        fd.append("file", file);
        fd.append("content", content);

        axios
            .post("/submit_comment", fd, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                console.log(response.data);
                setData((prevState) => ({
                    ...prevState,
                    answers: [...prevState.answers, response.data],
                }));
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    const handleLikeClick = (e) => {
        e.preventDefault();

        setIsActiveLike(!isActiveLike);
        // fetch("/find_question/" + q_id)
        //   .then((response) => response.json())
        //   .then((response) => {
        //     console.log(response);
        //     setData(response);
        //     setShowFullImage(Array(response.answers.length).fill(false));
        //   });
    };

    useEffect(() => {
        console.log("isActiveLike: ");
        console.log(isActiveLike);
    }, [isActiveLike]);

    useEffect(() => {
        console.log(data);
    }, [data]);

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
                            <h1 className="text-white">{ data.Subject }</h1>
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
                            <li>
                                <Link
                                    to={data.Belong_type === 0 ? "/forum/job" : "/forum/study"}
                                >
                                    {data.Belong_type === 0 ? "Job" : "Study"}
                                </Link>
                            </li>
                            <li>

                                <Link to={data.Belong_type === 0 ? "/forum/job/" + org_id : "/forum/study/" + org_id}>{orgName}</Link>

                            </li>
                            <li>{ data.Subject }</li>
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
                                            {/* Just show the first three image now, for better presentation */}
                                            {data.photos.length !== 0 &&
                                                data.photos.map((image, index) => (
                                                    <img src={"data:;base64," + image.photo} alt="" />
                                                ))}
                                        </div>
                                        <div className="info-bx">
                                            <ul className="media-post">
                                                <li>
                                                    <Link to="#">
                                                        <i className="fa fa-calendar"></i>
                                                        {data.Date}
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="#">
                                                        <i className="fa fa-comments-o"></i>
                                                        {data.comments.length} Comment
                                                    </Link>
                                                </li>
                                            </ul>
                                            <h3 className="post-title">{data.Subject} </h3>
                                            <p>{data.Content}</p>
                                            <div className="ttr-divider bg-gray">
                                                <i className="icon-dot c-square"></i>
                                            </div>
                                            <div className="widget_tag_cloud">
                                                <h6>TAGS</h6>
                                                <div className="tagcloud">
                                                    <Link to="#">Potential Tag</Link>
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

                                    <div className="clear" id="comment-list">
                                        <div className="comments-area" id="comments">
                                            <h4 className="comments-title">
                                                {data.comments.length} Replies
                                            </h4>

                                            <div className="clearfix m-b20">
                                                <ol className="comment-list">
                                                    {data.comments.map((answer, index) => (
                                                        <li className="comment">
                                                            <div className="comment-body">
                                                                <div className="comment-author vcard">
                                                                    <img
                                                                        className="avatar photo"
                                                                        // src={"data:;base64," + answer.sender.avatar}
                                                                        alt=""
                                                                    />
                                                                    <cite className="fn">{answer.sender_id}</cite>
                                                                    <span className="says">says:</span>
                                                                </div>

                                                                <p>{answer.content}</p>

                                                                {answer.image && (  // Check if answer.image is truthy (not empty, null, or undefined)
                                                                    <div className="img-box">
                                                                        <img
                                                                            className={identifyClass(showFullImage[index])}
                                                                            src={"data:;base64," + answer.image}
                                                                            onClick={() => {
                                                                                handleAnswerClick(index);
                                                                                console.log(index);
                                                                                console.log(showFullImage);
                                                                            }}
                                                                            alt="answer pic"
                                                                        />
                                                                    </div>
                                                                )}




                                                                <div className="like-box">
                                  <span
                                      className={
                                          isActiveLike
                                              ? "material-symbols-outlined like-icon-active"
                                              : "material-symbols-outlined like-icon-negative"
                                      }
                                      onClick={handleLikeClick}
                                  >
                                    thumb_up
                                  </span>
                                                                    <span className="like-number">
                                    {answer.rate}
                                  </span>
                                                                    {/*<Link to="#" className="material-symbols-outlined">*/}
                                                                    {/*  Reply*/}
                                                                    {/*</Link>*/}
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ol>
                                                <div className="comment-respond" id="respond">
                                                    <h4 className="comment-reply-title" id="reply-title">
                                                        Leave a Reply{" "}
                                                        <small>
                                                            {" "}
                                                            <Link
                                                                style={{ display: "none" }}
                                                                to="#"
                                                                id="cancel-comment-reply-link"
                                                                rel="nofollow"
                                                            >
                                                                Cancel reply
                                                            </Link>{" "}
                                                        </small>
                                                    </h4>
                                                    <form className="comment-form" onSubmit={handleCommentSubmit}>
                                                        <p
                                                            className="comment-form-comment"
                                                            style={{ float: "none", marginBottom: "20px" }}
                                                        >
                                                            <label htmlFor="comment">Comment</label>
                                                            <textarea
                                                                style={{ padding: "5px" }}
                                                                rows="8"
                                                                name="comment"
                                                                placeholder="Comment"
                                                                id="comment_content"
                                                                onChange={handleCommentChange}
                                                                value={commentContent}
                                                            ></textarea>
                                                            <input
                                                                type="hidden"
                                                                id="url_last_part"
                                                                value={post_id}
                                                            />
                                                            <input
                                                                type="hidden"
                                                                id="date"
                                                                value={new Date().toISOString()}
                                                            />


                                                            <label
                                                                htmlFor="images"
                                                                className={"uploadBtn"}
                                                                style={{
                                                                    display: "inline",
                                                                    cursor: "pointer",
                                                                    margin: "0",
                                                                }}
                                                            >
                                                                {label}
                                                            </label>
                                                            <div
                                                                style={{
                                                                    display: "flex",
                                                                    justifyContent: "space-evenly",
                                                                    alignItems: "center",
                                                                }}
                                                            >

                                                                <input
                                                                    type="file"
                                                                    style={{ display: "none" }}
                                                                    id="images"
                                                                    accept="image/*"
                                                                    onChange={handleImageChange}
                                                                />

                                                                <button
                                                                    className={"uploadBtn"}
                                                                    style={{ display: "inline" }}
                                                                    type="submit"
                                                                >
                                                                    Submit Comment
                                                                </button>


                                                            </div>

                                                        </p>




                                                    </form>
                                                </div>

                                            </div>
                                        </div>
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
};

export default YourForumSpecific;