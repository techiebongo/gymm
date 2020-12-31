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
import Api from "../../Url";
import Loader from "../../Compenents/Comman/loader";
import { connect } from "react-redux";
import { CREDIT, CLOSEUNDERLINE } from "../../Action/type";

class Unsubscription extends React.Component {
  constructor() {
    super();
    this.state = {
      cridencial: JSON.parse(localStorage.getItem("paymentCheck")),
      result: "",
      resultColor: "",
      loader: false,
    };
  }

  loaderHandler = () => {
    // console.log(" hello");
    this.setState({ loader: !this.state.loader });
  };

  componentDidMount = () => {
    this.props.setNullUnderLine(1);
    this.loaderHandler();
    this.unSubscribe();
  };

  unSubscribe = () => {
    let result = "";
    let object = {
        _id: this.props.match.params.id,
    };
    const user = JSON.parse(localStorage.getItem("userData"));
    
    axios
      .post(`${Api.API_URL}/unsubscribe-email`, object, {
        headers: {
        
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("verify unsubscribe ", res.data.response_code, res);

        if (res.data.response_code === 2000) {
          // console.log("verify paymnet after 200 ", res);
          
          this.setState({
            result: res.data.response_message,
            resultColor: "green",
          });
        } else {
          this.setState({
            result: res.data.response_message,
            resultColor: "red",
          });
          this.loaderHandler();
        }
      })
      .catch((err) => {
        console.log(err.data);
        this.loaderHandler();
      });
  };

  

  render() {
    //   console.log(this.state.cridencial);
    return (
      <React.Fragment>
        <div style={{ height: 140 }}></div>
        <div
          className="innnerban Sticky"
          style={{
            position: "fixed",
            top: 0,
            zIndex: 100,
            backgroundColor: "#000080",
          }}
        >
          <Headers backgroundColor="#000080" />
        </div>

        <div className="contusmn">
          <div className="container">
            <div className="row">
              <div className="col-lg-10 offset-lg-1 col-md-12">
                <div className="continn">
                  <h4 style={{ color: this.state.resultColor }}>
                    {" "}
                    {this.state.result}{" "}
                  </h4>
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

        {this.state.loader ? <Loader modalToggle={this.state.loader} /> : null}
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
    // setUrl: async no => await dispatch({type: URL, payload: no}),
    setCredit: async (no) => await dispatch({ type: CREDIT, payload: no }),
    setNullUnderLine: async no => await dispatch({type: CLOSEUNDERLINE, payload: no}),
  };
};

export default connect(mapStateToProps, mapPropsToState)(Unsubscription);
