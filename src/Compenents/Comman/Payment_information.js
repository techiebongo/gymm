/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
import React from "react";
import "../../Utils/style.css";
import axios from "axios";
import continentData from "../continent-data";
import Loader from "./loader";
import publicIp from "public-ip";
import Api from "../../Url";
import getCountryISO3 from 'country-iso-2-to-3';

class Payment_information extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      payment_url: "",
      p_id: 0,
      fname: "",
      lname: "",
      phone: "",
      email: "",
      billing_address: "",
      city: "",
      state: "",
      postal_code: "",
      country: "",
      error: "field cannot be blanked",
      fieldError: "",
      loader: false,
      localIp: "",
      removeUser: "",
      price: this.props.price,
      credit: this.props.credit,
      token: '',
      apiCountryData: [],
      apiStateData: [],
      apiCityData: [],
      countryShortCode: '',
    };
  }

  componentDidMount = async () => {
    this.loaderHandler();
    let localIp = await publicIp.v4();
    // console.log(localIp, this.props.price, this.props.credit);
    this.setState({ localIp });
    this.viewUserProfile();
  };

  viewUserProfile = () => {
    const user = JSON.parse(localStorage.getItem("userData"));
    if (user) {
      let body = {
        email: user.email,
      };
      axios
        .post(`${Api.API_URL}/view-profile`, body, {
          headers: {
            "x-access-token": user.authtoken,
          },
        })
        .then((res) => {
          // console.log("view profile data   =====   ", res);
          if (res.data.response_code === 2000) {
            let responseData = res.data.response_data;
            let country = '';
            // continentData.ContinentalData.map(item =>{
            //    if(item.name.toLowerCase() == responseData.country.toLowerCase()){
            //      country = item.alpha3;
            //      console.log(country,"jdfhdfjk");
            //    }
            // })
            if(responseData.paymentInfo){
            this.setState({phone: responseData.paymentInfo.phone_number,billing_address: responseData.paymentInfo.billing_address,city:responseData.paymentInfo.city,country: responseData.paymentInfo.country,state: responseData.paymentInfo.state, postal_code: responseData.paymentInfo.postal_code, fname:responseData.paymentInfo.cc_first_name, lname: responseData.paymentInfo.cc_last_name, email: responseData.paymentInfo.email})
            }
            this.getCountryStateCity_token(responseData.country, responseData.state);
            this.loaderHandler();
          } else if (res.data.response_code === 4000) {
            
            this.removeLocalStore();
            this.loaderHandler();
          }
        })
        .catch((err) => {console.log(err.data); this.loaderHandler();});
      }
    };

    getCountryStateCity_token=(country, state)=>{
      axios.get("https://www.universal-tutorial.com/api/getaccesstoken", {
        headers: {
          "Accept": "application/json",
          "api-token": "_jBQe1NtUtZ2-S4dK2Wr6q4MiA4dPjEBUJ_OpygAtkW8tjAm5Emv3DJrDaYq9a79_h0",
          "user-email": "biswajit.maity@brainiuminfotech.com"
        }
      }).then(res =>{
        // console.log("Country state city ==== ",res.data.auth_token);
        this.setState({token: res.data.auth_token})
        this.getCountry();
        this.getState(country);
        this.getCity(state);
      })
    }
    getCountry=()=>{
      axios.get("https://www.universal-tutorial.com/api/countries/", {
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${this.state.token}`,
        }
      }).then(res =>{
        // console.log("Country==== ",res) 
        if (res.status == 200){
          this.setState({apiCountryData: res.data})
        }
      })
    }
    getState=(country)=>{
      // console.log("countery data ----- ",this.state.country, country)
      axios.get(`https://www.universal-tutorial.com/api/states/${country}`,{
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${this.state.token}`,
        }
      }).then(res =>{
        // console.log("Api state ==== ",res)
        if (res.status == 200){
          this.setState({apiStateData: res.data})
        }
      })
    }
    getCity=(state)=>{
      axios.get(`https://www.universal-tutorial.com/api/cities/${state}`, {
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${this.state.token}`,
        }
      }).then(res =>{
        // console.log("city ==== ",res)
        if (res.status == 200){
          this.setState({apiCityData: res.data})
        }
      })
    }


  loaderHandler = () => {
    // console.log(" hello");
    this.setState({ loader: !this.state.loader });
  };

  handleCountryNmae = (e) => {
    let countryName = "";
    // if(e.currentTarget.value != null){
    countryName = e.currentTarget.value;
    this.getState(countryName);
    // console.log("country name", countryName);
    
      
    this.setState({ country: countryName });
    // }
  };
  handleStateNmae = (e) => {
    let stateName = "";
    // if(e.currentTarget.value != null){
    stateName = e.currentTarget.value;
    this.getCity(stateName);
    // console.log("country name", stateName);
    this.setState({ state: stateName });
    // }
  };
  handleCityNmae = (e) => {
    let cityName = "";
    // if(e.currentTarget.value != null){
    cityName = e.currentTarget.value;
    // console.log("city name", cityName);
    this.setState({ city: cityName });
    // }
  };


  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    // console.log("hello", [e.target.name], e.target.value);
  };

  handleSubmit = (event) => {
    if (this.state.fname === "") {
      this.setState({ fieldError: `First Name ${this.state.error}` });
    } else if (this.state.lname === "") {
      this.setState({ fieldError: `Last Name ${this.state.error}` });
    } else if (this.state.email === "") {
      this.setState({ fieldError: `Email ${this.state.error}` });
    } else if (this.state.phone === "") {
      this.setState({ fieldError: `Phone Number ${this.state.error}` });
    } else if (this.state.billing_address === "") {
      this.setState({ fieldError: `Billing Address ${this.state.error}` });
    } else if (this.state.city === "") {
      this.setState({ fieldError: `City ${this.state.error}` });
    } else if (this.state.state === "") {
      this.setState({ fieldError: `State ${this.state.error}` });
    } else if (this.state.postal_code === "") {
      this.setState({ fieldError: `Postal Code ${this.state.error}` });
    } else if (this.state.country === "") {
      this.setState({ fieldError: `Country ${this.state.error}` });
    } else {
      this.loaderHandler();
      let countryShortCode = '';
      this.state.apiCountryData.map(item=>{
        if(item.country_name == this.state.country){
          countryShortCode = getCountryISO3(item.country_short_name)
          // console.log("3 alpha bates", countryShortCode);
        }
      })

      let unitPrice = this.state.price / this.state.credit;
      let object = {
        currency: "USD",
        amount: this.state.price,
        site_url:
          "http://nodeserver.brainiuminfotech.com/react-native/fittrip/",
        title: "Pay",
        quantity: this.state.credit,
        unit_price: unitPrice,
        products_per_title: "Credits",
        return_url:
          "https://nodeserver.mydevfactory.com/react-native/fittrip/#/payment-success",
        cc_first_name: this.state.fname,
        cc_last_name: this.state.lname,
        cc_phone_number: Number(this.state.phone),
        phone_number: Number(this.state.phone),
        billing_address: this.state.billing_address,
        city: this.state.city,
        state: this.state.state,
        postal_code: Number(this.state.postal_code),
        country: countryShortCode,
        email: this.state.email,
        ip_customer: this.state.localIp,
        ip_merchant: this.state.localIp,
        address_shipping: this.state.billing_address,
        city_shipping: this.state.city,
        state_shipping: this.state.state,
        postal_code_shipping: Number(this.state.postal_code),
        country_shipping: countryShortCode,
        other_charges: 0,
        reference_no: 213,
        msg_lang: "EN",
        cms_with_version: "^16.13.1",
      };
      
      // console.log(object);
      const user = JSON.parse(localStorage.getItem("userData"));
      // View profile api
      let body = {
        email: user.email,
      };
      let userDetails = {
        "user_id": user._id,    
        "cc_first_name": this.state.fname,
        "cc_last_name": this.state.lname,
        "phone_number": this.state.phone,
        "city": this.state.city,
        "cc_phone_number": this.state.phone,
        "postal_code": this.state.postal_code,
        "postal_code_shipping": this.state.postal_code,
        "address_shipping": this.state.billing_address,
        "billing_address": this.state.billing_address,
        "city_shipping": this.state.city,
        "country": this.state.country,
        "country_shipping": this.state.country,
        "email": this.state.email,
        "state": this.state.state,
        "state_shipping": this.state.state,
        "msg_lang": "EN"
    }

      axios
        .post(`${Api.API_URL}/view-profile`, body, {
          headers: {
            "x-access-token": user.authtoken,
          },
        })
        .then((res) => {
          // console.log("view profile data   =====   ", res);
          if (res.data.response_code === 2000) {
            // console.log(res.data.response_message, "response data");

            // payment user details save into database
            
            axios
              .post(`${Api.API_URL}/user-payment-info`, userDetails, {
                headers: {
                  "x-access-token": user.authtoken,
                  "Content-Type": "application/json",
                },
              }).then((res)=>{
                // console.log("Save user data into database", userDetails, res)
              })

            // Payment getway api
            axios
              .post(`${Api.API_URL}/user-make-payment`, object, {
                headers: {
                  "x-access-token": user.authtoken,
                  "Content-Type": "application/json",
                },
              })
              .then((res) => {
                // console.log(
                //   res,
                //   res.data.response_code,
                //   res.data.response_data.p_id
                // );
                if (res.data.response_code === 2000) {
                  // console.log("Go to paytabs", res.data.response_data.p_id);
                  let paymentCheck = {
                    merchant_email: "sandipnag.brainium@gmail.com",
                    p_id: res.data.response_data.p_id,
                  };
                  localStorage.setItem(
                    "paymentCheck",
                    JSON.stringify(paymentCheck)
                  );
                  this.setState({ p_id: res.data.response_data.p_id });
                  
                  this.props.onClick();
                  window.open(res.data.response_data.payment_url);
                  this.loaderHandler();
                }
              });
          } else if (res.data.response_code === 4000) {
            this.removeLocalStore();
            this.setState({ fieldError: res.data.response_message });
          }
          this.loaderHandler();
        });
    }
  };

  removeLocalStore = () => {
    localStorage.removeItem("userData");
    // console.log("enter into remove local store");
    //window.location.reload(false);
    this.setState({ removeUser: "" });
  };

  render() {

    const user = JSON.parse(localStorage.getItem("userData"));
    const userName = user ? user.name.split(" ") : "";
    // let fname = this.state.fname;
    // let lname = this.state.lname;
    // let email = this.state.email;
    // if (fname == "") {
    //   this.setState({ fname: userName[0] });
    // }
    // if (lname == "") {
    //   this.setState({ lname: userName[1] });
    // }
    // if (email == "") {
    //   this.setState({ email: user.email });
    // }
    // console.log(user,fname,lname,email);
    let price = `$${this.state.price}`;
    let credit = this.state.credit > 1?`${this.state.credit} credits`: `${this.state.credit} credit`;


    return (
      <React.Fragment>
        <div className="suggestGym_contusmn" style={{ padding: 1 }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-10 offset-lg-1 col-md-12">
                <div className="suggestGym_continn">
                  <h4 style={{ marginBottom: 40 }}> Payment information </h4>

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

                  <input
                    disabled
                    type="tel"
                    name=""
                    placeholder="credits"
                    onChange={this.handleChange}
                    value={price}
                  />

                  <input
                    disabled
                    type="tel"
                    name=""
                    placeholder="Postal Code"
                    onChange={this.handleChange}
                    value={credit}
                  />

                  <input
                    type="text"
                    name="billing_address"
                    placeholder="Billing Address"
                    onChange={this.handleChange}
                    value={this.state.billing_address}
                  />

                  <select
                    style={{ color: "#616A6B", fontSize: 16 }}
                    // className="countryList"
                    onChange={this.handleCountryNmae}
                    value={this.state.country}
                    
                  >
                    <option value="">Select country</option>
                    {this.state.apiCountryData.map((item, index) => (
                      <option
                        key={index}
                        className="countryOption"
                        value={item.country_name}
                      >
                        {item.country_name}
                      </option>
                    ))}
                  </select>

                  <select
                    style={{ color: "#616A6B", fontSize: 16 }}
                    // className="countryList"
                    
                    onChange={this.handleStateNmae}
                    value={this.state.state}
                  >
                    <option value="">Select state</option>
                    {this.state.apiStateData.map((item, index) => (
                      <option
                        key={index}
                        className="countryOption"
                        value={item.state_name}
                      >
                        {item.state_name}
                      </option>
                    ))}
                  </select>
                
              
              <select
                    style={{ color: "#616A6B", fontSize: 16 }}
                    // className="countryList"
                    
                    onChange={this.handleCityNmae}
                    value={this.state.city}
                  >
                    <option value="">Select city</option>
                    {this.state.apiCityData.map((item, index) => (
                      <option
                        key={index}
                        className="countryOption"
                        value={item.city_name}
                      >
                        {item.city_name}
                      </option>
                    ))}
                  </select>

                  <input
                    type="tel"
                    name="postal_code"
                    placeholder="Postal Code"
                    onChange={this.handleChange}
                    value={this.state.postal_code}
                  />

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
                  {/* <br />
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
                  <br /> */}
                  {/* {this.state.loader?
                 <Loader modalToggle={this.state.loader}/>
                : null } */}
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
        {this.state.loader ? <Loader modalToggle={this.state.loader} /> : null}
      </React.Fragment>
    );
  }
}

export default Payment_information;
