/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
// import '../../Utils/style.css';
import Axios from "axios";
import Api from "../../Url";
import "../../Utils/profileSection_style.css";
import Payment_information from "../Comman/Payment_information";
import Loader from "../Comman/loader";

class Payment extends React.Component {
  state = {
    OrderListData: [],
    paymentCredits: 0,
    paymentPrice: 0,
    creditType: 0,
    loader: false,
    user: JSON.parse(localStorage.getItem("userData")),
    page: 1,
  };

  loaderHandler = () => {
    // console.log(" hello");
    this.setState({ loader: !this.state.loader });
  };

  componentDidMount = () => {
    this.loaderHandler();
    if (this.state.user) {
      let params = `&page=${this.state.page}&limit=10&user_id=${this.state.user._id}`;
      Axios.get(`${Api.API_URL}/user-order-list?${params}`, {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": this.state.user.authtoken,
        },
      })
        .then(async (res) => {
          // console.log("Credits", res);
          if (res.data.response_code == 2000) {
            const responseData = res.data.response_data.docs;
            // const paymentCredits = responseData[0].credit;

            // console.log('Credit List response data', responseData);
            await this.setState({OrderListData: responseData, });
            // console.log('credits Info  ',paymentCredits );
            this.loaderHandler();
          } else {
            console.log("credits Info  " + res.data.response_message);
            this.loaderHandler();
          }
        })
        .catch((error) => {
          console.error(error);
          this.loaderHandler();
        });
    }
  };

  render() {
    // console.log(this.state.paymentCredits,this.state.paymentPrice)
    return (
      <React.Fragment>
        <div className="container" style={{ paddingTop: 40 }}>
          <h3>Payment History</h3>
        </div>
        <div className='main_container'>
        {this.state.OrderListData && this.state.OrderListData.map((orderItem, orderIndex) => (
          orderItem.order_type == "credit"?(
        <div className="history_container " style={{}} key={orderIndex} >
          <div className="row" id="history_row">
            <h3>Credit Name : </h3>
            <h3> {orderItem.creditDetails.name}</h3>
          </div>
          <div className="row" id="history_row">
            <h3 className="">Invoice Id : </h3>
            <h3> {orderItem.invoice_id}</h3>
          </div>
          <div className="row" id="history_row">
            <h3>Transaction Id : </h3>
            <h3> {orderItem.transaction_id}</h3>
          </div>
          {orderItem.creditDetails.free_credit_allow?
          <div className="row" id="history_row">
            <h3>Free Credit : </h3>
            <h3> {orderItem.creditDetails.free_credit}</h3>
          </div>
          :null}
          
          <div className="row" id="history_row">
            <h3>Price : </h3>
            <h3> ${orderItem.creditDetails.price}</h3>
          </div>
          <div className="row" id="history_row">
            <h3>Credit : </h3>
            <h3> ${orderItem.creditDetails.credit}</h3>
          </div>
          <div className="row" id="history_row">
            <h3>Currency : </h3>
            <h3> {orderItem .currency}</h3>
          </div>
        </div>
          ) : (
            orderItem.order_type == "pass" ? (
            <div className="history_container " style={{}} key={orderIndex} >
              <div className="row" id="history_row">
            <h3>Pass Name : </h3>
            <h3> {orderItem.passDetails.name}</h3>
          </div>
          <div className="row" id="history_row">
            <h3 className="">Invoice Id : </h3>
            <h3> {orderItem.invoice_id}</h3>
          </div>
          <div className="row" id="history_row">
            <h3>Transaction Id : </h3>
            <h3> {orderItem.transaction_id}</h3>
          </div>
          
          
          <div className="row" id="history_row">
            <h3>Price : </h3>
            <h3> ${orderItem.amount}</h3>
          </div>
          <div className="row" id="history_row">
            <h3>Credit : </h3>
            <h3> ${orderItem.passDetails.credit}</h3>
          </div>
          <div className="row" id="history_row">
            <h3>Currency : </h3>
            <h3> {orderItem .currency}</h3>
          </div>
        </div>
            ) 
            : null
            
          )
        ))}
        {this.state.OrderListData.length > 0?
        null
        : (
          <div>
          <b
                  style={{
                    color: "#cccccc",
                    display: "flex",
                    justifyContent: "center",
                    alignSelf: "center",
                    fontSize: 16,
                    marginTop: 40,
                    marginBottom: 40,
                  }}
                >
                  Payment history not found!
                </b>
          </div>
        ) 
      }
        </div>
        {/* <div className='row' style={{display:'flex',justifyContent:'center',alignItems:'center',paddingTop:30}}>
               
                      <h3 style={{fontSize:20,fontWeight: 600, paddingRight:30}}>Plan</h3>
                      
                      <div class="">

                      <h3 style={{fontSize:20,fontWeight: 600, paddingRight:30}}>
                            
                            <select
                             onChange={this.handleOPtionCredit}
                             value={this.state.creditType}
                            >
                              {this.state.CreditsCategoryData && this.state.CreditsCategoryData.map((creditItem, creditIndex)=>(
                                <option key={creditIndex} value={creditItem._id}>
                                  {creditItem.credit}
                                  { creditItem.credit > 1 ? " credits -" : -" credit "}{creditItem.price}$
                                  </option>
                              ))}
                            </select>
                          </h3>
                          </div>
                      </div>
                      <Payment_information price={this.state.paymentPrice} credit={this.state.paymentCredits} /> */}

        {this.state.loader ? <Loader modalToggle={this.state.loader} /> : null}
      </React.Fragment>
    );
  }
}

export default Payment;
