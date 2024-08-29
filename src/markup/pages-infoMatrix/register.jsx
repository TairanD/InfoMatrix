import React, { useState, useEffect } from "react";
import {Link, useNavigate} from "react-router-dom";
import {connect} from "react-redux";

// Images
import logoWhite2 from "../../images/logo-white-2.png";
import bannerImg from "../../images/background/bg2.jpg";
import logoWithText from "../../images/logo-infoMatrix/logo-infoMatrix-white.png";

function Register(props) {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    check: "",
    role: "0",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.check) {
      console.log("hello");
      alert("Confirm your password");
    } else {
      fetch("/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }).then((response) => {
        if (response.ok === true) {
          console.log("Submit Successfully");
          console.log(response);
          return response.json();
        } else {
          console.log("Fail");
        }
      }).then((data) => {
        console.log("fuck lou");
        console.log(data);
        if (data.code === 200){
          props.loginAction();
          alert(data.msg)
          navigate('/login');
        }else{
          alert(data.msg);
        }
      });
    }
  };

  return (
    <>
      <div className="account-form">
        <div
          className="account-head"
          style={{ backgroundImage: "url(" + bannerImg + ")" }}
        >
          <Link to="/">
            <img style={{ maxWidth: "400px" }} src={logoWithText} alt="" />
          </Link>
        </div>
        <div className="account-form-inner">
          <div className="account-container">
            <div className="heading-bx left">
              <h2 className="title-head">
                Sign Up <span>Now</span>
              </h2>
              <p>
                Login Your Account <Link to="/login">Click here</Link>
              </p>
            </div>
            <form className="contact-bx" onSubmit={handleSubmit}>
              <div className="row placeani">
                <div className="col-lg-12">
                  <div className="form-group">
                    <div className="input-group">
                      <input
                        name="username"
                        type="text"
                        placeholder="User Name"
                        required
                        className="form-control"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <div className="input-group">
                      <input
                        name="email"
                        type="text"
                        placeholder="Email"
                        required
                        className="form-control"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <div className="input-group">
                      <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        required
                        className="form-control"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <div className="input-group">
                      <input
                        name="check"
                        type="password"
                        placeholder="Check your Password"
                        className="form-control"
                        required
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <div className="input-group">
                      <select
                        name="role"
                        style={{ cursor: "pointer" }}
                        required
                        className="form-control"
                        onChange={handleChange}
                      >
                        <option value={0}>User</option>
                        <option value={1}>Administer</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12 m-b30">
                  <button
                    name="submit"
                    type="submit"
                    value="Submit"
                    className="btn button-md"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {isAuthenticated: state.login.isAuthenticated};
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginAction: ()=>{
      dispatch({
        type: "login"
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
