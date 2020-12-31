/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "../../Utils/style.css";
import axios from "axios";
import Api from "../../Url";
import "../../Utils/profileSection_style.css";
import Loader from "../Comman/loader";
import { Link } from "react-router-dom";

class MyPasses extends React.Component {
  state = {
    user: JSON.parse(localStorage.getItem("userData")),
    passesList: [],
    passItem: "not-activated",
    activeBtnBackgroundColor: "",
    activeBtnColor: "",
    bookedBtnBackgroundColor: "#000080",
    bookedBtnColor: "#ffffff",
    expiredBtnBackgroundColor: "",
    expiredBtnColor: "",
    loader: false,
    pageLimit: 1,
    loadMore: false,
    passStatus: '',
    gymCategory: "Booked gym"
  };

  loaderHandler = () => {
    // console.log(" hello");
    this.setState({ loader: !this.state.loader });
  };

  handalePasses = (btnName) => {
    if (btnName === "activated") {
      this.setState({
        passItem: btnName,
        activeBtnBackgroundColor: "#000080",
        activeBtnColor: "#ffffff",
        bookedBtnBackgroundColor: "",
        bookedBtnColor: "",
        expiredBtnBackgroundColor: "",
        expiredBtnColor: "",
        passStatus: '',
        gymCategory: "Active gym",
        pageLimit: 1,
      });
      this.getPassList('activated',1);
    }
    if (btnName === "not-activated") {
      this.setState({
        passItem: btnName,
        bookedBtnBackgroundColor: "#000080",
        bookedBtnColor: "#ffffff",
        activeBtnBackgroundColor: "",
        activeBtnColor: "",
        expiredBtnBackgroundColor: "",
        expiredBtnColor: "",
        passStatus: '',
        gymCategory: "Booked gym",
        pageLimit: 1,
      });
      this.getPassList('not-activated',1);
    }
    if (btnName === "expired") {
      this.setState({
        passItem: btnName,
        bookedBtnBackgroundColor: "",
        bookedBtnColor: "",
        activeBtnBackgroundColor: "",
        activeBtnColor: "",
        expiredBtnBackgroundColor: "#000080",
        expiredBtnColor: "#ffffff",
        passStatus: "expired",
        gymCategory: "Expired gym",
        pageLimit: 1,
      });
      this.getPassList('expired',1);
    }
  };

  componentDidMount = () => {
    this.getPassList('not-activated', 1);
  };

  getPassList = (status,pageLimit) => {
    this.loaderHandler();
    // console.log(this.state.user);
    if (this.state.user) {
      axios
        .get(`${Api.API_URL}/user-pass-list?user_id=${this.state.user._id}&limit=${10}&page=${pageLimit}&status=${status}`, {
          headers: {
            "x-access-token": this.state.user.authtoken,
          },
        })
        .then((res) => {
          // console.log("view passes data   =====   ", res);
          if (res.data.response_code === 2000) {
            let responseData = res.data.response_data.docs;
            
            if(res.data.response_data.pages > pageLimit){
              if(pageLimit == 1){
              this.setState({ passesList: responseData, pageLimit: pageLimit + 1, loadMore: true});
              } else {
                this.setState({ passesList: this.state.passesList.concat(responseData), pageLimit: pageLimit + 1, loadMore: true});
              }
            } else {
              if(pageLimit == 1){
              this.setState({ passesList: responseData, loadMore: false});
              } else {
                this.setState({ passesList: this.state.passesList.concat(responseData), loadMore: false});
              }
            }
            
            //   // localStorage.setItem('userData', JSON.stringify(res.data.response_data.));
            // console.log(res.data.response_message, responseData.dob, "response data");
            this.loaderHandler();
          } else if (res.data.response_code === 4000) {
            // this.removeLocalStore();
            this.props.history.push({
              pathname: "/",
            });
            this.loaderHandler();
          } else {
            this.loaderHandler();
          }
        })
        .catch((err) => {console.log(err.data); this.loaderHandler();});
    }
  };

  handalePassDetail=(passdetail)=>{
    let SingleGymId = {SingleGymId: passdetail.gym_id}
    localStorage.setItem('SingleGymId', JSON.stringify(SingleGymId));
    localStorage.setItem('PassDetails', JSON.stringify(passdetail));
    localStorage.removeItem("SingleGymData")
  };

  render() {
    return (
      <React.Fragment>
        <div id="user-favorites">
          <h3>My Passes</h3>
          <div className="row ">
            <div className="col-lg-10 col-10 mx-auto" id="active-pass">
              <div className="row">
                <div
                  className=""
                  style={{
                    backgroundColor: this.state.activeBtnBackgroundColor, width: '33.3%',borderRadius: 10
                  }}
                >
                  <h2
                    onClick={() => this.handalePasses("activated")}
                    style={{ color: this.state.activeBtnColor }}
                  >
                    Active
                  </h2>
                </div>
                <div
                  className=""
                  style={{
                    backgroundColor: this.state.bookedBtnBackgroundColor, width: '33.4%',borderRadius: 10
                  }}
                >
                  <h2
                    onClick={() => this.handalePasses("not-activated")}
                    style={{ color: this.state.bookedBtnColor }}
                  >
                    Booked
                  </h2>
                </div>
                <div
                  className=""
                  style={{
                    backgroundColor: this.state.expiredBtnBackgroundColor, width: '33.3%',borderRadius: 10
                  }}
                >
                  <h2
                    onClick={() => this.handalePasses("expired")}
                    style={{ color: this.state.expiredBtnColor }}
                  >
                    Expired
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <div style={{ maxHeight: 600, overflowY: this.state.passesList.length > 2?("scroll") : (''), overflowX:"hidden"}}>
            {this.state.passesList &&
              this.state.passesList.map(
                (pass, passIndex) =>
                  pass.status === this.state.passItem ? (
                    <div className="row" key={passIndex}>
                      
                      <Link to={this.state.passStatus == "expired"?null:{pathname:`/gym-details-${pass.gym_id}`}} onClick={()=>this.handalePassDetail(pass)}>
                        <div className="col-lg-10 col-10 mx-auto mb-5 passbox" style={{width: '90%'}}>
                        <h4 style={{paddingLeft:10, paddingTop:5,paddingBottom:5, backgroundColor:'#000080'}} >
                          {pass.passDetails.time}{" "}
                          {pass.passDetails.time_format === "day"
                            ? pass.passDetails.time_format
                            : pass.passDetails.time_format === "week"
                            ? pass.passDetails.time_format
                            : pass.passDetails.time_format}
                           {pass.passDetails.time > 1?("'s "):(" ")} Pass
                  <span style={{ paddingRight: 10}} >{pass.status == 'expired'?"Expired on ":"Valid untill "} {pass.status == 'expired'?pass.expirationDate.slice(0,10):null} {pass.status == 'activated'? pass.expirationDate.slice(0,10): null} {pass.status == 'not-activated'? pass.activationLastDate.slice(0,10):  null}</span>
                        </h4>

                        <div className="row" id="user-favorites-b-one">
                          <div className="col-lg-3 neo">
                            <img src={pass.gymDetails.logo} style={{width:150,height:120}}/>
                          </div>
                          <div className="col-lg-1"></div>
                          <div className="col-lg-8">
                            <div className="row">
                              <div className="col-lg-12 neo"  >
                                <h2 style={{fontSize:20,fontWeight:600}}>
                                  {pass.gymDetails.name}
                                  {/* <span>
                                    <i
                                      className="fa fa-heart"
                                      aria-hidden="true"
                                    ></i>
                                  </span> */}
                                </h2>
                                <h5>
                                  <i
                                    className="fa fa-map-marker"
                                    aria-hidden="true"
                                    style={{paddingRight:10}}
                                  ></i>
                                  <span style={{fontSize:16,fontWeight:500}}>{pass.gymDetails.address}</span>
                                </h5>
                              </div>
                            </div>
                          </div>
                        </div>
                        </div>
                      </Link>
                    </div>
                  ) : null
               
              )}
              {this.state.loadMore?
                
              <div style={{marginTop: 10,marginLeft:10,marginBottom:10}}>
                <button style={{height:40,width:100,display:'flex',justifyContent:'center',alignItems:'center',color:'#fff',backgroundColor:'#000080',borderRadius:40}} onClick={()=>this.getPassList(this.state.passItem,this.state.pageLimit)}>Load More</button>
              </div>
               
              : null}
              {this.state.passesList.length > 0?
              null
              :(
              <b
              style={{
                color: "#cccccc",
                display: "flex",
                justifyContent: "center",
                alignSelf: "center",
                fontSize: 16,
                marginTop: 40,
                marginBottom: 30,
              }}
            >
              {this.state.gymCategory} not found!
            </b>
              )
              }
          </div>
        </div>

        {this.state.loader ? <Loader modalToggle={this.state.loader} /> : null}

      </React.Fragment>
    );
  }
}

export default MyPasses;
