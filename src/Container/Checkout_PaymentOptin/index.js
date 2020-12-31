/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
import React from "react";
import Headers from "../../Compenents/Comman/header";
import Footer from "../../Compenents/Comman/footer";
import "../../Utils/style.css";
import googleplay2 from "../../Images/googleplay2.png";
import appstore2 from "../../Images/appstore2.png";
import Axios from "axios";
import Api from "../../Url";
import money from "../../Images/money.png";
import hand from "../../Images/hand.png";
import { Link } from "react-router-dom";

class CheckPaymentOption extends React.Component {
  constructor() {
    super();
    this.state = {
      condition: "",
      userCredits: 0,
      gymid : JSON.parse(localStorage.getItem("SingleGymId")),
    };
  }
  componentDidMount = () => {
    const user = JSON.parse(localStorage.getItem("userData"));
    if (user) {
      Axios.get(`${Api.API_URL}/user-credit-balance?email=${user.email}`, {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": user.authtoken,
        },
      }).then((res) => {
        // console.log(res);
        if (res.data.response_code === 2000) {
           const userCredits = res.data.response_data;
            this.setState({
              userCredits
            });
            // console.log("small === ", );
          }
        });
    
    } else {
    }

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

        {/* Checkout payment body */}

        <div className="row">
          <div className="col-lg-12" id="bannar_checkout_payment">
            <div className="container">
              <h6>
              <Link to={{
                              pathname: `/gym-details-${this.state.gymid.SingleGymId}`,
                             
                            }} style={{fontSize:18,color:'#3498DB'}}><b>Gym Details</b></Link> {">"} <span>Checkout</span>
              </h6>
              <div className="row">
                <div className="col-lg-12" id="checkout-option">
                  <h3>
                    <i className="fa fa-dot-circle-o" aria-hidden="true">
                      --------------------
                      <i className="fa fa-blind" aria-hidden="true"></i>
                      -----------------
                      <i className="fa fa-circle-thin" aria-hidden="true"></i>
                    </i>
                  </h3>
                  <h2>
                    <span>Payment Option</span> <span>Payment Cards</span>
                    <span>Order</span>
                  </h2>
                  
                  <div className="row" id="money">
                  <Link
                           to={{
                            pathname: "/check-payment-conform",
                            state: {
                              
                            },
                          }}
                          className="col-lg-5 col-10 mx-auto credits-box"
                          >
                  
                    {/* <div > */}
                      <div className="row">
                        <div className="col-lg-2 col-3">
                          <img src={money} />
                        </div>
                        <div className="col-lg-8 col-7">
                          <h4>Use my credits</h4>
                          <p>{this.state.userCredits} {this.state.userCredits > 1?( "Credits"):("Credit")} left</p>
                        </div>
                        <div className="col-lg-2 col-2">
                          
                            <h5>{">"}</h5>
                          
                        </div>
                      </div>
                    {/* </div> */}
                    </Link>
                    {/* <div class="col-lg-5 col-10 mx-auto credits-box">
                      <div class="row">
                        <div class="col-lg-2 col-3">
                          <img src={hand} />
                        </div>
                        <div class="col-lg-8 col-7">
                          <h4 class="mt-4">Buy more credits </h4>
                        </div>
                        <div class="col-lg-2 col-2">
                        <Link
                           to={{
                            pathname: "/CheckPaymentConform",
                            state: {
                              optionType: "buyMoreCredits"
                            },
                          }}
                          >
                            <h5>{">"}</h5>
                          </Link>
                        </div>
                      </div>
                    </div> */}
                    
                    {/* <div class="row" id="money"> */}
                    <Link
                          className="col-lg-5 col-10 mx-auto credits-box"
                           to={{
                            pathname: "/pay-as-check-payment-conform",
                            state: {
                            
                            },
                          }}
                          >
                    {/* <div > */}
                      <div className="row">
                        <div className="col-lg-2 col-3">
                          <img src={money} />
                        </div>
                        <div className="col-lg-8 col-7">
                          <h4>Pay as you go</h4>
                          <p>
                            Get discounted rates by choosing one of our plans
                          </p>
                        </div>
                        <div className="col-lg-2 col-2">
                          
                          
                            <h5>{">"}</h5>
                          
                        </div>
                      </div>
                    {/* </div> */}
                    </Link>
                    <div class="col-lg-6"></div>
                  {/* </div> */}

                  </div>

                  
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

export default CheckPaymentOption;
