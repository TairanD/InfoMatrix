import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";

// Images
import bannerImg from "../../images/background/bg2.jpg";
import logoWithText from "../../images/logo-infoMatrix/logo-infoMatrix-white.png";

function Login(props) {
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

    const response = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    let data;
    if (response.ok === true) {
      console.log("Submit Successfully");
      data = await response.json();
    } else {
      console.log("Fail");
    }

    if (data.code === 200) {
      await props.loginAction();
      console.log("data.role", data.role);
      if (data.role === 0) {
        navigate("/");
      } else if (data.role === 1) {
        navigate("/staff-new");
      }
    } else {
      alert(data.msg);
    }

    // .then((response) => {
    //   console.log(response);
    //   if (response.ok === true) {
    //     console.log("Submit Successfully");
    //     return response.json();
    //   } else {
    //     console.log("Fail", response.json());
    //   }
    // })
    // .then((data) => {
    //   console.log(data);
    //   if (data.code === 200){
    //     props.loginAction();
    //     console.log("data.role", data.role)
    //     if (data.role === 0){
    //       navigate('/');
    //     }
    //     else if (data.role === 1){
    //       navigate('/staff-new');
    //     }

    //   }else{
    //     alert(data.msg);
    //   }
    // });
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
                Login to your <span>Account</span>
              </h2>
              <p>
                Don't have an account?{" "}
                <Link to="/register">Create one here</Link>
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
                        required=""
                        placeholder="Email"
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
                        className="form-control"
                        placeholder="Password"
                        required=""
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group form-forget">
                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="customControlAutosizing"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customControlAutosizing"
                      >
                        Remember me
                      </label>
                    </div>
                    <Link to="/forget-password" className="ml-auto">
                      Forgot Password?
                    </Link>
                  </div>
                </div>
                <div className="col-lg-12 m-b30">
                  <button
                    name="submit"
                    type="submit"
                    value="Submit"
                    className="btn button-md"
                  >
                    Login
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
  return { isAuthenticated: state.login.isAuthenticated };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginAction: async () => {
      const response = await fetch("/user_status");
      const user = await response.json();
      dispatch({
        type: "login",
        userAvatar: user.avatar,
        ifStaff: user.role !== 0,
        userEmail: user.email,
        userName: user.name,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
