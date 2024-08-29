import React, { useEffect, useState } from "react";
import axios from "axios";
import HeaderInfoMatrix from "../layout/header/header-homepage";
import bannerImg from "../../images/banner/banner2.jpg";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import FooterBlack from "../layout/footer/footer-black";
import SideSpecificPost from "../elements/forum-components/side-specific-post";
import IconButton from "@mui/material/IconButton";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Button } from '@mui/material';

const ForumSpecific = () => {
  // get the ids from the url
  const { org_id, post_info } = useParams();
  const [post_id, setPostId] = useState();
  const [org_name, setOrgName] = useState();

  useEffect(() => {
    setPostId(post_info);
    fetch("/forum/find_org_name_by_id/" + org_id)
        .then((response) => response.json())
        .then((response) => {
          setOrgName(response["org_name"]);
          console.log(response);
        });
  }, [post_info, org_id]);

  // Three posts pass to the child
  const [threePosts, setThreePosts] = useState([]);
  useEffect(() => {
    fetch("/forum/fuck_useLocation/" + post_id)
        .then((response) => response.json())
        .then((response) => {
          setThreePosts(response);
        });
  }, [post_id]);

  const [data, setData] = useState({
    id: 0,
    image: "",
    Subject: "",
    Content: "",
    Date: "",
    photos: [],
    Likes: "",
    comments: [],
    follow : [],
    currentUserId: 0
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
    // 这块儿需要上一页传递题目id，maybe use useLocation
    fetch("/forum/detail/" + post_id)
        .then((response) => response.json())
        .then((response) => {
          // console.log("GOTIT");
          // console.log(response);
          setData(response);
          setShowFullImage(Array(response.comments.length).fill(false));
          // 为什么setData之后，加了一些属性比如view: 0
        });
  }, [post_id]);

  // for debug
  useEffect(() => {
    // console.log(data);
    // console.log("data.answer: " + data.Content);
  }, [data]);
  useEffect(() => {
    // console.log("showFullImage: ");
    // console.log(showFullImage);
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
    // console.log("file: ");
    // console.log(file);
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

    // console.log("handleUpload");

    const fd = new FormData();
    // console.log(file);
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

  const [followingStatus, setFollowingStatus] = useState({}); // 新增一个状态来记录每个用户的关注状态
  const handleFollowToggle = async (senderId) => {
    try {
      // 如果当前用户未登录，则直接返回
      if (data.follow === "No log in") {
        console.log("User not logged in");
        return;
      }

      // 检查当前用户是否已关注该用户
      const isFollowing = data.follow.some(item => item.following_id === senderId && item.state === true);

      // 如果未关注，则执行关注操作
      if (!isFollowing) {
        const response = await axios.post(`/follow?user=${senderId}`);
        // 假设后端响应成功
        console.log('Follow action successful:', response.data);
        // console.log(data.follow)

        // 更新页面上的按钮状态
        setFollowingStatus(prevState => ({
          ...prevState,
          [senderId]: true
        }));
      } else {
        // 如果已关注，则执行取消关注操作
        const response = await axios.post(`/unfollow?user=${senderId}`);
        // 假设后端响应成功
        console.log('Unfollow action successful:', response.data);


        // 更新页面上的按钮状态
        setFollowingStatus(prevState => ({
          ...prevState,
          [senderId]: false
        }));
      }
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  useEffect(() => {
    // 页面加载时获取关注状态
    const fetchFollowingStatus = async () => {
      try {
        // 获取关注状态的API端点
        const response = await axios.get("/forum/detail/" + post_id);
        const followingStatusData = response.data.follow;
        console.log('你的关注: ', followingStatusData);

        // 构造关注状态对象
        const initialFollowingStatus = {};
        followingStatusData.forEach(item => {
          initialFollowingStatus[item.following_id] = item.state;
        });

        // 更新状态
        setFollowingStatus(initialFollowingStatus);
      } catch (error) {
        console.error('Error fetching following status:', error);
      }
    };

    // 调用函数获取关注状态
    fetchFollowingStatus();
  }, [post_id]);

  // const handleFollowToggle = async (senderId) => {
  //   try {
  //     if (followingStatus[senderId] === undefined || followingStatus[senderId] === false) {
  //       const response = await axios.get(`/follow?user=${senderId}`);
  //       // Assuming the backend responds with a success message or status
  //       console.log('Follow action successful:', response.data);
  //       setFollowingStatus(prevState => ({
  //         ...prevState,
  //         [senderId]: true
  //       }));
  //     } else {
  //       const response = await axios.get(`/unfollow?user=${senderId}`);
  //       // Assuming the backend responds with a success message or status
  //       console.log('Unfollow action successful:', response.data);
  //       setFollowingStatus(prevState => ({
  //         ...prevState,
  //         [senderId]: false
  //       }));
  //     }
  //
  //   } catch (error) {
  //     console.error('Error following user:', error);
  //   }
  // };



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

  const checkFollowStatus = async (userId) => {
    try {
      const response = await axios.get(`/wp_follow/check?user=${userId}`);
      return response.data.msg; // 返回关注状态：'Follow' 或 'Unfollow'
    } catch (error) {
      console.error('Error checking follow status:', error);
      return 'Error';
    }
  };

  useEffect(() => {
    console.log("isActiveLike: ");
    console.log(isActiveLike);
  }, [isActiveLike]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    // 在页面加载时检查当前用户关注的状态
    const fetchFollowingStatus = async () => {
      try {
        // 获取当前用户关注状态
        const response = await axios.get("/check");
        const followingStatusData = response.data;

        // 构造关注状态对象
        const initialFollowingStatus = {};
        followingStatusData.forEach(item => {
          initialFollowingStatus[item.sender_id] = item.state;
        });

        // 更新状态
        setFollowingStatus(initialFollowingStatus);
      } catch (error) {
        console.error('Error fetching following status:', error);
      }
    };

    // 调用函数获取关注状态
    fetchFollowingStatus();
  }, []);


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
                  <Link to={"/forum/study/" + org_id}>{org_name}</Link>
                </li>
                <li>{data.Subject}</li>
                {/*<li>{"Post [ID = " + post_id + "]"}</li>*/}
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
                                          src={"data:;base64," + answer.avatar}
                                          alt="#"
                                      />


                                      <cite className="fn">{answer.username}</cite>
                                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                        <Button
                                            onClick={() => handleFollowToggle(answer.sender_id)}
                                            variant="contained"
                                            style={{ backgroundColor: followingStatus[answer.sender_id] ? 'red' : 'blue', color: 'white' }}
                                        >
                                          {followingStatus[answer.sender_id] ? 'Unfollow' : 'Follow'}
                                        </Button>
                                      </div>
                                      <span className="says">says:</span>

                                    </div>
                                    {/*<div className="comment-meta">*/}
                                    {/*  <Link to="#">Email: Sender's Email</Link>*/}
                                    {/*</div>*/}
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

                                <div className={"row"}>
                                  <div className={"col-md-6"}>
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

                                {/*<div*/}
                                {/*    style={{*/}
                                {/*      display: "flex",*/}
                                {/*      justifyContent: "space-evenly",*/}
                                {/*      alignItems: "center",*/}
                                {/*    }}*/}
                                {/*>*/}
                                      <input
                                          type="file"
                                          style={{ display: "none" }}
                                          id="images"
                                          accept="image/*"
                                          onChange={handleImageChange}
                                      />
                                </div>

                                  <div className={"col-md-6"}>
                                      <button
                                          className={"uploadBtn"}
                                          style={{ display: "inline" }}
                                          type="submit"
                                      >
                                        Submit Comment
                                      </button>
                                  </div>
                                {/*</div>*/}
                                </div>
                              </p>
                            </form>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-xl-4">
                    {threePosts.length !== 0 && (
                        <SideSpecificPost
                            threePosts={threePosts}
                            currentPostId={post_id}
                        />
                    )}
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

export default ForumSpecific;