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
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { Close } from "react-bytesize-icons";
import Payment_information from "../../Compenents/Comman/Payment_information";
import Loader from "../../Compenents/Comman/loader";
import { connect } from "react-redux";
import { CLOSEUNDERLINE } from "../../Action/type";

let contentType = '';

class PayAsCheckPaymentConform extends React.Component {
  constructor() {
    super();
    this.state = {
      saficiantCredit: true,
      SingleGymData: [],
      SinglePssData: JSON.parse(localStorage.getItem("SinglePassData")),
      CreditsCategoryData: [],
      quentity: 1,
      Needcredits: 0,
      myCredits: 0,
      totalCredits: 0,
      perPassCredit: 0,
      paymentCredits: 0,
      paymentTotelCredit: 0,
      paymentPrice: 0,
      creditType: 0,
      contentType: '',
      modalIsOpen: false,
      SigninModalIsOpen: false,
      loader: false,
      passCreadit: 0,
      amount: 0,
    };
  }

  loaderHandler = () => {
    // console.log(" hello");
    this.setState({ loader: !this.state.loader });
  };

  modalHandler = () => {
    this.setState({ modalIsOpen: false });
    // (this.props.history.push({
    //     pathname: "/gym-details",
    //   }))
  };

  componentDidMount = () => {
    // this.loaderHandler();
    this.props.setNullUnderLine(1);
    let userCredits = 0;
    const SingleGymData = JSON.parse(localStorage.getItem("SingleGymData"));
    // console.log("SingleGymData ",SingleGymData);
    const Needcredits = this.state.SinglePssData.credit;
    const passCreadit = Needcredits;
    const amount = Needcredits;
    this.setState({ SingleGymData , Needcredits, passCreadit, amount});
    // console.log(" SinglePssData ===", this.state.SinglePssData);

    const user = JSON.parse(localStorage.getItem("userData"));
    // if (user) {
    //   Axios.get(`${Api.API_URL}/user-credit-balance?email=${user.email}`, {
    //     headers: {
    //       "Content-Type": "application/json",
    //       "x-access-token": user.authtoken,
    //     },
    //   }).then((res) => {
    //     // console.log(res);
    //     if (res.data.response_code === 2000) {
    //        userCredits = res.data.response_data;
    //       const totalCredits = this.state.SinglePssData.credit;
    //       if (userCredits > totalCredits) {
    //         this.setState({
    //           myCredits: userCredits,
    //           totalCredits,
    //           perPassCredit: totalCredits,
    //           saficiantCredit: true,
    //         });
    //         // console.log("big === ", userCredits, totalCredits);
    //       } else {
    //         const Needcredits = totalCredits - userCredits;
    //         this.setState({
    //           Needcredits,
    //           myCredits: userCredits,
    //           totalCredits,
    //           perPassCredit: totalCredits,
    //           saficiantCredit: false,
    //         });
    //         // console.log("small === ", userCredits, totalCredits, Needcredits);
    //       }
    //     }
    //   });
    // } else {
    // }

    // this.loaderHandler();
    // Axios.get(`${Api.API_URL}/list-credit`, {
    //             headers: {
    //               "Content-Type": "application/json",
    //             },
    //          })
    //          .then(res => {
    //             console.log("Credits",res);
    //             if (res.data.response_code == 2000) {
    //               const responseData = res.data.response_data.docs;
    //               const paymentCredits = responseData[0].credit;
                  
    //               // console.log('Credit List response data', responseData);
    //               this.setState({CreditsCategoryData: responseData, paymentCredits ,paymentPrice: responseData[0].price , creditType: responseData[0]._id});
    //               // console.log('credits Info  ',paymentCredits,userCredits );
    //               // this.loaderHandler();
    //             } else {
    //               console.log('credits Info  ' + res.data.response_message);
    //             }
    //             this.loaderHandler();
    //           })
    //           .catch(error => {
    //             console.error(error);
    //             this.loaderHandler();
    //           });

  }

  handleQuality = (item) => {
    let quentity = 0;
    if (item === "plus") {
      quentity = this.state.quentity + 1;
      const Needcredits = this.state.passCreadit * quentity;
      const amount = Needcredits;
      this.setState({ Needcredits, quentity, amount});
    }
    if (item === "minus") {
      quentity = this.state.quentity - 1;
      const Needcredits = this.state.passCreadit * quentity;
      const amount = Needcredits;
      this.setState({ Needcredits, quentity, amount});
    }
    // const totalCredits = quentity * this.state.perPassCredit;
    // const Needcredits = totalCredits - this.state.myCredits;
    // if (this.state.myCredits < totalCredits) {
    //   this.setState({ Needcredits, quentity, totalCredits,saficiantCredit:false });
    //   // console.log("big");
    // } else {
    //   this.setState({ quentity, Needcredits: 0, totalCredits,saficiantCredit:true });
      // console.log("small");
    // }
    // console.log(
    //   "credit ==== ",
    //   this.state.perPassCredit,
    //   totalCredits,
    //   Needcredits
    // );
  };

  // handleOPtionCredit=(e) => {
  //   let paymentCredits = 0;
  //   let creditId = 0;
  //   // console.log(e.target.value)
  //   this.state.CreditsCategoryData.map(item=>(
  //     // console.log(item),
  //     e.target.value == item._id?(
  //   this.setState({paymentCredits: item.credit, paymentPrice: item.price, creditType: item._id}),
  //   // console.log(item),
  //   creditId = {creditId: item._id},
  //   localStorage.setItem('creditId', JSON.stringify(creditId))
  //      ) : null
       
  //   ))
  // }

  handleSubmitButton=()=>{
    localStorage.removeItem("creditId");
    let payAsGo = {payAsGo: true, totalCredit: this.state.Needcredits}
    localStorage.setItem('payAsGo', JSON.stringify(payAsGo));
    this.setState({modalIsOpen: true})
    // console.log('submit');
    
    // if(!this.state.saficiantCredit){
    //   this.setState({modalIsOpen: true});
      
    //   // console.log('submit');
    // }

    // if(this.state.saficiantCredit){
    //   const user = JSON.parse(localStorage.getItem("userData"));
    // if (user) {
    //   const body = {
    //     "pass_id": this.state.SinglePssData._id,
    //     "quantity": this.state.quentity,
    //     "user_id": user._id,
    //     "gym_id": this.state.SinglePssData.gymId,
    // };
    // // console.log("buy pass data for body == ",body);
    //   Axios.post(`${Api.API_URL}/user-add-pass`, body, {
    //     headers: {
    //       "Content-Type": "application/json",
    //       "x-access-token": user.authtoken,
    //     },
    //  })
    //  .then(res => {
    //     // console.log("Credits",res, res.data.response_code);
    //     if (res.data.response_code == 2000) {
    //       // console.log('Credit List response data');
    //       let addPass = {AddPass: 1};
          
    //       localStorage.setItem('AddPass', JSON.stringify(addPass));
    //       (this.props.history.push({
    //         pathname: "/user-profile",
            
    //       }))
          
    //       // this.loaderHandler();
    //     } else {
    //       console.log('credits Info  ' + res.data.response_message);
    //     }
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });
    // }

    // }
  }

  render() {
    
    return (
      <React.Fragment>
        <div style={{height:100}}></div>
        <div
          className="innnerban Sticky"
          style={{ position: "fixed", top: 0, zIndex: 100 ,backgroundColor: '#000080'}}
        >
          <Headers backgroundColor="#000080" />
        </div>

        {/* Checkout payment body */}

        <div className="row">
          <div className="col-lg-12" id="bannar-area-check-out">
            <div className="container">
              <h6>
                <Link to='/check-payment-option' style={{fontSize:18,color:'#3498DB'}}><b>Checkout Payment Option</b></Link> {">"} <span>Checkout</span>
              </h6>
              <div className="row">
                <div className="col-lg-12" id="payment-option">
                  <h3>
                    <i className="fa fa-check-square" aria-hidden="true"></i>
                    -----------------
                    <i className="fa fa-check-square" aria-hidden="true"></i>
                    -----------
                    <i className="fa fa-dot-circle-o" aria-hidden="true"></i>
                  </h3>
                  <h2>
                    <span>Payment Option</span> <span>Payment Cards</span>
                    <span>Order</span>
                  </h2>

                  

                  
               

                  <div className="row" id="plan-table">
                    <div className="col-lg-10 mx-auto" id="plan-box-on">
                      <h3>Pass</h3>

                        <div className="row">
                          <div className="col-lg-6 col-md-6 col-6">
                            <h4>Gym</h4>
                          </div>
                          <div className="col-lg-6 col-md-6 col-6 text-right">
                            <h4>
                            {this.state.SingleGymData.name}
                              
                            </h4>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-6 col-md-6 col-6">
                            <h4>Pass</h4>
                          </div>
                          <div className="col-lg-6 col-md-6 col-6 text-right">
                            <h4>
                            {this.state.SinglePssData.passDetails.name}
                              
                            </h4>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-6 col-md-6 col-6">
                            <h4>Quantity</h4>
                          </div>
                          <div className="col-lg-6 col-md-6 col-6 text-right">
                            <h4>
                            <div className="row">
                              <div className="col-lg-8"></div>
                              <div
                                className="col-lg-4 row"
                                id="plus-mi"
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  
                                }}
                              >
                              
                                {this.state.quentity > 1 ? (
                                  <b
                                    onClick={() => this.handleQuality("minus")}
                                    style={{paddingLeft:10,cursor: 'pointer'}}
                                  >
                                    -
                                  </b>
                                ) : null}
                                <b style={{paddingLeft:20}}> {this.state.quentity} </b>
                                {this.state.quentity < 5?
                                <b
                                 onClick={() => this.handleQuality("plus")}
                                 style={{paddingLeft:20,cursor: 'pointer'}}
                                 >
                                
                                  +
                                
                                </b>
                                : null}
                              </div>
                            </div>
                              
                            </h4>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-6 col-md-6 col-6">
                            <h4>Credit required</h4>
                          </div>
                          <div className="col-lg-6 col-md-6 col-6 text-right">
                            
                            {this.state.Needcredits > 1 ? (
                            <h4>{this.state.Needcredits} Credits</h4>
                          ) : (
                            <h4>{this.state.Needcredits} Credit</h4>
                          )}
                              
                          
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-6 col-md-6 col-6">
                            <h4>Amount</h4>
                          </div>
                          <div className="col-lg-6 col-md-6 col-6 text-right">
                            <h4>
                            $ {this.state.amount}
                              
                            </h4>
                          </div>
                        </div>

{/* 
                      <div class="row">
                        <div class="col-lg-6 col-6">
                          <h4>Gym</h4>
                          <h4>Pass</h4>
                          
                          <h4>Quantity</h4>
                          <h4>Credit required</h4>
                          <h4>Amount</h4>
                        </div>

                        <div class="col-lg-6 col-6 text-right">
                          <h4>{this.state.SingleGymData.name}</h4>
                          <h4>
                            {this.state.SinglePssData.passDetails.name}
                          </h4>
                          
                          <h4>
                            <div class="row">
                              <div class="col-lg-8"></div>
                              <div
                                class="col-lg-4 row"
                                id="plus-mi"
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  
                                }}
                              >
                              
                                {this.state.quentity > 1 ? (
                                  <b
                                    onClick={() => this.handleQuality("minus")}
                                    style={{paddingLeft:10,cursor: 'pointer'}}
                                  >
                                    -
                                  </b>
                                ) : null}
                                <b style={{paddingLeft:20}}> {this.state.quentity} </b>
                                {this.state.quentity < 5?
                                <b
                                 onClick={() => this.handleQuality("plus")}
                                 style={{paddingLeft:20,cursor: 'pointer'}}
                                 >
                                
                                  +
                                
                                </b>
                                : null}
                              </div>
                            </div>
                          </h4>
                          {this.state.Needcredits > 1 ? (
                            <h4>{this.state.Needcredits} Credits</h4>
                          ) : (
                            <h4>{this.state.Needcredits} Credit</h4>
                          )}

                          <h4>$ {this.state.amount}</h4>
                        </div>
                      </div> */}
                    </div>
                  </div>
                  
              {/* {!this.state.saficiantCredit?(
                <div style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:20}}>
                  <b style={{color:'red', fontSize:25,}}>You donn't have sufficient credits to buy more credits</b>
                </div>
                ):null
              } */}

                  {/* <div class="row" id="plan-table">
                    <div class="col-lg-10 mx-auto" id="plan-box-on">
                      <h3>Plan</h3>
                      <div class="row">
                        <div class="col-lg-6 col-6">
                          <h4>Select Plan</h4>
                          <h4>Number of Credits</h4>
                          <h4>Current Balance</h4>
                          <h4>Total Balance</h4>
                        </div>
                        <div class="col-lg-6 col-6 text-right">
                          <h4>
                            
                            <select
                             onChange={this.handleOPtionCredit}
                             value={this.state.creditType}
                            >
                              {this.state.CreditsCategoryData && this.state.CreditsCategoryData.map((creditItem, creditIndex)=>(
                                <option key={creditIndex} value={creditItem._id}>
                                  {creditItem.credit + creditItem.free_credit}
                                  { creditItem.credit + creditItem.free_credit > 1 ? " credits -" : "- credit "}{creditItem.price}$
                                  </option>
                              ))}
                            </select> */}
                            {/* <i class="fa fa-eur" aria-hidden="true"></i> */}
                            {/* <a href="#">
                              <i
                                class="fa fa-angle-down"
                                aria-hidden="true"
                              ></i>
                            </a> */}
                          {/* </h4> */}
                          {/* <h4>+{this.state.paymentCredits}</h4>
                          <h4>{this.state.myCredits}</h4>
                          <h4>{this.state.paymentCredits + this.state.myCredits} Credits</h4>
                        </div>
                      </div>
                    </div>
                  </div> */}


                  {/* <div class="row" id="plan-table">
                    <div class="col-lg-10 mx-auto" id="plan-box-on">
                      <h3>Purchase</h3>
                      <div class="row">
                        <div class="col-lg-6 col-6">
                          <h4>Currency</h4>
                          <h4>Subtotal</h4>
                          <h4>Promo Code</h4>
                          <h4>Discount %</h4>
                          <h4>Total</h4>
                        </div>
                        <div class="col-lg-6 col-6 text-right">
                          <h4>
                            EURO{" "}
                            <a href="#">
                              <i
                                class="fa fa-angle-down"
                                aria-hidden="true"
                              ></i>
                            </a>
                          </h4>
                          <h4>
                            25<i class="fa fa-eur" aria-hidden="true"></i>
                          </h4>
                          <h4>XGZUIT</h4>
                          <h4>10 %</h4>
                          <h4>
                            22,5<i class="fa fa-eur" aria-hidden="true"></i>
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div> */}

                  <div className="confirmation">
                    <button onClick={()=>this.handleSubmitButton()}>Confirmation</button>
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
        

        {/* Modal view */}
        <div>
          <Modal show={this.state.modalIsOpen} dialogClassName="modal-90w">
            <div
              onClick={() => this.setState({ modalIsOpen: false })}
              style={{ width: "100%", textAlign: "right", padding: 25 }}
            >
              <Close width={15} height={15} color="#B3B6B7" />
            </div>
            <Payment_information price={this.state.amount} credit={this.state.Needcredits} onClick={this.modalHandler} />
          </Modal>
        </div>

        <div>
          <Modal
            show={this.state.SigninModalIsOpen}
            dialogClassName="modal-90w"
          >
            <div
              onClick={() => this.setState({ SigninModalIsOpen: false })}
              style={{ textAlign: "right", padding: 10, cursor: 'pointer' }}
            >
              <Close width={15} height={15} color="#B3B6B7" />
            </div>
            <b
              style={{
                fontSize: 26,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 40,
                color: '#000080'
              }}
            >
              Please Signin
            </b>
          </Modal>
        </div>
        

        {this.state.loader ? <Loader modalToggle={this.state.loader} /> : null}

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

export default connect(mapStateToProps, mapPropsToState)(PayAsCheckPaymentConform);
