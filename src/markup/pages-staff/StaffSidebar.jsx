import {useNavigate} from "react-router-dom";
import {Nav} from "react-bootstrap";
import React, { useEffect, useState }  from 'react';

import {connect} from "react-redux";

function StaffSidebar({avatar, name, email, setWhichComponent, logoutAction}) {
    // User status
    const [currentUser, setCurrentUser] = useState([]);
    useEffect(() => {
        fetch("/user_status")
            .then((res) => res.json())
            .then((currentUser) => {
                setCurrentUser(currentUser);
                console.log(currentUser);
            });
    }, []);

    let navigate = useNavigate();

    // handle logout event
      function handleLogout() {
        fetch("/logout")
          .then((res) => res.json())
          .then((data) => {
            if (data.code === 200) {
              alert("Logout Successfully");
            }
            navigate("/");
            logoutAction();
            // set the currentUser as un-login state, trigging component refresh
            setCurrentUser({ code: 400 });
          });
      }

    return (
        <div className="text-center" style={{ position: "fixed", height: "100%", width: "15%" }}>
            <div className="user-profile-thumb">
                <img src={"data:;base64," + avatar} alt=""/>
            </div>
            <div style={{marginBottom: '5px'}} className="profile-info">
                <h4 className="font-white">{name}</h4>
                <span style={{color: "white"}}>{email}</span>
            </div>
            <div className="profile-tabnav">
                <Nav className="nav-tabs">
                    <Nav.Item><Nav.Link eventKey="tabOne" style={{color: "white"}}
                                        className={"staff-nav-button font-white"}
                                        onClick={() => setWhichComponent("homepage")}><i
                        className="ti-dashboard font-white"/>Overview</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link eventKey="tabTwo" style={{color: "white"}}
                                        className={"staff-nav-button font-white"}
                                        onClick={() => setWhichComponent("user")}><i className="ti-user font-white"/>Users
                    </Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link eventKey="tabThree" style={{color: "white"}}
                                        className={"staff-nav-button font-white"}
                                        onClick={() => setWhichComponent("question")}><i
                        className="ti-help font-white"/>Questions
                    </Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link eventKey="tabFour" style={{color: "white"}}
                                        className={"staff-nav-button font-white"}
                                        onClick={() => setWhichComponent("answer")}><i
                        className="ti-thought font-white"/>Answers
                    </Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link eventKey="tabFive" style={{color: "white"}}
                                        className={"staff-nav-button font-white"}
                                        onClick={() => setWhichComponent("coding")}><i
                        className="ti-desktop font-white"/>Coding Questions
                    </Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link eventKey="tabSix" style={{color: "white"}}
                                        className={"staff-nav-button font-white"}
                                        onClick={() => setWhichComponent("organization")}><i
                        className="ti-world font-white"/>Organizations
                    </Nav.Link></Nav.Item>
                    {/*<Nav.Item><Nav.Link eventKey="tabSeven" style={{color: "white"}}*/}
                    {/*                    className={"staff-nav-button font-white"}*/}
                    {/*                    onClick={() => navigate("/staff/posts")}><i*/}
                    {/*    className="ti-layout-list-post font-white"/>Posts*/}
                    {/*</Nav.Link></Nav.Item>*/}
                    <Nav.Item><Nav.Link eventKey="tabEight" style={{color: "white"}}
                                        className={"staff-nav-button font-white"}
                                        onClick={() => {
                                            handleLogout();
                                        }}><i
                        className="ti-shift-left font-white"/>Logout
                    </Nav.Link></Nav.Item>
                </Nav>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
  return {
      isAuthenticated: state.login.isAuthenticated,
      avatar: state.login.userAvatar,
      email: state.login.userEmail,
      name: state.login.userName
  };
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

export default connect(mapStateToProps, mapDispatchToProps)(StaffSidebar);
