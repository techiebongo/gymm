/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-expressions */
import React from "react";
import "../../Utils/style.css";
// import "../../Utils/menu.css";
import { Menu, Close } from "react-bytesize-icons";
import logo from "../../Images/logo.png";
import { Link, withRouter, Redirect  } from "react-router-dom";
// import Modal from 'react-modal';
import Signin from "./signin";
import Signup from "./signup";
import Forgot from "./forgot-password";
import Modal from "react-bootstrap/Modal";
import {} from "react-router";
import axios from "axios";
import Api from "../../Url";
import {connect} from 'react-redux';
import {URL, CREDIT, HOME, HOWITWORK, PRICING, SCROLLVIEW, SCROLLCOUNT,FINDAGYM,GYMLOCATION,GYMOWNER,BLOG} from '../../Action/type';

class Headers extends React.Component {
  constructor() {
    super();
    this.state = {
      modalIsOpen: false,
      modalWidth: "70%",
      crossMenu_visibility: true,
      IconVisibility: false,
      Icon_marginRight: 0,
      Icon_marginTop: 0,
      list_visibility: "table-cell",
      MenuHeight: 30,
      MenuWidth: 30,
      CloseWidth: 20,
      CloseHeight: 20,
      signinModal: false,
      signupModal: false,
      forgotModal: false,
      user: JSON.parse(localStorage.getItem("userData")),
      linkColor: "",
      menuBackgraoundColor: "",
      usermenu: "none",
      userCredits: 0,
      profileImage: "",
      howIt: 'menuItemUnderLine',
      pricing: '',
      findAgym: '',
      location: '',
      gymOwners: '',
      blog: '',
      homeTopScrollStart: 0,
      howitworkTopScrollStart: 1000,
      pricingTopScrollStart: 1650,
    };
    window.addEventListener("resize", this.getNumberOfColumns.bind(this));
  }

  getNumberOfColumns() {
    window.innerWidth <= 397?
    this.setState({
      IconVisibility: true,
      Icon_marginRight: 10,
      Icon_marginTop: 70,
      list_visibility: "none",
      MenuHeight: 20,
      MenuWidth: 20,
      CloseWidth: 10,
      CloseHeight: 10,
      modalWidth: "80%",
      menuBackgraoundColor: '#000080',
      howitworkTopScrollStart: 2530,
      pricingTopScrollStart: 3440
    })
  : window.innerWidth <= 480
      ? this.setState({
          IconVisibility: true,
          Icon_marginRight: 10,
          Icon_marginTop: 70,
          list_visibility: "none",
          MenuHeight: 20,
          MenuWidth: 20,
          CloseWidth: 10,
          CloseHeight: 10,
          modalWidth: "80%",
          menuBackgraoundColor: '#000080',
          howitworkTopScrollStart: 2530,
          pricingTopScrollStart: 3370
        })
      : window.innerWidth <= 520?
      this.setState({
        IconVisibility: true,
        Icon_marginRight: 10,
        Icon_marginTop: 70,
        list_visibility: "none",
        MenuHeight: 20,
        MenuWidth: 20,
        CloseWidth: 10,
        CloseHeight: 10,
        modalWidth: "80%",
        menuBackgraoundColor: '#000080',
        howitworkTopScrollStart: 2440,
        pricingTopScrollStart: 3280
      })
    : window.innerWidth <= 570
      ? this.setState({
          IconVisibility: true,
          Icon_marginRight: 13,
          Icon_marginTop: 35,
          list_visibility: "none",
          MenuHeight: 25,
          MenuWidth: 25,
          CloseWidth: 13,
          CloseHeight: 13,
          modalWidth: "70%",
          menuBackgraoundColor: '#000080',
          howitworkTopScrollStart: 2370,
          pricingTopScrollStart: 3200
        })
      : window.innerWidth <= 668
      ? this.setState({
          IconVisibility: true,
          Icon_marginRight: 13,
          Icon_marginTop: 35,
          list_visibility: "none",
          MenuHeight: 30,
          MenuWidth: 30,
          CloseWidth: 20,
          CloseHeight: 20,
          modalWidth: "65%",
          menuBackgraoundColor: '#000080',
          howitworkTopScrollStart: 2370,
          pricingTopScrollStart: 3230
        })
      : window.innerWidth <= 768
      ? this.setState({
          IconVisibility: true,
          Icon_marginRight: 11,
          Icon_marginTop: 35,
          list_visibility: "none",
          MenuHeight: 30,
          MenuWidth: 30,
          CloseWidth: 20,
          CloseHeight: 20,
          modalWidth: "60%",
          menuBackgraoundColor: '#000080',
          howitworkTopScrollStart: 2370,
          pricingTopScrollStart: 3280
        })
      : window.innerWidth <= 845
      ? this.setState({
          IconVisibility: true,
          Icon_marginRight: 9,
          Icon_marginTop: 30,
          list_visibility: "none",
          MenuHeight: 30,
          MenuWidth: 30,
          CloseWidth: 20,
          CloseHeight: 20,
          modalWidth: "55%",
          menuBackgraoundColor: '#000080',
          howitworkTopScrollStart: 1670,
          pricingTopScrollStart: 2600
        })
      : window.innerWidth <= 991
      ? this.setState({
          IconVisibility: true,
          Icon_marginRight: 7,
          Icon_marginTop: 35,
          list_visibility: "none",
          MenuHeight: 30,
          MenuWidth: 30,
          CloseWidth: 20,
          CloseHeight: 20,
          modalWidth: "53%",
          menuBackgraoundColor: '#000080',
          howitworkTopScrollStart: 1670,
          pricingTopScrollStart: 2630
        })
      : window.innerWidth <= 1125
      ? this.setState({
          // IconVisibility: true,
          // Icon_marginRight: 18,
          // Icon_marginTop: 40,
          // list_visibility: "none",
          // MenuHeight: 30,
          // MenuWidth: 30,
          // CloseWidth: 20,
          // CloseHeight: 20,
          // menuBackgraoundColor: "",
          IconVisibility: false,
          list_visibility: "inline-flex",
          modalWidth: "50%",
          menuBackgraoundColor: "",
          howitworkTopScrollStart: 1250,
          pricingTopScrollStart: 2050
        })
      : this.setState({
          IconVisibility: false,
          list_visibility: "inline-flex",
          modalWidth: "50%",
          menuBackgraoundColor: "",
          howitworkTopScrollStart: 1000,
          pricingTopScrollStart: 1800
        });
  }
  componentDidMount() {
    this.getNumberOfColumns();
    //  localStorage.removeItem('userData');
    // console.log("enter into componentDidMount");
    this.viewUserProfile();
  }
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
            this.setState({profileImage: res.data.response_data.profile_image});
            this.props.setUrl(res.data.response_data.profile_image);
            //   // localStorage.setItem('userData', JSON.stringify(res.data.response_data.));
            //   console.log(res.data.response_message, "response data");
          } else if (res.data.response_code === 4000) {
            // this.props.history.push({
            //   pathname: "/",
            // });
            this.removeLocalStore();
          }
        })
        .catch((err) => console.log(err.data));

      axios
        .get(
          `${Api.API_URL}/user-credit-balance?email=${this.state.user.email}`,
          {
            headers: {
              "Content-Type": "application/json",
              "x-access-token": this.state.user.authtoken,
            },
          }
        )
        .then((res) => {
          // console.log(res);
          if (res.data.response_code === 2000) {
            const userCredits = res.data.response_data;
            this.setState({
              userCredits,
            });
            this.props.setCredit(userCredits);
            // console.log("small === ");
          }
        });
    }
  };

  IconsHandle = (value) => {
    let list = "";
    value ? (list = "table-cell") : (list = "none");
    this.setState({
      crossMenu_visibility: !this.state.crossMenu_visibility,
      list_visibility: list,
    });

    // console.log(" kgiukgkjjk=====", this.state.crossMenu_visibility, value);
  };

  modalHandel = (text) => {
    if (text === "signin") {
      this.setState({
        modalIsOpen: true,
        signinModal: true,
        signupModal: false,
        forgotModal: false,
      });
    } else if (text === "signup") {
      this.setState({
        modalIsOpen: true,
        signinModal: false,
        signupModal: true,
        forgotModal: false,
      });
    } else if (text === "forgot") {
      this.setState({
        modalIsOpen: true,
        signinModal: false,
        signupModal: false,
        forgotModal: true,
      });
    }
  };

  removeLocalStore = () => {
    localStorage.removeItem("userData");
    // console.log("enter into remove local store");
    //window.location.reload(false);
    this.setState({ user: "" });
  };

  userMenuHandle = () => {
    if (this.state.usermenu === "table-cell") {
      this.setState({ usermenu: "none" });
    } else {
      this.setState({ usermenu: "table-cell" });
    }
  };

  // linkHandle= async(text)=>{
  //   console.log("Hello");
  //   const black = '#000000';
  //   const white = '#ffffff';
  //   text == 'findgym' || text == 'location' || text == 'blog'?(
  //     this.setState({linkColor: black}),
  //     console.log("black")

  //    ) : (
  //     this.setState({linkColor: white}),
  //     console.log("white")
  //    )
  //   console.log("link color  ",this.state.linkColor, text)
  // }
  handleHomeMenu=()=>{
    this.props.setHome(1);
    this.props.setScrollView(0); 
    this.props.setScrollCount(0);
  }
  handleHowItWorkMenu=()=>{
    this.props.setHowItWork(1);
    this.props.setScrollView(this.state.howitworkTopScrollStart); 
    this.props.setScrollCount(1); 
    // return <Redirect to='/' />
  }
  handlePricingMenu=()=>{
    this.props.setPricing(1);
    this.props.setScrollView(this.state.pricingTopScrollStart); 
    this.props.setScrollCount(1); 
  }
  handleFind_a_GymMenu=()=>{
    this.props.setFindagym(1);
     
  }
  handleAllLocationMenu=()=>{
    this.props.setLocation(1);
    
  }
  handleGymOwnerMenu=()=>{
    this.props.setGymowner(1);
   
  }
  handleBlogMenu=()=>{
    this.props.setBlog(1);
    
  }

  render() {
    let userdata_from_locallStore = JSON.parse(
      localStorage.getItem("userData")
    );
    let userName = userdata_from_locallStore
      ? userdata_from_locallStore.name
      : null;
    let userPhoto = userdata_from_locallStore
      ? userdata_from_locallStore.profile_image
      : null;
    
      let reader = new FileReader();
         let file = this.props.imageUrl;
         reader.onloadend = () => {
           document.getElementById('preview').value= reader.result
         }
        //  reader.readAsDataURL(file)
    // console.log("Header Redux value == ",this.props.howIt, this.props.scrollView);

    return (
      <div>
        <div className="top" style={{}}>
          <div className="container" style={{}}>
            <div className="row">
              <div className="col-lg-12" style={{}}>
                <div className="logo">
                  <Link to='/'>
                    {" "}
                    <img src={logo} alt="" />{" "}
                  </Link>
                </div>

                {/* Header Menu Field   ..................................*/}

                <div className=" ">
                  <div id="cssmenu" className="small-screen">
                    <ul
                      id="menuList"
                      style={{
                        display: this.state.list_visibility,
                        backgroundColor: this.state.menuBackgraoundColor,
                      }}
                    >
                      <li>
                        <Link to={{pathname:"/",hash:"home"}} style={{ color: "#ffffff" }}  id={this.props.home?("menuItemUnderLine"):""} className="ItemUnderLine" onClick={()=>this.handleHomeMenu()}>
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link to={{pathname:"/",hash:"howitwork"}} style={{ color: "#ffffff" }}  id={this.props.howIt?("menuItemUnderLine"):""} className="ItemUnderLine" onClick={()=>this.handleHowItWorkMenu()}>
                          How it Works
                        </Link>
                        {/* <h2 href="#howitwork">how it works</h2> */}
                      </li>

                      <li>
                        <Link to={{pathname:"/",hash:"pricing"}} style={{ color: "#ffffff" }}  id={this.props.pricing?("menuItemUnderLine"):""} className="ItemUnderLine" onClick={()=>this.handlePricingMenu()}>
                          Pricing{" "}
                        </Link>
                      </li>
                      <li>
                        <Link to="/find-a-gym" style={{ color: "#ffffff" }}  id={this.props.findAGym?("menuItemUnderLine"):""} className="ItemUnderLine"  onClick={()=>this.handleFind_a_GymMenu()}>
                          Find a Gym{" "}
                        </Link>
                      </li>
                      <li>
                        <Link to="/all-locations" style={{ color: "#ffffff" }}  id={this.props.gymLocation?("menuItemUnderLine"):""} className="ItemUnderLine" onClick={()=>this.handleAllLocationMenu()}>
                          Locations{" "}
                        </Link>
                      </li>
                      <li>
                        <Link to="/gym-owner" style={{ color: "#ffffff" }}  id={this.props.gymOwner?("menuItemUnderLine"):""} className="ItemUnderLine" onClick={()=>this.handleGymOwnerMenu()}>
                          Gym Owners
                        </Link>
                      </li>
                      <li>
                        <Link to="/blog" style={{ color: "#ffffff" }}  id={this.props.blog?("menuItemUnderLine"):""} className="ItemUnderLine" onClick={()=>this.handleBlogMenu()}>
                          Blog
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Signin & Signup with After Sign Screen .................................*/}

                {userName == null ? (
                  <div className="logupin">
                    <Link
                      to
                      style={{ fontSize: 16, fontWeight: 500, color: "#ffff" }}
                      onClick={() => this.modalHandel("signin")}
                    >
                      Signin{" "}
                    </Link>
                    /
                    <Link
                      to
                      style={{ fontSize: 16, fontWeight: 500, color: "#ffff" }}
                      onClick={() => this.modalHandel("signup")}
                    >
                      Signup
                    </Link>
                  </div>
                ) : (
                  <div>
                    <div className="afterLogupin row">
                      <Link to="/user-profile">
                        <div
                          style={{
                            width: 35,
                            height: 35,
                            borderRadius: 50,
                            backgroundColor: "",
                            display: "flex",
                            alignSelf: "center",
                            justifyContent: "center",
                          }}
                          // onClick={this.userMenuHandle}
                        >
                          <img
                            src={this.props.imageUrl}
                            style={{
                              width: "100%",
                              height: "90%",
                              borderRadius: 150,
                            }}
                            id='preview'
                          />
                        </div>
                      </Link>

                      <div style={{ paddingTop: 2 }}>
                        <div
                          style={{
                            fontSize: 12,
                            fontWeight: 500,
                            color: "#ffff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            paddingLeft: 5,
                          }}
                        >
                          {userName}
                        </div>
                        <div
                          style={{
                            fontSize: 11,
                            fontWeight: 500,
                            color: "#ffff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            paddingLeft: 5,
                          }}
                        >
                          {this.props.credit}{" "}
                          {this.props.credit > 1 ? "Credits" : "Credit"}
                        </div>
                      </div>
                    </div>
                    {/* <div id="signout">
                      <ul style={{ display: this.state.usermenu }}>
                        <li>
                          <Link
                            to="/UserProfile"
                            style={{
                              fontSize: 14,
                              fontWeight: 500,
                              color: "#ffff",
                              marginTop: 0,
                              paddingTop: 1,
                              
                            }}
                          >
                            {"  "} User Profile
                          </Link>
                        </li>
                        <li>
                          <Link
                            to
                            style={{
                              fontSize: 14,
                              fontWeight: 500,
                              color: "#ffff",
                              marginTop: 0,
                              paddingTop: 1,
                            }}
                            onClick={() => this.removeLocalStore()}
                          >
                            {"  "} Signout
                          </Link>
                        </li>
                      </ul>
                    </div> */}
                  </div>
                )}
              </div>
            </div>

            {/* Menu & close icon ................................................. */}

            {this.state.IconVisibility ? (
              <div
                style={{
                  right: `${this.state.Icon_marginRight}%`,
                  top: this.state.Icon_marginTop,
                  position: "absolute",
                }}
              >
                {this.state.crossMenu_visibility ? (
                  <div onClick={() => this.IconsHandle(1)}>
                    <Menu
                      width={this.state.MenuWidth}
                      height={this.state.MenuHeight}
                      color="#ffff"
                    />
                  </div>
                ) : (
                  <div
                    onClick={() => this.IconsHandle(0)}
                    style={{ margin: 3 }}
                  >
                    <Close
                      width={this.state.CloseWidth}
                      height={this.state.CloseHeight}
                      color="#ffff"
                    />
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>

        {/* Credintial Modal ---------------------------------------- */}

        <div className="container">
          <Modal
            show={this.state.modalIsOpen}
            // onHide={() => setShow(false)}
            dialogClassName="modal-90w"

            // aria-labelledby="example-custom-modal-styling-title"
          >
            <div
              onClick={() => this.setState({ modalIsOpen: false })}
              style={{ width: "100%", textAlign: "right", padding: 25 }}
            >
              <Close width={15} height={15} color="#B3B6B7" />
            </div>
            {this.state.signinModal ? (
              <Signin
                onClick2={() => this.modalHandel("signup")}
                onPress={() => this.modalHandel("forgot")}
                onClick={() => this.SuccessLogin()}
              />
            ) : this.state.signupModal ? (
              <Signup
                onClick={() => this.modalHandel("signin")}
                onPress={() => this.SuccessLogin()}
              />
            ) : this.state.forgotModal ? (
              <Forgot onClick={() => this.modalHandel("signin")} />
            ) : null}
          </Modal>
        </div>
      </div>
    );
  }

  SuccessLogin = () => {
    //   alert("enter into =====");
    this.props.history.push({
      pathname: "/find-a-gym",
    });

    this.setState({ modalIsOpen: false });
    //window.location.reload(false);
  };

  afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };
}
var subtitle;

const mapStateToProps = state => {
  // console.log('state',state);
  return {
    imageUrl: state.imageUrlReducer.url,
    credit: state.imageUrlReducer.credit,
    blog: state.underLineReducer.blog,
    findAGym: state.underLineReducer.findAGym,
    gymLocation: state.underLineReducer.gymLocation,
    gymOwner: state.underLineReducer.gymOwner,
    howIt: state.underLineReducer.howIt,
    pricing: state.underLineReducer.pricing,
    home: state.underLineReducer.home,
    scrollView: state.underLineReducer.scrollView,
    scrollCount: state.underLineReducer.scrollCount,
  };
};

const mapPropsToState = dispatch => {
  // console.log('dispatch');
  return {
    setUrl: async no => await dispatch({type: URL, payload: no}),
    setCredit: async no => await dispatch({type: CREDIT, payload: no}),
    setHome: async no => await dispatch({type: HOME, payload: no}),
    setHowItWork: async no => await dispatch({type: HOWITWORK, payload: no}),
    setPricing: async no => await dispatch({type: PRICING, payload: no}),
    setFindagym: async no => await dispatch({type: FINDAGYM, payload: no}),
    setLocation: async no => await dispatch({type: GYMLOCATION, payload: no}),
    setGymowner: async no => await dispatch({type: GYMOWNER, payload: no}),
    setBlog: async no => await dispatch({type: BLOG, payload: no}),
    setScrollView: async no => await dispatch({type: SCROLLVIEW, payload: no}),
    setScrollCount: async no => await dispatch({type: SCROLLCOUNT, payload: no}),
  };
};


export default connect(
  mapStateToProps,
  mapPropsToState,
)(withRouter(Headers));
