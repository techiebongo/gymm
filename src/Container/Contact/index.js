/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
import React from "react";
import Headers from "../../Compenents/Comman/header";
import Footer from "../../Compenents/Comman/footer";
import "../../Utils/style.css";
import googleplay2 from "../../Images/googleplay2.png";
import appstore2 from "../../Images/appstore2.png";
import axios from "axios";
import Loader from "../../Compenents/Comman/loader";
import { connect } from "react-redux";
import { CLOSEUNDERLINE } from "../../Action/type";

class Contact extends React.Component {
  constructor() {
    super();
    this.state = {
      fname: "",
      lname: "",
      phone: "",
      email: "",
      comment: "",
      fieldError: "",
      error: "field cannot be blanked",
      successMessage: "",
      loader: false,
    };
  }

  componentDidMount=()=>{
    this.props.setNullUnderLine(1);
  }
  loaderHandler = () => {
    // console.log(" hello");
    this.setState({ loader: !this.state.loader });
  };

  handleSubmit = (event) => {
    if (
      this.state.fname === "" &&
      this.state.lname === "" &&
      this.state.email === "" &&
      this.state.phone === "" &&
      this.state.comment === ""
    ) {
      // console.log(" enter");
      this.setState({
        fieldError: "Fields cannot be blanked",
        successMessage: "",
      });
    } else if (this.state.fname === "") {
      this.setState({
        fieldError: `First Name ${this.state.error}`,
        successMessage: "",
      });
    } else if (this.state.lname === "") {
      this.setState({
        fieldError: `Last Name ${this.state.error}`,
        successMessage: "",
      });
    } else if (this.state.email === "") {
      this.setState({
        fieldError: `Email ${this.state.error}`,
        successMessage: "",
      });
    } else if (this.state.phone === "") {
      this.setState({
        fieldError: `Phone Number ${this.state.error}`,
        successMessage: "",
      });
    } else if (this.state.comment === "") {
      this.setState({
        fieldError: `Comment ${this.state.error}`,
        successMessage: "",
      });
    } else {
      this.loaderHandler();
      event.preventDefault();

      //alert("lojjjj")
      let object = {
        firstName: this.state.fname,
        lastName: this.state.lname,
        email: this.state.email,
        phone: this.state.phone,
        message: this.state.comment,
      };
      // console.log(object);
      //this.props.getLoginApi(object)
      axios
        .post(
          `https://nodeserver.mydevfactory.com:1436/api/user-contact-admin`,
          object,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          // console.log(res);
          if (res.data.response_code === 2000) {
            this.setState({ successMessage: res.data.message, fieldError: "" });
            // console.log(res.data.message, "response data");
            this.loaderHandler();
          } else {
            console.log("response error");
            this.setState({ successMessage: "", fieldError: "" });
            this.loaderHandler();
          }
        })
        .catch((err) => alert(err.response.data));
    }
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    // console.log("hello", [e.target.name], e.target.value);
  };

  render() {
    return (
      <React.Fragment>
        <div style={{height:140}}></div>
        <div
          className="innnerban Sticky"
          style={{ position: "fixed", top: 0, zIndex: 100 ,backgroundColor: '#000080'}}
        >
          <Headers backgroundColor="#000080" />
        </div>

        <div className="contusmn">
          <div className="container">
            <div className="row">
              <div className="col-lg-10 offset-lg-1 col-md-12">
                <div className="continn">
                  <h4> Contact us for more information </h4>
                  <p>
                    {" "}
                    Send your information and a manager will contact you within
                    48 hours{" "}
                  </p>

                  <input
                    type="text"
                    name="fname"
                    placeholder="First Name"
                    onChange={this.handleChange}
                    value={this.state.fname}
                  />

                  <input
                    type="text"
                    name="lname"
                    placeholder="Last Name"
                    onChange={this.handleChange}
                    value={this.state.lname}
                  />

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    onChange={this.handleChange}
                    value={this.state.phone}
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={this.handleChange}
                    value={this.state.email}
                  />

                  <textarea
                    name="comment"
                    placeholder="Type Your Comment"
                    onChange={this.handleChange}
                    value={this.state.comment}
                  ></textarea>
                  <span id="contactErrorText">
                    <b
                      style={{
                        color: "red",
                        fontSize: 16,
                        paddingLeft: 30,
                        paddingBottom: 30,
                      }}
                    >
                      {this.state.fieldError}
                    </b>
                  </span>
                  <br />
                  <span id="contactErrorText">
                    <b
                      style={{
                        color: "green",
                        fontSize: 16,
                        paddingLeft: 30,
                        paddingBottom: 30,
                      }}
                    >
                      {this.state.successMessage}
                    </b>
                  </span>
                  <br />
                  {this.state.loader ? (
                    <Loader modalToggle={this.state.loader} />
                  ) : null}
                  <input
                    type="submit"
                    value="Submit"
                    onClick={this.handleSubmit}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div
              // className="googleapp allcenter2"
              id="googleAppstore2_container"
            >
              <a>
                <img src={appstore2} />
              </a>
              <a>
                <img src={googleplay2} />
              </a>
            </div>
          </div>
        </div>

        <Footer />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log('state',state);
  return {
    // imageUrl: state.imageUrlReducer.url,
    // credit: state.imageUrlReducer.credit,
  };
};

const mapPropsToState = (dispatch) => {
  // console.log("dispatch");
  return {
    setNullUnderLine: async no => await dispatch({type: CLOSEUNDERLINE, payload: no}),
  };
};

export default connect(mapStateToProps, mapPropsToState)(Contact);
