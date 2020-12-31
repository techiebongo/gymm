/* eslint-disable no-sequences */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
import React from "react";
import "../../Utils/style.css";
import facebook from "../../Images/facebook.png";
import gmail from "../../Images/gmail.png";
import { Link } from "react-router-dom";
import FacebookLogin from "react-facebook-login";
import { GoogleLogin } from "react-google-login";
import { connect } from "react-redux";
import {
  login_request,
  socialLogin_request,
} from "./../../Action/login_action";
import { store } from "../..";
import axios from "axios";
import Api from "../../Url";
import Loader from './loader';

// const responseFacebook = (response) => {
//   console.log("Facebook response  ",response);
// };

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      pwd: "",
      emailError: "",
      pwdError: "",
      wrongLogin: "",
      loginSuccess: false,
      googleError: '',
      facebookError: '',
      wrongSocalLogin: '',
      loader: false,
    };
  }

  componentDidMount() {
    // console.log("store---->", store.getState().loginReducer);
  }

  loaderHandler = () => {
    // console.log(" hello");
    this.setState({loader: !this.state.loader});
  }


  validate = (text) => {
    let reg = /^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/;
    if (reg !== text) {
      this.setState({ emailError: "incorrect" });
      return false;
    } else {
      this.setState({ email: text });
    }
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    // console.log("hello");
  };

  handleLogin = () => {
    this.props.history.push({
      pathname: "/forgotPassword",
    });
  };

  handleSubmit = (event) => {
    if (this.state.email === "") {
      this.setState({ fnameError: "Field Cannot be blanked" });
    } else if (this.state.emailError === "incorrect") {
      this.setState({ emailError: "Email is incorrect" });
    } else if (this.state.pwd.length < 6) {
      this.setState({ pwdError: "Enter minimum 6 charactor", emailError: "" });
    } else {
      this.loaderHandler();
      event.preventDefault();
      let object = {
        email: this.state.email,
        password: this.state.pwd,
        devicetoken: 1234,
        apptype: "BROWSER",
      };
      // console.log(object);
      axios
        .post(`${Api.API_URL}/login`, object, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          // console.log(res);
          if (res.data.response_code === 2000) {
            // this.setState({emailError: '', pwdError: '', loginSuccess: true});
            localStorage.setItem('userData', JSON.stringify(res.data.response_data));
            // console.log(res.data.response_message, "response data", localStorage.getItem('userData'));
            this.loaderHandler();
            this.props.onClick();
            
          } else if (res.data.response_code === 5002) {
            this.setState({
              emailError: "",
              pwdError: "",
              wrongLogin:
                "Wrong password or email. Please provide registered details.",
            });
            // console.log(res.data.response_message, "response data");
            this.loaderHandler();
          } else if (res.data.response_code === 5010) {
            this.setState({
              emailError: "",
              pwdError: "",
              wrongLogin:
                "Your account is not activated. Please activate your account.",
            });
            // console.log(res.data.response_message, "response data");
            this.loaderHandler();
          } else {
            this.setState({
              emailError: "",
              pwdError: "",
              wrongLogin: res.data.response_message,
            });
        this.loaderHandler();
          }
        })
        .catch((err) => console.log(err.response.data));
        // this.loaderHandler();
    }
  };

  responseFacebook = (response) => {
    // console.log("facebook response ===  ",response);
    this.facebookSignup(response);
  }

  facebookSignup = (res) => {
    this.loaderHandler();
    // console.log("res for facebook==>", res);
    let facebookObj = {
      name: res.name,
      email: res.email,
      socialLogin: {
        type: "FACEBOOK",
        image: res.picture.data.url,
        socialId: res.id,
      },
      devicetoken: 123456,
      apptype: "BROWSER",
    };
    // console.log("set facebook login success row data for api hit === ",facebookObj);
    axios
    .post(`${Api.API_URL}/social-login`, facebookObj, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      // console.log("output result facebook api",res);
      if (res.data.response_code === 2000) {
        localStorage.setItem('userData', JSON.stringify(res.data.response_data));
        // console.log("facebook api response data",res.data.response_message);
        this.loaderHandler();
        this.props.onClick();
      } else if (res.data.response_code === 5002) {
        this.setState({wrongSocalLogin: res.data.response_message});
        // console.log("facebook api response data",res.data.response_message);
        this.loaderHandler();
      } else if (res.data.response_code === 5010) {
        this.setState({wrongSocalLogin: res.data.response_message});
        // console.log("facebook api response data",res.data.response_message,);
        this.loaderHandler();
      } else {
        this.loaderHandler();
      }
    })
    .catch((err) => console.log(err.response.data));
    // this.loaderHandler();

  };

  googleSignup = (res) => {
    this.loaderHandler();
    // console.log("res for google==>", res);
    let googleObj = {
      name: res.name,
      email: res.email,
      socialLogin: {
        type: "GOOGLE",
        image: res.imageUrl,
        socialId: res.googleId,
      },
      devicetoken: 123456,
      apptype: "BROWSER",
    };
    // console.log("set google login success row data for api hit === ",googleObj);
    axios
    .post(`${Api.API_URL}/social-login`, googleObj, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      // console.log("output result google api",res);
      if (res.data.response_code === 2000) {
        localStorage.setItem('userData', JSON.stringify(res.data.response_data));
        // console.log("google api response data",res.data.response_message);
        this.loaderHandler();
        this.props.onClick();
      } else if (res.data.response_code === 2008) {
        localStorage.setItem('userData', JSON.stringify(res.data.response_data));
        // console.log("google api response data",res.data.response_message);
        this.loaderHandler();
        this.props.onClick();
      } else if (res.data.response_code === 5002) {
         this.setState({wrongSocalLogin: res.data.response_message});
        // console.log("google api response data",res.data.response_message);
        this.loaderHandler();
      } else if (res.data.response_code === 5010) {
         this.setState({wrongSocalLogin: res.data.response_message});
        // console.log("google api response data",res.data.response_message,);
        this.loaderHandler();
      } else {
        this.loaderHandler();
      }
    })
    .catch((err) => console.log(err.response.data));
    // this.loaderHandler();
    // this.props.socialLogin(googleObj);
  };
  failureResponseGoogle=()=>{
    console.log(" response failure ");
  }

  render() {
    const responseGoogle = (response) => {
      var res = response.profileObj;
      this.googleSignup(res);
    };

    return (
      <React.Fragment>
        <div style={{}}>
          <div className="loginmain">
            <h3> Signin </h3>
            <div className="socialicon">
              <button>
                <FacebookLogin
                  appId="262442971559552"
                  autoLoad={false}
                  textButton=""
                  fields="name,email,picture"
                  callback={this.responseFacebook}
                  cssClass="my-facebook-button-class"
                  icon={<img src={facebook} />}
                  cssClass="facebook"
                />
              </button>
              <button>
                <GoogleLogin
                  clientId="487514539460-j9ec2fgd70lu7nr1c6oi7f70v6qkga28.apps.googleusercontent.com"
                  //buttonText={<img style={{ }} src={gmail} />}
                  render={(renderProps) => (
                    <button
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      style={{ backgroundColor: "#fff" }}
                    >
                      <img style={{}} src={gmail} />
                    </button>
                  )}
                  icon={false}
                  onSuccess={responseGoogle}
                  className="google"
                  onFailure={this.failureResponseGoogle}
                ></GoogleLogin>
              </button>
            </div>
            <b style={{ textAlign: "center", padding: 1 }}>
                <span style={{ color: "red", fontSize: 12 }}>
                  {this.state.wrongSocalLogin}
                </span>
              </b>
            <h5> or </h5>
            <div className="logfrom">
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={this.handleChange}
                value={this.state.email}
              />
              <span style={{ color: "red", fontSize: 12, paddingLeft: 30 }}>
                {this.state.emailError}
              </span>
              <br />
              <input
                type="text"
                name="pwd"
                placeholder="Password"
                onChange={this.handleChange}
                value={this.state.pwd}
              />
              <span style={{ color: "red", fontSize: 12, paddingLeft: 30 }}>
                {this.state.pwdError}
              </span>
              <br />
              <p>
                <div onClick={this.props.onPress}>
                 <b id='forgotPassword_id' style={{fontSize: 18, fontWeight: 'initial', color: "#2a2a2a"}}> Forgot password?</b>
                </div>
              </p>
              <b style={{ textAlign: "center", padding: 1 }}>
                <span style={{ color: "red", fontSize: 12 }}>
                  {this.state.wrongLogin}
                </span>
              </b>
              <br />
              <input type="submit" value="Submit" onClick={this.handleSubmit} />

              <h6>
                Don’t have an account yet?{" "}
                <Link onClick={this.props.onClick2} style={{ fontSize: 18 }}>
                  Signup
                </Link>
              </h6>
            </div>
          </div>
        </div>
        {this.state.loader?
                 <Loader modalToggle={this.state.loader}/>
                : null }
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log("state===>", state);

  return {
    loginData: state.loginReducer.response,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getLoginApi: (object) => {
      dispatch(login_request(object));
    },
    socialLogin: (object) => {
      dispatch(socialLogin_request(object));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
