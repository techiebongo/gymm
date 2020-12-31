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

class PaymentSuccess extends React.Component {
  constructor() {
    super();
    this.state = {
      cridencial: JSON.parse(localStorage.getItem("paymentCheck")),
      SinglePssData: JSON.parse(localStorage.getItem("SinglePassData")),
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
    this.paymentVerify();
  };

  paymentVerify = () => {
    let result = "";
    let object = {
      payment_reference: this.state.cridencial.p_id,
    };
    const user = JSON.parse(localStorage.getItem("userData"));
    console.log(object,user);
    //this.props.getLoginApi(object)
    // var formBody = [];
    // for (var property in object) {
    //     var encodedKey = encodeURIComponent(property);
    //     var encodedValue = encodeURIComponent(object[property]);
    //     formBody.push(encodedKey + "=" + encodedValue);
    // }
    // formBody = formBody.join("&");

    axios
      .post(`${Api.API_URL}/user-verify-payment`, object, {
        headers: {
          "x-access-token": user.authtoken,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // console.log("verify paymnet ", res.data.response_code, res);

        if (res.data.response_code === 2000) {
          // console.log("verify paymnet after 200 ", res);
          this.creditPurchase(user._id, user.authtoken, res.data.response_data);
          result = res.data.response_message;
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

  creditPurchase = (userId, auth, response) => {
      
    let creditId = JSON.parse(localStorage.getItem("creditId"));
    let payAsGo = JSON.parse(localStorage.getItem("payAsGo"));
    console.log("hfhd",payAsGo.payAsGo,payAsGo);
    if (creditId) {
      let object = {
        credit_plan_id: creditId.creditId,
        user_id: userId,
        invoice_id: response.pt_invoice_id,
        transaction_id: response.transaction_id,
        currency: response.currency,
        amount: response.amount,
        other_charges: 0,
      };

      console.log("creditPurchase ===== ", object, creditId.creditId);

      axios
        .post(`${Api.API_URL}/user-credit-purchase`, object, {
          headers: {
            "x-access-token": auth,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          // console.log("creditPurchase ===", res.data.response_code, res);

          if (res.data.response_code === 2000) {
            // console.log("creditPurchase", res);
            this.getTotalCredit(auth);
            //   this.setState({result: res.data.response_message, resultColor: 'green'})
            // this.setState({result, resultColor: 'green'})
            localStorage.removeItem("creditId");
            this.loaderHandler();
          } else {
            // this.setState({result: res.data.response_message, resultColor: 'red'})
            this.loaderHandler();
          }
        })
        .catch((err) => {
          console.log("creditPurchase error ==== ", err.data);
          this.loaderHandler();
        });
    } else if(payAsGo.payAsGo){
      let object = {
        pass_id: this.state.SinglePssData._id,
        quantity: payAsGo.totalCredit,
        user_id: userId,
        invoice_id: response.pt_invoice_id,
        transaction_id: response.transaction_id,
        amount: response.amount,
        currency: "USD",
        other_charges: 0,
        gym_id: this.state.SinglePssData.gymId,
        
        other_charges: '',
      };

      console.log("payAsGo credit Purchase ===== ", object);

      axios
        .post(`${Api.API_URL}/user-direct-pass-purchase`, object, {
          headers: {
            "x-access-token": auth,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          // console.log("payAsGo result ===", res.data.response_code, res);

          if (res.data.response_code === 2000) {
            // console.log("payAsGo", res);
            this.getTotalCredit(auth);
            //   this.setState({result: res.data.response_message, resultColor: 'green'})
            // this.setState({result, resultColor: 'green'})
            localStorage.removeItem("payAsGo");
            this.loaderHandler();
          } else {
            // this.setState({result: res.data.response_message, resultColor: 'red'})
            this.loaderHandler();
          }
        })
        .catch((err) => {
          console.log("creditPurchase error ==== ", err.data);
          this.loaderHandler();
        });
    } else {
      this.setState({
        result: "Your purchase already done",
        resultColor: "red",
      });
      this.loaderHandler();
    }
  };

  getTotalCredit = (auth) => {
    const user = JSON.parse(localStorage.getItem("userData"));
    axios
      .get(`${Api.API_URL}/user-credit-balance?email=${user.email}`, {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": auth,
        },
      })
      .then((res) => {
        // console.log(res);
        if (res.data.response_code === 2000) {
          const userCredits = res.data.response_data;

          this.props.setCredit(userCredits);
          // console.log("small === ");
        }
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

export default connect(mapStateToProps, mapPropsToState)(PaymentSuccess);
