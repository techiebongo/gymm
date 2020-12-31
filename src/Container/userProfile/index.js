/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-expressions */
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
import { Formik, Form, Field, ErrorMessage } from "formik";
import EditProfile from "../../Compenents/Account_Profile/editProfile";
import Favourits from "../../Compenents/Account_Profile/Favourits";
import MyPasses from "../../Compenents/Account_Profile/myPasses";
import SuggestGym from "../../Compenents/Account_Profile/suggestGym";
import InnviteFriends from "../../Compenents/Account_Profile/innviteFriends";
import GiftFriends from "../../Compenents/Account_Profile/giftFriends";
import GetCredit from "../../Compenents/Account_Profile/getCredit";
import Payment from '../../Compenents/Account_Profile/payment';
import Messaging from '../../Compenents/Account_Profile/Messaging';
import { Link, withRouter } from "react-router-dom";
import { Menu, Close } from "react-bytesize-icons";
import { connect } from "react-redux";
import { CLOSEUNDERLINE } from "../../Action/type";

class UserProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      IconVisibility: false,
      crossMenu_visibility: true,
      list_visibility: "table-cell",
      loader: false,
      isSubmitButton: false,
      startDate: new Date(),
      edit: true,
      payment: false,
      credit: false,
      pass: false,
      favaurits: false,
      Suggest: false,
      innvite: false,
      gift: false,
      message: false,
      edit_ClassName: "ListItemActive",
      edit_textColor: "#ffffff",
      payment_ClassName: "",
      payment_textColor: "",
      credit_ClassName: "",
      credit_textColor: "",
      pass_ClassName: "",
      pass_textColor: "",
      favaurits_ClassName: "",
      favaurits_textColor: "",
      Suggest_ClassName: "",
      Suggest_textColor: "",
      innvite_ClassName: "",
      innvite_textColor: "",
      gift_ClassName: "",
      gift_textColor: "",
      message_ClassName: '',
      message_textColor: "",
      user: JSON.parse(localStorage.getItem("userData")),
      screenWith: 0,
      editProfileImage: false,
    };
    window.addEventListener("resize", this.getNumberOfColumns.bind(this));
  }

  IconsHandle = (value) => {
    let list = "";
    value ? (list = "table-cell") : (list = "none");
    this.setState({
      crossMenu_visibility: !this.state.crossMenu_visibility,
      list_visibility: list,
    });

    // console.log(" kgiukgkjjk=====", this.state.crossMenu_visibility, value);
  };


  getNumberOfColumns() {
    window.innerWidth <= 470
    ? this.setState({
      list_visibility: 'none',
      IconVisibility: true,
      crossMenu_visibility: true,
      screenWith: window.innerWidth,
      })
    : window.innerWidth <= 520
      ? this.setState({
        list_visibility: 'none',
        IconVisibility: true,
        crossMenu_visibility: true,
        screenWith: window.innerWidth,
        })
      : window.innerWidth <= 791
    ? this.setState({
      list_visibility: 'none',
      IconVisibility: true,
      crossMenu_visibility: true,
      screenWith: window.innerWidth,
      })
    : window.innerWidth <= 991
      ? this.setState({
        list_visibility: 'none',
        IconVisibility: true,
        crossMenu_visibility: true,
        screenWith: window.innerWidth,
        })
      : this.setState({
          IconVisibility: false,
          list_visibility: "table-cell",
          screenWith: window.innerWidth,
          // modalWidth: "50%",
          // menuBackgraoundColor: "",
          // inline-flex
        });
  }

  componentDidMount = () => {
    this.props.setNullUnderLine(1);
    this.getNumberOfColumns();
    // this.viewUserProfile();
    let addPass = JSON.parse(localStorage.getItem("AddPass"));
    addPass?(
      this.setState({edit_ClassName: "",edit: false,edit_textColor:'', pass_ClassName: "ListItemActive",pass:true,pass_textColor:'#ffffff'}),
      // console.log('user',addPass),
      localStorage.removeItem("AddPass")
    ) : null
    this.viewUserProfile();
  };

  viewUserProfile = () => {
    if (this.state.user) {
      let body = {
        email: this.state.user.email,
      };
      axios
        .post(`${Api.API_URL}/view-profile`, body, {
          headers: {
            "x-access-token": this.state.user.authtoken,
          },
        })
        .then((res) => {
          // console.log("view profile data   =====   ", res);
          if (res.data.response_code === 2000) {
            let responseData = res.data.response_data;
              this.setState({editProfileImage:!this.state.editProfileImage});
            //   // localStorage.setItem('userData', JSON.stringify(res.data.response_data.));
            //   console.log(res.data.response_message, "response data");
          } else if (res.data.response_code === 4000) {
            // this.removeLocalStore();
            // this.props.history.push({
            //   pathname: "/",
            // });
          }
        })
        .catch((err) => console.log(err.data));
    } else{
      this.props.history.push({
        pathname: "/",
      });
    }
  };

  loaderHandler = () => {
    // console.log(" hello");
    this.setState({ loader: !this.state.loader });
  };
  handleChange = (date) => {
    this.setState({
      startDate: date,
    });
  };

  ListMenuHandle = (fieldName) => {
  if(this.state.screenWith > 991){
    this.setState({
      
      
    })
  } else {
    this.setState({
        crossMenu_visibility: true,
        list_visibility: "none",
      })
    // this.IconsHandle(1);
  }
    if (fieldName == "edit") {
      this.setState({
        edit: true,
        payment: false,
        credit: false,
        pass: false,
        favaurits: false,
        Suggest: false,
        innvite: false,
        gift: false,
        message: false,
        edit_ClassName: "ListItemActive",
        edit_textColor: "#ffffff",
        payment_ClassName: "",
        payment_textColor: "",
        credit_ClassName: "",
        credit_textColor: "",
        pass_ClassName: "",
        pass_textColor: "",
        favaurits_ClassName: "",
        favaurits_textColor: "",
        Suggest_ClassName: "",
        Suggest_textColor: "",
        innvite_ClassName: "",
        innvite_textColor: "",
        gift_ClassName: "",
        gift_textColor: "",
        message_ClassName: "",
        message_textColor: ""
      });
    }
    if (fieldName == "payment") {
      this.setState({
        payment: true,
        edit: false,
        credit: false,
        pass: false,
        favaurits: false,
        Suggest: false,
        innvite: false,
        gift: false,
        message: false,
        edit_ClassName: "",
        edit_textColor: "",
        payment_ClassName: "ListItemActive",
        payment_textColor: "#ffffff",
        credit_ClassName: "",
        credit_textColor: "",
        pass_ClassName: "",
        pass_textColor: "",
        favaurits_ClassName: "",
        favaurits_textColor: "",
        Suggest_ClassName: "",
        Suggest_textColor: "",
        innvite_ClassName: "",
        innvite_textColor: "",
        gift_ClassName: "",
        gift_textColor: "",
        message_ClassName: "",
        message_textColor: ""
      });
    }
    if (fieldName == "credit") {
      this.setState({
        credit: true,
        edit: false,
        payment: false,
        pass: false,
        favaurits: false,
        Suggest: false,
        innvite: false,
        gift: false,
        message: false,
        edit_ClassName: "",
        edit_textColor: "",
        payment_ClassName: "",
        payment_textColor: "",
        credit_ClassName: "ListItemActive",
        credit_textColor: "#ffffff",
        pass_ClassName: "",
        pass_textColor: "",
        favaurits_ClassName: "",
        favaurits_textColor: "",
        Suggest_ClassName: "",
        Suggest_textColor: "",
        innvite_ClassName: "",
        innvite_textColor: "",
        gift_ClassName: "",
        gift_textColor: "",
        message_ClassName: "",
        message_textColor: ""
      });
    }
    if (fieldName == "pass") {
      this.setState({
        pass: true,
        edit: false,
        payment: false,
        credit: false,
        favaurits: false,
        Suggest: false,
        innvite: false,
        gift: false,
        message: false,
        edit_ClassName: "",
        edit_textColor: "",
        payment_ClassName: "",
        payment_textColor: "",
        credit_ClassName: "",
        credit_textColor: "",
        pass_ClassName: "ListItemActive",
        pass_textColor: "#ffffff",
        favaurits_ClassName: "",
        favaurits_textColor: "",
        Suggest_ClassName: "",
        Suggest_textColor: "",
        innvite_ClassName: "",
        innvite_textColor: "",
        gift_ClassName: "",
        gift_textColor: "",
        message_ClassName: "",
        message_textColor: ""
      });
    }
    if (fieldName == "favaurits") {
      this.setState({
        favaurits: true,
        edit: false,
        payment: false,
        credit: false,
        pass: false,
        Suggest: false,
        innvite: false,
        gift: false,
        message: false,
        edit_ClassName: "",
        edit_textColor: "",
        payment_ClassName: "",
        payment_textColor: "",
        credit_ClassName: "",
        credit_textColor: "",
        pass_ClassName: "",
        pass_textColor: "",
        favaurits_ClassName: "ListItemActive",
        favaurits_textColor: "#ffffff",
        Suggest_ClassName: "",
        Suggest_textColor: "",
        innvite_ClassName: "",
        innvite_textColor: "",
        gift_ClassName: "",
        gift_textColor: "",
        message_ClassName: "",
        message_textColor: ""
      });
    }
    if (fieldName == "Suggest") {
      this.setState({
        Suggest: true,
        edit: false,
        payment: false,
        credit: false,
        pass: false,
        favaurits: false,
        innvite: false,
        gift: false,
        message: false,
        edit_ClassName: "",
        edit_textColor: "",
        payment_ClassName: "",
        payment_textColor: "",
        credit_ClassName: "",
        credit_textColor: "",
        pass_ClassName: "",
        pass_textColor: "",
        favaurits_ClassName: "",
        favaurits_textColor: "",
        Suggest_ClassName: "ListItemActive",
        Suggest_textColor: "#ffffff",
        innvite_ClassName: "",
        innvite_textColor: "",
        gift_ClassName: "",
        gift_textColor: "",
        message_ClassName: "",
        message_textColor: ""
      });
    }
    if (fieldName == "innvite") {
      this.setState({
        innvite: true,
        edit: false,
        payment: false,
        credit: false,
        pass: false,
        favaurits: false,
        Suggest: false,
        gift: false,
        message: false,
        edit_ClassName: "",
        edit_textColor: "",
        payment_ClassName: "",
        payment_textColor: "",
        credit_ClassName: "",
        credit_textColor: "",
        pass_ClassName: "",
        pass_textColor: "",
        favaurits_ClassName: "",
        favaurits_textColor: "",
        Suggest_ClassName: "",
        Suggest_textColor: "",
        innvite_ClassName: "ListItemActive",
        innvite_textColor: "#ffffff",
        gift_ClassName: "",
        gift_textColor: "",
        message_ClassName: "",
        message_textColor: ""
      });
    }
    if (fieldName == "gift") {
      this.setState({
        gift: true,
        edit: false,
        payment: false,
        credit: false,
        pass: false,
        favaurits: false,
        Suggest: false,
        innvite: false,
        message: false,
        edit_ClassName: "",
        edit_textColor: "",
        payment_ClassName: "",
        payment_textColor: "",
        credit_ClassName: "",
        credit_textColor: "",
        pass_ClassName: "",
        pass_textColor: "",
        favaurits_ClassName: "",
        favaurits_textColor: "",
        Suggest_ClassName: "",
        Suggest_textColor: "",
        innvite_ClassName: "",
        innvite_textColor: "",
        gift_ClassName: "ListItemActive",
        gift_textColor: "#ffffff",
        message_ClassName: "",
        message_textColor: ""
      });
    }
    if (fieldName == "message") {
      this.setState({
        gift: false,
        edit: false,
        payment: false,
        credit: false,
        pass: false,
        favaurits: false,
        Suggest: false,
        innvite: false,
        message: true,
        edit_ClassName: "",
        edit_textColor: "",
        payment_ClassName: "",
        payment_textColor: "",
        credit_ClassName: "",
        credit_textColor: "",
        pass_ClassName: "",
        pass_textColor: "",
        favaurits_ClassName: "",
        favaurits_textColor: "",
        Suggest_ClassName: "",
        Suggest_textColor: "",
        innvite_ClassName: "",
        innvite_textColor: "",
        gift_ClassName: "",
        gift_textColor: "",
        message_ClassName: "ListItemActive",
        message_textColor: "#ffffff"
      });
    }
    if (fieldName == "logout") {
      // this.setState({})
      // console.log("kjfgfd");
      localStorage.removeItem("userData");
    }
  };

  handleEditcomponent=()=>{
    this.setState({editProfileImage: !this.state.editProfileImage});console.log("editProfileImage");
  }

  render() {
    const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    // let isSubmitButton= false;
    return (
      <React.Fragment>
        <div style={{height:140}}></div>
        <div
          className="innnerban Sticky"
          style={{ position: "fixed", top: 0, zIndex: 100 ,backgroundColor: '#000080'}}
        >
          <Headers backgroundColor="#000080" />
        </div>

        {/* Body Menu section */}

        <div className="row" style={{ backgroundColor: "#f0f0f0" }}>
          <div className="col-lg-12" id="profile-banner">
            <div className="container">
              <h2>My Account</h2>
              <div className="row" style={{ marginBottom: 100 }}>
                <div className="col-lg-3 dashbord-menu">
                  <ul
                  style={{display: this.state.list_visibility}}
                  >
                    <li
                      onClick={() => this.ListMenuHandle("edit")}
                      className={this.state.edit_ClassName}
                    >
                      <a style={{ color: this.state.edit_textColor }}>
                        <span>
                          <i
                            className="fa fa-user-circle-o"
                            aria-hidden="true"
                          ></i>
                        </span>
                        Edit Profile
                      </a>
                    </li>

                    <li
                      onClick={() => this.ListMenuHandle("payment")}
                      className={this.state.payment_ClassName}
                    >
                      <a style={{ color: this.state.payment_textColor }}>
                        <span>
                          <i
                            className="fa fa-credit-card"
                            aria-hidden="true"
                          ></i>
                        </span>
                        Payment Histroy
                      </a>
                    </li>

                    <li
                      onClick={() => this.ListMenuHandle("credit")}
                      className={this.state.credit_ClassName}
                    >
                      <a style={{ color: this.state.credit_textColor }}>
                        <span>
                          <i className="fa fa-cart-plus" aria-hidden="true"></i>
                        </span>
                        Get credits now
                      </a>
                    </li>

                    <li
                      onClick={() => this.ListMenuHandle("pass")}
                      className={this.state.pass_ClassName}
                    >
                      <a style={{ color: this.state.pass_textColor }}>
                        <span>
                          <i className="fa fa-calendar" aria-hidden="true"></i>
                        </span>
                        My passes
                      </a>
                    </li>

                    <li
                      onClick={() => this.ListMenuHandle("favaurits")}
                      className={this.state.favaurits_ClassName}
                    >
                      <a style={{ color: this.state.favaurits_textColor }}>
                        <span>
                          <i className="fa fa-heart-o" aria-hidden="true"></i>
                        </span>
                        Favorites
                      </a>
                    </li>

                    {/* <li onClick={()=>this.ListMenuHandle('Suggest')} className={this.state.Suggest_ClassName}><a style={{color: this.state.Suggest_textColor}}><span><i className="fa fa-address-card-o" aria-hidden="true"></i></span>Suggest a gym</a></li> */}

                    <li
                      onClick={() => this.ListMenuHandle("innvite")}
                      className={this.state.innvite_ClassName}
                    >
                      <a style={{ color: this.state.innvite_textColor }}>
                        <span>
                          <i
                            className="fa fa-address-card"
                            aria-hidden="true"
                          ></i>
                        </span>
                        Invite
                      </a>
                    </li>

                    {/* <li onClick={()=>this.ListMenuHandle('gift')} className={this.state.gift_ClassName}><a style={{color: this.state.gift_textColor}}><span><i className="fa fa-gift" aria-hidden="true"></i></span>Gift for friends</a></li> */}

                    <li
                      onClick={() => this.ListMenuHandle("message")}
                      className={this.state.message_ClassName}
                    >
                      <a style={{ color: this.state.message_textColor }}>
                        <span>
                          <i
                            className="fa fa-commenting-o"
                            aria-hidden="true"
                          ></i>
                        </span>
                        Messaging
                      </a>
                    </li>

                    <li onClick={() => this.ListMenuHandle("logout")}>
                      <a>
                        <span>
                          <i className="fa fa-sign-out" aria-hidden="true"></i>
                        </span>
                        <Link to="/">Logout</Link>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-9 dashbord-menu-two">
                  {this.state.edit ? <EditProfile onClick={()=>{this.handleEditcomponent}} /> : null}
                  {this.state.payment ? (
                   <Payment />
                  ) : null}
                  {this.state.credit ? <GetCredit /> : null}
                  {this.state.pass ? <MyPasses /> : null}
                  {this.state.favaurits ? <Favourits /> : null}
                  {this.state.Suggest ? <SuggestGym /> : null}
                  {this.state.innvite ? <InnviteFriends /> : null}
                  {this.state.gift ? <GiftFriends /> : null}
                  {this.state.message? <b><Messaging/></b>:null}
                </div>
              </div>
            </div>
          </div>
        </div>

        {this.state.loader ? <Loader modalToggle={this.state.loader} /> : null}

        <div className="container" style={{ marginTop: 20 }}>
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

        {/* Menu & close icon ................................................. */}

        {this.state.IconVisibility ? (
              <div
                style={{
                  left: `5%`,
                  top: 180,
                  position: "absolute",
                }}
              >
                {this.state.crossMenu_visibility ? (
                  <div onClick={() => this.IconsHandle(1)}>
                    <Menu
                      width={40}
                      height={30}
                      color="#000"
                    />
                  </div>
                ) : (
                  <div
                    onClick={() => this.IconsHandle(0)}
                    style={{ margin: 3 }}
                  >
                    <Close
                      width={30}
                      height={20}
                      color="#000"
                    />
                  </div>
                )}
              </div>
            ) : null}
          


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

export default connect(mapStateToProps, mapPropsToState)(withRouter(UserProfile));
