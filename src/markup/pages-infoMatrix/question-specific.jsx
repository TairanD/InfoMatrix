import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {connect} from "react-redux";
import {useNavigate} from "react-router-dom"
// Layout

// Elements

// Images
import bannerImg from "../../images/banner/banner2.jpg";
import HeaderInfoMatrix from "../layout/header/header-homepage";
import FooterBlack from "../layout/footer/footer-black";
import SideBarRight from "../elements/side-bar-right";

//AI


const SpecificQuestion = ({isAuthenticated, dispatch}) => {
    const navigate = useNavigate();

    // const {q_id} = props.match.params;
    const {q_id} = useParams();
    const [token, setToken] = useState("")
    console.log("question ID: ", q_id);

    const [data, setData] = useState({
        answers: [],
        id: 0,
        image: "",
        info: "",
        name: "",
        tags: "",
    });

    // content & file are states for uploading function
    const [content, setContent] = useState("");
    const [file, setFile] = useState(null);

    // showFullImage state is to record the status of if we should zoom in/out answer's image
    const [showFullImage, setShowFullImage] = useState([]);

    // isActiveLike state records the status of the like button
    const [isActiveLike, setIsActiveLike] = useState(false);

    useEffect(() => {
        // 这块儿需要上一页传递题目id，maybe use useLocation
        fetch("/find_question/" + q_id)
            .then((response) => response.json())
            .then((response) => {
                console.log("response:", response);
                setData(response);
                setShowFullImage(Array(response.answers.length).fill(false));
                // 为什么setData之后，加了一些属性比如view: 0
            });
    }, [q_id]);

    // for debug
    useEffect(() => {
        console.log(data);
        console.log("data.answer: " + data.name);
        setToken(data.name)
    }, [data]);
    useEffect(() => {
        console.log("showFullImage: ");
        console.log(showFullImage);
    }, [showFullImage]);

    useEffect(() => {
        console.log("token: " + token);
    }, [token]);

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

    const handleAnswerSubmit = (e) => {
        e.preventDefault();

        if (!isAuthenticated) {
            navigate('/login');
        } else {
            console.log("handleUpload");

            const fd = new FormData();
            console.log(file);
            fd.append("file", file);
            fd.append("content", content);

            axios
                .post("/answer_submit/1", fd, {
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
        }


    };

    const handleLikeClick = (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            navigate('/login');
        } else {
            setIsActiveLike(!isActiveLike);
        }

        // fetch("/find_question/" + q_id)
        //   .then((response) => response.json())
        //   .then((response) => {
        //     console.log(response);
        //     setData(response);
        //     setShowFullImage(Array(response.answers.length).fill(false));
        //   });
    }

    useEffect(() => {
        console.log("isActiveLike: ");
        console.log(isActiveLike);
    }, [isActiveLike]);

    return (
        <>
            <HeaderInfoMatrix/>
            <div className="page-content">
                <div
                    className="page-banner ovbl-dark"
                    style={{backgroundImage: "url(" + bannerImg + ")"}}
                >
                    <div className="container">
                        <div className="page-banner-entry">
                            <h1 className="text-white">Question Answers</h1>
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
                                <Link to="/question-bank">Question Bank</Link>
                            </li>
                            <li>{"Question [ID = " + q_id + "]"}</li>
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
                                            <img src={"data:;base64," + data.image} alt=""/>
                                        </div>
                                        <div className="info-bx">
                                            <ul className="media-post">
                                                <li>
                                                    <Link to="#">
                                                        <i className="fa fa-calendar"></i>May 14 2019
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="#">
                                                        <i className="fa fa-comments-o"></i>
                                                        {data.answers.length} Comment
                                                    </Link>
                                                </li>
                                            </ul>
                                            <h3 className="post-title">{data.name} </h3>
                                            <p>{data.info}</p>
                                            <div className="ttr-divider bg-gray">
                                                <i className="icon-dot c-square"></i>
                                            </div>
                                            <div className="widget_tag_cloud">
                                                <h6>TAGS</h6>
                                                <div className="tagcloud">
                                                    {data.tags.split("$").map((tag, index) => (
                                                        <Link to="#">{tag}</Link>
                                                    ))}
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
                                                {data.answers.length} Answers
                                            </h4>
                                            <div className="clearfix m-b20">
                                                <ol className="comment-list">
                                                    {data.answers.map((answer, index) => (
                                                        <li className="comment">
                                                            <div className="comment-body">
                                                                <div className="comment-author vcard">
                                                                    <img
                                                                        className="avatar photo"
                                                                        src={"data:;base64," + answer.sender.avatar}
                                                                        alt=""
                                                                    />
                                                                    <cite className="fn">
                                                                        {answer.sender.name}
                                                                    </cite>
                                                                    <span className="says">says:</span>
                                                                </div>
                                                                <div className="comment-meta">
                                                                    <Link to="#">
                                                                        Email: {answer.sender.email}
                                                                    </Link>
                                                                </div>
                                                                <p>{answer.content}</p>

                                                                {answer.image !== "" && (
                                                                    <div className="img-box">
                                                                        <img
                                                                            className={identifyClass(
                                                                                showFullImage[index]
                                                                            )}
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
                                                                {/*<div className="like-box">*/}
                                                                {/*    <span*/}
                                                                {/*        className={isActiveLike ? "material-symbols-outlined like-icon-active" : "material-symbols-outlined like-icon-negative"}*/}
                                                                {/*        onClick={handleLikeClick}>thumb_up</span>*/}
                                                                {/*    <span className="like-number">{answer.rate}</span>*/}
                                                                {/*    /!*<Link to="#" className="material-symbols-outlined">*!/*/}
                                                                {/*    /!*  Reply*!/*/}
                                                                {/*    /!*</Link>*!/*/}
                                                                {/*</div>*/}
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
                                                                style={{display: "none"}}
                                                                to="#"
                                                                id="cancel-comment-reply-link"
                                                                rel="nofollow"
                                                            >
                                                                Cancel reply
                                                            </Link>{" "}
                                                        </small>
                                                    </h4>
                                                    <form className="comment-form">
                                                        <p
                                                            className="comment-form-comment"
                                                            style={{float: "none", marginBottom: "20px"}}
                                                        >
                                                            <label htmlFor="comment">Comment</label>
                                                            <textarea
                                                                style={{padding: "5px"}}
                                                                rows="8"
                                                                name="comment"
                                                                placeholder="Comment"
                                                                id="comment"
                                                                onChange={handleContentChange}
                                                            ></textarea>
                                                        </p>
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                justifyContent: "space-evenly",
                                                                alignItems: "center",
                                                            }}
                                                        >
                                                            <label
                                                                for={"fileBtn"}
                                                                className={"uploadBtn"}
                                                                style={{
                                                                    display: "inline",
                                                                    cursor: "pointer",
                                                                    margin: "0",
                                                                }}
                                                            >
                                                                {label}
                                                            </label>
                                                            <input
                                                                type="file"
                                                                id={"fileBtn"}
                                                                name="Upload a picture"
                                                                style={{display: "none"}}
                                                                onChange={handleFileChange}
                                                            ></input>
                                                            <button
                                                                className={"uploadBtn"}
                                                                style={{display: "inline"}}
                                                                onClick={handleAnswerSubmit}
                                                            >
                                                                Submit Comment
                                                            </button>
                                                        </div>

                                                        {/*<p className="form-submit">*/}
                                                        {/*    <input type="submit" value="Submit Comment"*/}
                                                        {/*           className="submit" name="submit"/>*/}
                                                        {/*</p>*/}
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-xl-4">
                                    <SideBarRight init_token={token}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <FooterBlack/>
        </>
    );
};


const mapStateToProps = (state) => {
    return {isAuthenticated: state.login.isAuthenticated};
}

export default connect(mapStateToProps)(SpecificQuestion);
