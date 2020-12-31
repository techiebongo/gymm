/* eslint-disable no-use-before-define */
/* eslint-disable no-lone-blocks */
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
import gray_heart from "../../Images/gray_heart.png";
import red_heart from "../../Images/red_heart.png";
import Api from "../../Url";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { Link } from "react-router-dom";
import Loader from "../../Compenents/Comman/loader";
import { connect } from "react-redux";
import { CLOSEUNDERLINE } from "../../Action/type";

let gymDetails = null;
let passDetailView = null;

class GymDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      gymDetails: null,
      userId: "",
      userLocalData: [],
      isFavourite: false,
      dayNames: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      loader: false,
      passView: true,
      passDetailStatus: "",
      passActimeMsgRes: "",
      passCode: "",
      activeDay: 0,
      activeSec: 0,
      activeMin: 0,
      activeHour: 0,
    };
  }

  loaderHandler = () => {
    // console.log(" hello");
    this.setState({ loader: !this.state.loader });
  };

  componentDidMount = () => {
    this.props.setNullUnderLine(1);
    // const SingleGymData= JSON.parse(localStorage.getItem("SingleGymData"));
    // console.log("SingleGymData =====>",SingleGymData);

    // this.setState({viewSingleBlog: this.props.location.state.data});
    // let role = this.props.match;
    // console.log("gym id from params",this.props, this.props.match.params.id);
    // console.log("gym id from params === ",role,)
    let PassDetail = JSON.parse(localStorage.getItem("PassDetails"));
    PassDetail
      ? 
      (console.log("PassDetail  ======> ", PassDetail),
        (passDetailView = PassDetail),
        PassDetail.status == "not-activated"
          ? this.setState({
              passView: false,
              passDetailStatus: "not-activated",
            })
          : PassDetail.status == "activated" ||
            PassDetail.status == "activation-progress"
          ? ((this.interval = setInterval(
              () => this.handleActiveTimer(PassDetail.expirationDate),
              0
            )),
            this.setState({
              passView: false,
              passDetailStatus: "activated",
              passCode: PassDetail.passCode,
            }))
          : null)
      : null;

    let localUserData = JSON.parse(localStorage.getItem("userData"));
    localUserData
      ? (this.setState({
          userId: localUserData._id,
          userLocalData: localUserData,
        }),
        console.log("userid ,", localUserData._id))
      : null;

    this.GetAllGyms();
  };

  handleActiveTimer = (expirationDate) => {
    let currentDateISOFormat = new Date().toISOString();
    let d1 = new Date(currentDateISOFormat);
    let d2 = new Date(expirationDate);
    let diff = d2 - d1;
    if (d2 > d1) {
      let difference_ms = diff / 1000;
      let seconds = Math.floor(difference_ms % 60);
      difference_ms = difference_ms / 60;
      let minutes = Math.floor(difference_ms % 60);
      difference_ms = difference_ms / 60;
      let hours = Math.floor(difference_ms % 24);
      let days = Math.floor(difference_ms / 24);
      this.setState({
        activeDay: days,
        activeSec: seconds,
        activeMin: minutes,
        activeHour: hours,
      });
    } else {
      this.setState({
        activeDay: 0,
        activeSec: 0,
        activeMin: 0,
        activeHour: 0,
      });
    }
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  GetAllGyms = () => {
    this.loaderHandler();
    const user = JSON.parse(localStorage.getItem("userData"));
    const gymId = this.props.match.params.id;
    let searchFiled = "";
    if (user) {
      searchFiled = `&user_id=${user._id}`;
    }
    if (gymId) {
      searchFiled = `${searchFiled}&gym_id=${gymId}`;
    }

    // console.log("filter searchable data === ", searchFiled, "jhjh");
    axios
      .get(`${Api.API_URL}/gym-list?${searchFiled}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // console.log("gym-list", res);
        if (res.data.response_code == 2000) {
          const responseData = res.data.response_data.docs[0];
          gymDetails = responseData;
          this.setState({ isFavourite: responseData.isFavourite });
          // console.log(
          //   this.state.gymDetails,
          //   "gym-list response data",
          //   this.state.gymDetails.isFavourite
          // );
          this.loaderHandler();
        } else {
          console.log("gym-list Info  " + res.data.response_message);
          this.loaderHandler();
        }
      })
      .catch((error) => {
        console.error(error);
        this.loaderHandler();
      });
  };

  favouriteHandle = (isFavouriteGym, auth, userId, gymId) => {
    let body = {
      user_id: userId,
      gym_id: gymId,
    };
    // console.log("favorite ", body, isFavouriteGym);
    !isFavouriteGym
      ? axios
          .post(`${Api.API_URL}/remove-favourite-gym`, body, {
            headers: {
              "x-access-token": auth,
            },
          })
          .then((res) => {
            // console.log("remove favorite  ", res);
            if (res.data.response_code === 2000) {
              this.setState({ isFavourite: false });
            }
          })
      : axios
          .post(`${Api.API_URL}/add-favourite-gym`, body, {
            headers: {
              "x-access-token": auth,
            },
          })
          .then((res) => {
            // console.log("add favorite  ", res);
            if (res.data.response_code === 2000) {
              this.setState({ isFavourite: true });
            }
          });
  };

  handleAcvitePass = () => {
    let body = {
      _id: passDetailView._id,
      user_id: this.state.userId,
    };
    axios
      .post(`${Api.API_URL}/user-active-pass`, body, {
        headers: {
          "x-access-token": this.state.userLocalData.authtoken,
        },
      })
      .then((res) => {
        // console.log("Active Pass  ", res);
        if (res.data.response_code === 2000) {
          this.setState({
            passDetailStatus: "",
            passCode: res.data.response_data.passCode,
          });
          this.interval = setInterval(
            () => this.handleActiveTimer(res.data.response_data.expirationDate),
            0
          );
        } else if (res.data.response_code === 4000) {
        } else {
          this.setState({ passActimeMsgRes: res.data.response_message });
        }
      });
  };

  render() {
    // let banner =[];
    // const {gymDetails} = gymDetails;
    const latitude = gymDetails ? gymDetails.lat : 22.876875;
    const longitude = gymDetails ? gymDetails.long : 88.654565;
    const user = JSON.parse(localStorage.getItem("userData"));
    // banner = gymDetails.banner_image;
    let closeDay = null;
    let d = new Date();
    let getToday = d.getDay();
    // console.log("yweifyrudgfhuj === ",gymDetails.banner_image,"dhfdfh")
    return (
      <React.Fragment>
        <div style={{ height: 100 }}></div>
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

        {/* Gym details ............................................. */}
        {gymDetails && (
          <div className="row">
            <div className="col-lg-12">
              <div className="container" id="find_a_activity">
                <div className="row" id="gym_details_banner">
                  <div className="col-lg-8 gym-b">
                    <OwlCarousel
                      className="owl-theme"
                      loop
                      margi={0}
                      nav
                      items={1}
                    >
                      {gymDetails &&
                        gymDetails.banner_image.map((photo, index) => (
                          <img
                            src={photo}
                            style={{ height: 300 }}
                            key={index}
                          />
                        ))}
                    </OwlCarousel>
                  </div>
                  <div className="col-lg-4 " style={{ minHeight: 250 }}>
                    <Map
                      id="map"
                      google={this.props.google}
                      zoom={12}
                      style={{
                        width: `100%`,
                        height: "100%",
                        border: 1,
                      }}
                      initialCenter={{
                        lat: parseFloat(latitude),
                        lng: parseFloat(longitude),
                      }}
                      center={{
                        lat: parseFloat(latitude),
                        lng: parseFloat(longitude),
                      }}
                    >
                      <Marker
                        position={{ lat: latitude, lng: longitude }}

                        //name={'This is test name'}
                      />
                    </Map>
                  </div>
                </div>

                <div className="row" id="gym-belowbaner">
                  <div className="col-lg-8">
                    <div className="row" id="neon-location">
                      <div className="col-lg-3">
                        <img src={gymDetails.logo} />
                      </div>
                      <div className="col-lg-9">
                        <div className="row">
                          <h2
                            style={{
                              width: "90%",
                              display: "flex",
                              justifyContent: "left",
                              alignItems: "left",
                              paddingLeft: 5,
                            }}
                          >
                            {gymDetails.name}
                          </h2>
                          {this.state.userId ? (
                            <div style={{ marginTop: 13 }}>
                              {this.state.isFavourite ? (
                                <img
                                  src={red_heart}
                                  style={{
                                    width: 40,
                                    height: 40,
                                    backgroundColor: "",
                                    cursor: "pointer",
                                  }}
                                  onClick={() =>
                                    this.favouriteHandle(
                                      false,
                                      this.state.userLocalData.authtoken,
                                      this.state.userId,
                                      gymDetails._id
                                    )
                                  }
                                />
                              ) : (
                                <img
                                  src={gray_heart}
                                  style={{
                                    width: 40,
                                    height: 40,
                                    backgroundColor: "",
                                    cursor: "pointer",
                                  }}
                                  onClick={() =>
                                    this.favouriteHandle(
                                      true,
                                      this.state.userLocalData.authtoken,
                                      this.state.userId,
                                      gymDetails._id
                                    )
                                  }
                                />
                              )}
                            </div>
                          ) : null}
                        </div>
                        <p>{gymDetails.address}</p>
                      </div>
                    </div>
                    <h4>About Us</h4>
                    <p>{gymDetails.description}</p>
                  </div>
                  <div className="col-lg-4">
                    {user ? (
                      !this.state.passView ? (
                        <div id="time-box">
                          <h5>
                            Pass Type &nbsp;&nbsp; : &nbsp;&nbsp;
                            <span> {passDetailView.passDetails.name} </span>
                          </h5>
                          <h5>
                            Valid Until &nbsp;&nbsp; : &nbsp;&nbsp;
                            <span>
                              {" "}
                              {passDetailView.activationLastDate.slice(
                                0,
                                10
                              )}{" "}
                            </span>
                          </h5>
                          {this.state.passCode ? (
                            <h4 id="passs_code">
                              Pass Code : {this.state.passCode}
                            </h4>
                          ) : null}
                          {this.state.passDetailStatus == "activated" ? (
                            <>
                              <h6>Pass expires in ..</h6>
                              <ul
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignSelf: "center",
                                }}
                              >
                                <li>
                                  {this.state.activeDay}
                                  <br />
                                  <small>DAYS</small>
                                </li>
                                <li>
                                  {this.state.activeHour}
                                  <br />
                                  <small>HRS</small>
                                </li>
                                <li>
                                  {this.state.activeMin}
                                  <br />
                                  <small>MINS</small>
                                </li>
                                <li>
                                  {this.state.activeSec}
                                  <br />
                                  <small>SECS</small>
                                </li>
                              </ul>
                            </>
                          ) : this.state.passDetailStatus == "not-activated" ? (
                            <>
                              <ul
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignSelf: "center",
                                }}
                              >
                                <li
                                  onClick={this.handleAcvitePass}
                                  style={{
                                    borderRadius: 40,
                                    fontSize: 20,
                                    fontWeight: 600,
                                    cursor: "pointer",
                                  }}
                                >
                                  ACTIVE
                                </li>
                              </ul>
                              <b
                                style={{
                                  color: "red",
                                  fontSize: 18,
                                  fontWeight: 600,
                                  paddingLeft: 5,
                                  paddingRight: 5,
                                  paddingBottom: 5,
                                }}
                              >
                                {this.state.passActimeMsgRes
                                  ? this.state.passActimeMsgRes
                                  : null}
                              </b>
                            </>
                          ) : this.state.passDetailStatus == "expired" ? (
                            <>
                              <ul
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignSelf: "center",
                                }}
                              >
                                <li
                                  style={{
                                    borderRadius: 40,
                                    fontSize: 20,
                                    fontWeight: 600,
                                  }}
                                >
                                  EXPIRED
                                </li>
                              </ul>
                            </>
                          ) : null}
                        </div>
                      ) : (
                        <div
                          className="row time-box"
                          style={{ marginTop: 10,paddingLeft:5, width: "100%",marginLeft:2 }}
                        >
                          <div className="col-lg-8"></div>

                          <OwlCarousel
                            className="owl-theme"
                            loop
                            margi={0}
                            nav
                            items={3}
                          >
                            {gymDetails &&
                              gymDetails.gym_passes.map(
                                (passItem, passIndex) => (
                                  <div id="time-btn" key={passIndex}>
                                    <Link
                                      to="/check-payment-option"
                                      onClick={() =>
                                        localStorage.setItem(
                                          "SinglePassData",
                                          JSON.stringify(passItem)
                                        )
                                      }
                                    >
                                      <b id="time-btn-text">
                                        {passItem.passDetails.name}
                                      </b>{" "}
                                      <br />{" "}
                                      <b id="time-btn-text">
                                        {" "}
                                        {passItem.credit} credits
                                      </b>
                                    </Link>
                                  </div>
                                )
                              )}
                          </OwlCarousel>
                        </div>
                      )
                    ) : null}
                  </div>
                </div>

            

                <div className="row">
                  <div className="col-lg-12" id="opening-h">
                    <h3>Opening Hour</h3>
                    <div
                        className="show-schedule"
                        style={{ marginTop: 30 }}
                      >
                    <a style={{ color: "#000080" }}>
                          <i className="fa fa-calendar" aria-hidden="true"></i> Show
                          Schedule For Week
                        </a>
                        </div>
                    <div className="row">
                      <div className="col-lg-5" id="today">
                        <div className="row">
                          {/* <div className="col-1">
                            <i className="fa fa-clock-o" aria-hidden="true"></i>
                          </div> */}
                          <div className="col-11 todayTime">
                            {gymDetails.opening_hours
                              ? gymDetails.opening_hours.map(
                                  (Hour, HourIndex) =>
                                    Hour.day === getToday
                                      ? ((
                                          <h5 key={HourIndex}>
                                           <i className="fa fa-clock-o" aria-hidden="true" style={{}}></i> Today : {Hour.time}
                                          </h5>
                                        ),
                                        (
                                          <h5 id="span" key={HourIndex}>
                                            <span><i className="fa fa-clock-o" aria-hidden="true" style={{}}></i> Today : {Hour.time}</span>
                                          </h5>
                                        ))
                                      : null
                                )
                              : null}

                            {gymDetails.opening_hours
                              ? gymDetails.opening_hours.map(
                                  (dayHour, dayHourIndex) =>
                                    this.state.dayNames.map((day, dayIndex) =>(
                                    gymDetails.closing_days.map((dayClose, closeDayIndex)=>{
                                      dayClose == dayIndex?
                                        closeDay = dayClose
                                      : null
                                    }),
                                    
                                      dayIndex === dayHour.day ? (
                                        closeDay != dayIndex && dayHour.openingTime != ""?(
                                        //  console.log("day is ", day, dayHour.time),
                                        dayHour.day === getToday ? (
                                          // <h5>Today : {dayHour.time}</h5>,
                                          // <h5 id="span"><span>Today : {dayHour.time}</span></h5>,
                                          <h5>
                                            {day} : {dayHour.time}
                                          </h5>
                                        ) : (
                                          <h5 id="span" key={dayHourIndex}>
                                            <span>
                                              {day} : {dayHour.time}
                                            </span>
                                          </h5>
                                        )

                                        ):(
                                          dayHour.day === getToday ? (
                                            
                                            <h5 id="span" key={dayHourIndex}>
                                          <span>
                                            {day} : {" Closed"}
                                          </span>
                                        </h5>
                                          ) : (
                                            
                                            <h5 id="span" key={dayHourIndex}>
                                            <span>
                                              {day} : {" Closed"}
                                            </span>
                                          </h5>
                                          )
                                          
                                        )

                                      ) : null
                                    
                                    )
                                )
                              ): null}
                          </div>
                        </div>
                      </div>
                      {/* <div
                        className="col-lg-7 show-schedule"
                        style={{ marginTop: 10 }}
                      >
                        <a style={{ color: "#000080" }}>
                          <i className="fa fa-calendar" aria-hidden="true"></i> Show
                          Schedule For Week
                        </a>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="container" style={{ marginTop: 30 }}>
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

        {this.state.loader ? <Loader modalToggle={this.state.loader} /> : null}

        <Footer />
      </React.Fragment>
    );
  }

  handleSinglePass = (passDetail) => {};
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

export default connect(mapStateToProps, mapPropsToState)(GoogleApiWrapper({
  apiKey: "AIzaSyDAo3jDdkyjeelCuFlircOLupn9omtho-A",
})(GymDetails));
