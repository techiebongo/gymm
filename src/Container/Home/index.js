/* eslint-disable react/jsx-pascal-case */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-undef */
import React from "react";
import Headers from "../../Compenents/Comman/header";
// import googleplay from '../../Images/googleplay.png'
// import appstore from '../../Images/appstore.png'
import Footer from "../../Compenents/Comman/footer";
import "../../Utils/style.css";
import icon1 from "../../Images/icon1.png";
import icon2 from "../../Images/icon2.png";
import icon3 from "../../Images/icon3.png";
import icon4 from "../../Images/icon4.png";
import icon5 from "../../Images/icon5.png";
import icon6 from "../../Images/icon6.png";
import icon7 from "../../Images/icon7.png";
import icon8 from "../../Images/icon8.png";
import mobilegrp from "../../Images/mobilegrp.png";
import download from "../../Images/download.png";
import search from "../../Images/search.png";
import access from "../../Images/access.png";
import workout from "../../Images/workout.png";
import googleplay2 from "../../Images/googleplay2.png";
import appstore2 from "../../Images/appstore2.png";
import homeSlide_1 from "../../Images/homeSlide_1.jpg";
import homeSlide_2 from "../../Images/homeSlide_2.jpg";
import homeSlide_3 from "../../Images/homeSlide_3.jpg";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import axios from "axios";
import Api from "../../Url";
import Modal from "react-bootstrap/Modal";
import { Close } from "react-bytesize-icons";
import Payment_information from "../../Compenents/Comman/Payment_information";
import { Link } from "react-router-dom";
import {HOWITWORK, HOME, PRICING, CLOSEUNDERLINE, SCROLLVIEW, SCROLLCOUNT} from '../../Action/type';
import {connect} from 'react-redux';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import Signin from "../../Compenents/Comman/signin";
import Signup from "../../Compenents/Comman/signup";
import Forgot from "../../Compenents/Comman/forgot-password";

const slideImages = [
  homeSlide_1,
  homeSlide_2,
  homeSlide_3
];
let scrollCount =0;

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      OwlCarousel_items: 3,
      headerClass: "",
      headerStyle: false,
      blogData: [],
      creditsData: [],
      modalIsOpen: false,
      SigninModalIsOpen: false,
      // User: user,
      creditPrice: 0,
      creditQuantity: 0,
      credintialModalIsOpen: false,
      signinModal: false,
      signupModal: false,
      forgotModal: false,
      firstSectionData: [],
      secondSectionData: [],
      thirdSectionData: [],
      fourthSectionData: [],
      fifthSectionData: [],
      isCallScroll: true,
    };
    window.addEventListener("resize", this.getNumberOfColumns.bind(this));
    window.addEventListener("scroll", this.handleScroll.bind(this));
  }

  openModal = (creditPrice, creditQuantity, freeCredit, id) => {
    const user= JSON.parse(localStorage.getItem('userData'));
    let creditId = {creditId: id};
    localStorage.setItem('creditId', JSON.stringify(creditId));
    user?
    user.authtoken?
    this.setState({ modalIsOpen: true, creditPrice, creditQuantity: freeCredit + creditQuantity})
    : this.setState({credintialModalIsOpen: true,signupModal:true})
    : this.setState({credintialModalIsOpen: true,signupModal:true})
  };
  modalHandler = () => {
    this.setState({ modalIsOpen: false });
  };

  getNumberOfColumns() {
    window.innerWidth <= 570
      ? this.setState({ OwlCarousel_items: 1 })
      : window.innerWidth <= 991
      ? this.setState({ OwlCarousel_items: 2 })
      : this.setState({ OwlCarousel_items: 3 });
  }

  handleScroll = () => {
    let headerClass = {};
    let lastScrollY = window.scrollY;
    
    if (!lastScrollY) {
      headerClass = "";
      this.setState({ headerClass, headerStyle: false });
      // console.log(" Scroll size", window.scrollY);
    } else {
      headerClass = "headerImage";
    //   if (!this.state.headerStyle) {
        this.setState({ headerClass, headerStyle: true });
    //   }
      // console.log(" Scroll size", window.scrollY);
    }
  };

  componentDidMount() {
    // window.scrollTo({
    //   top: this.props.scrollView,

    //   behavior: "smooth"
    // });
    if(this.props.location.hash){
      this.refs[this.props.location.hash].scrollIntoView();
    }
    
    if(this.props.location.hash == '#howitwork'){
    this.props.setHowItWork(1);
    
    }
    if(this.props.location.hash == '#pricing'){
      this.props.setPricing(1);
      
      }
      if(this.props.location.hash == '#home'){
        this.props.setHome(1);
        
      }
    
    this.getNumberOfColumns();

    // this.handleScroll();
    this.getSingleCategory();
    this.getCreditList();
    this.getSectionStaticData();
  }

  getSectionStaticData=()=>{
    axios
            .get(`${Api.API_URL}/list-website-content?content_type=home_page_section_1`, {
                headers: {
                  "Content-Type": "application/json",
                },
             }).then(res=>{
              //  console.log("home_page_section_1 ===",res)
               if(res.data.response_code == 2000){
                  this.setState({firstSectionData: res.data.response_data.docs})
               }
             })

             axios
            .get(`${Api.API_URL}/list-website-content?content_type=home_page_section_2`, {
                headers: {
                  "Content-Type": "application/json",
                },
             }).then(res=>{
              //  console.log("home_page_section_2 ===",res)
               if(res.data.response_code == 2000){
                  this.setState({secondSectionData: res.data.response_data.docs})
               }
             })

             axios
            .get(`${Api.API_URL}/list-website-content?content_type=home_page_section_3`, {
                headers: {
                  "Content-Type": "application/json",
                },
             }).then(res=>{
              //  console.log("home_page_section_3 ===",res)
               if(res.data.response_code == 2000){
                  this.setState({thirdSectionData: res.data.response_data.docs})
               }
             })

             axios
            .get(`${Api.API_URL}/list-website-content?content_type=home_page_section_4`, {
                headers: {
                  "Content-Type": "application/json",
                },
             }).then(res=>{
              //  console.log("home_page_section_4 ===",res)
               if(res.data.response_code == 2000){
                  this.setState({fourthSectionData: res.data.response_data.docs[0]})
               }
             })
             axios
             .get(`${Api.API_URL}/list-website-content?content_type=home_page_section_5`, {
                 headers: {
                   "Content-Type": "application/json",
                 },
              }).then(res=>{
                // console.log("home_page_section_5 ===",res)
                if(res.data.response_code == 2000){
                   this.setState({fifthSectionData: res.data.response_data.docs[0]})
                }
              })
      //         setTimeout(() => {
      //   this.props.setScrollView(0);
      //   this.setState({isCallScroll: true})
      //   console.log('2. This will run after 2 second!')
      // }, 2000);
  }

  getCreditList=()=>{
    axios
            .get(`${Api.API_URL}/list-credit`, {
                headers: {
                  "Content-Type": "application/json",
                },
             })
             .then(res => {
                // console.log("Credits",res);
                if (res.data.response_code == 2000) {
                  const responseData = res.data.response_data.docs;
                  // console.log('Credit List response data', responseData);
                  this.setState({creditsData: responseData});
                  
                } else {
                  console.log('credits Info  ' + res.data.response_message);
                }
              })
              .catch(error => {
                console.error(error);
              });
    
  }

  getSingleCategory = () => {
    axios
      .get(`${Api.API_URL}/list-blog`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // console.log("single category", res);
        if (res.data.response_code === 2000) {
          const responseData = res.data.response_data.docs;

          // console.log("single category response data", responseData);
          this.setState({ blogData: responseData });
        } else {
          console.log("single category Info  " + res.data.response_message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  
  modalHandel = (text) => {
    if (text === "signin") {
      this.setState({
        credintialModalIsOpen: true,
        signinModal: true,
        signupModal: false,
        forgotModal: false,
      });
    } else if (text === "signup") {
      this.setState({
        credintialModalIsOpen: true,
        signinModal: false,
        signupModal: true,
        forgotModal: false,
      });
    } else if (text === "forgot") {
      this.setState({
        credintialModalIsOpen: true,
        signinModal: false,
        signupModal: false,
        forgotModal: true,
      });
    }
  };

  
  SuccessLogin = () => {
    //   alert("enter into =====");
    this.props.history.push({
      pathname: "/find-a-gym",
    });
  }
  handleSigninCheck=()=>{
    const user= JSON.parse(localStorage.getItem("userData"));
    if (user){
      this.SuccessLogin();
    } else {
      this.setState({credintialModalIsOpen: true, signupModal: true})
    }
  }

  componentWillUnmount() {
    this.props.setNullUnderLine(1);
    window.removeEventListener("scroll", this.handleScroll);
  }
  render() {
    // window.scrollTo({
    //   top: this.props.scrollView,

    //   behavior: "smooth"
    // });
    if(this.props.scrollView){
    const element = document.getElementById(this.props.location.hash);
      if (element) element.scrollIntoView();
      // if (this.state.isCallScroll){
      this.props.setScrollView(0);
      // }
    } else if(!this.props.scrollCount) {
      window.scrollTo(0, this.props.scrollView);
      this.props.setScrollView(0);
      this.props.setScrollCount(1);
    }

    // const element = document.getElementById(this.props.location.hash);
    //   if (element) element.scrollIntoView();
    //   this.props.setScrollView(0);
     
    let headerStyle = {};

    if (this.state.headerStyle) {
      headerStyle = {
        position: "fixed",
        top: 0,
        zIndex: 33,
        width: '100%',
        
      };
    } else {
      headerStyle = {};
    }

    let blogData = this.state.blogData;
    let active = 'active';
      // console.log("kjjhuahcooi === ",this.refs);

    return (
      <React.Fragment>
        {this.state.headerStyle ? (
          
          
          <div className='Sticky innnerban' style={headerStyle,{backgroundColor:'#000080',opacity:.85}}>
            <Headers backgroundColor="#000080" />
          </div>
          
        ) : null} 

{!this.state.headerStyle ?<div className='Sticky ' style={{width:'100%',position:'absolute',top:0}}> <Headers backgroundColor="" /> </div> : null}

<div className=" " style={{ backgroundColor: "" ,position:'absolute',top:100, left:'5%',zIndex:11}}>
          
          <div className="container" id="firstcontainer_field">
            <div className="row">
              <div className="bannertxt">
                <h1 className="visitor-exprt-text">
                  Visitors. <br />
                  Business Travellers.
                  <br /> Tourists.
                  <br /> Exparts.
                </h1>
                <h3>Access gyms anywhere in the world.</h3>
              </div>
              <div className="googleapp">
                <a>
                  <img
                    src={googleplay2}
                    style={{
                      width: 180,
                      height: 60,
                      marginRight: 20,
                      marginBottom: 10,
                    }}
                  />
                </a>
                <a>
                  <img src={appstore2} style={{ width: 180, height: 60 }} />
                </a>
              </div>
              <div style={{display: 'flex',justifyContent: 'center',alignItems:'center',width:'100%'}}>
              <div className='training-container' onClick={this.handleSigninCheck} style={{cursor: 'pointer'}}>
              <h4>Let’s get training! </h4>
              </div>
              </div>
            </div>
          </div>
        </div>

<div className="slide-container" style={{borderRadius:50}} ref='#home'>
        <Slide >  
          <div className="each-slide" style={{borderRadius:0}}>
            {/* <div style={{'backgroundImage': `url(${slideImages[0]})`, height:600}} > */}
            <img src={slideImages[0]} style={{borderRadius: 0}} className='homeSliderImage'/>
          
            </div>
          {/* </div> */}
          <div className="each-slide" style={{borderRadius:0}}>
            {/* <div style={{'backgroundImage': `url(${slideImages[1]})`, height:600}}> */}
            <img src={slideImages[1]} style={{borderRadius:0}} className='homeSliderImage' />

          
            </div>
          {/* </div> */}
          <div className="each-slide">
            {/* <div style={{'backgroundImage': `url(${slideImages[2]})`, height:600}}> */}
            <img src={slideImages[2]} style={{borderRadius:0}} className='homeSliderImage'/>
              
          
            {/* </div> */}
          </div>
        </Slide>
      </div>

        {/* descript details contant -------------------------------  */}

        <div className="iconmn" style={{ backgroundColor: "#FBFCFC" }}>
          <div className="container">
            <div className="row">
              {this.state.firstSectionData.map((sectionitem, sectionIndex)=>(
              <div className="col-lg-4" key={sectionIndex}>
                <div className="icon_box">
                  <img src={sectionitem.image} alt="icon" />
                  <h4>{sectionitem.title}</h4>
                  <p>
                    {sectionitem.sub_title}
                  </p>
                </div>
              </div>
             ))}
              {/* <div className="col-lg-4">
                <div className="icon_box">
                  <img src={icon2} alt="icon" />
                  <h4>Borderless</h4>
                  <p>
                    Contrary to popular belief, Lorem is not simply random text.
                  </p>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="icon_box">
                  <img src={icon3} alt="icon" />
                  <h4>Fitness</h4>
                  <p>
                    Contrary to popular belief, Lorem is not simply random text.
                  </p>
                </div>
              </div> */}

            </div>
          </div>
        </div>

        {/* Gyms veriantion details field ----------------------- */}

        <div className="locationrow" style={{ backgroundColor: "#FBFCFC" }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                {this.state.secondSectionData.map((sectionitem, sectionIndex)=>(
                <div className="iconBox2" key={sectionIndex}>
                  <img src={sectionitem.image} alt="icon" />
                  <h5>{sectionitem.title}</h5>
                  <p>{sectionitem.sub_title}</p>
                </div>
               ))}
                {/* <div className="iconBox2">
                  <img src={icon5} alt="icon" />
                  <h5>Topp Fitness</h5>
                  <p>Clubs Brands</p>
                </div>
                <div className="iconBox2">
                  <img src={icon6} alt="icon" />
                  <h5>10 Credits - 100$</h5>
                  <p>Credits</p>
                </div>
                <div className="iconBox2">
                  <img src={icon7} alt="icon" />
                  <h5>Flexible Day</h5>
                  <p>& Week Passes</p>
                </div>
                <div className="iconBox2">
                  <img src={icon8} alt="icon" />
                  <h5>Easy</h5>
                  <p>Access</p>
                </div> */}


              </div>
            </div>
          </div>
        </div>

        {/* How it Work field ------------------------------ */}
        <div id='#howitwork' ref='#howitwork'>
        <div className="howitwork" style={{ backgroundColor: "#FBFCFC" }}>
          <div className="container">
            <div className="col-lg-12" id="howitwork-textcontainer">
              <h3 id="work-text" className="howit-work">
                How it Works
              </h3>
              {/* <h5>Download Fit Trip App</h5> */}
            </div>

            <div className="howitImages">
              <img src={mobilegrp} alt="" />
            </div>

            <div
              className="col-lg-12 pt-4 pb-4 mb-2"
              style={{ display: 'flex',justifyContent: 'center',alignItems:'center', backgroundColor:'#F4F6F7', borderRadius:30 }}
            >
              <div className="row" >
              {this.state.thirdSectionData.map((sectionitem, sectionIndex)=>(
                <div className="col-lg-3 " style={{ textAlign: 'center'}} key={sectionIndex}>
                <div className="howitbox1">
                <div className="hwleft2">
                    <h5>
                      <span>
                        <img src={sectionitem.image} alt="" />
                      </span>{" "}
                      {sectionitem.title}
                    </h5>
                    <p>
                    {sectionitem.sub_title}
                    </p>
                  </div>
                </div>
                </div>
              ))}
                {/* <div className="col-lg-3">
                <div className="howitbox1">
                  <div className="hwleft2">
                    <h5>
                      <span>
                        <img src={search} alt="" />
                      </span>{" "}
                      Search for Any Fitness Club
                    </h5>
                    <p>
                      Search for fitness club around you or at your future
                      destinetion.
                    </p>
                  </div>
                </div>
                </div>
                <div className="col-lg-3">
                <div className="howitbox1">
                  <div className="hwleft2">
                    <h5>
                      <span>
                        <img src={access} alt="" />
                      </span>
                      Access
                    </h5>
                    <p>Book a day or week pass directly through FitTrip App</p>
                  </div>
                </div>
                </div>
                <div className="col-lg-3">
                <div className="howitbox1">
                  <div className="hwleft2">
                    <h5>
                      <span>
                        <img src={workout} alt="" />
                      </span>{" "}
                      Workout
                    </h5>
                    <p>
                      Show your Pass at the fitnes club and enjoy your training
                    </p>
                  </div>
                </div>
                </div> */}



              </div>
            </div>
          </div>
        </div>
        </div>

        {/* Google and App Store Icon field ---------------------------- */}
        <div className="container">
          <div className="row">
            <div 
            // className="googleapp allcenter2" 
            id="googleAppstore2_container">
              <a>
                <img src={googleplay2} />
              </a>
              <a>
                <img src={appstore2} />
              </a>
            </div>
          </div>
        </div>
        
        {/* Subscriptions field --------------------------- */}
        <div  id='#pricing' ref='#pricing'>
        <div className="ourfactmn">
          <div className="container">
            <div className="row">
              <div className="col-lg-12" id="simpleText-container">
                <h3 id="simple_text">{this.state.fourthSectionData.title}</h3>
                <p id="chooseTraveler_text">
                {this.state.fourthSectionData.sub_title}
                </p>
              </div>
            </div>
            </div>
            {/* <OwlCarousel
                  className="owl-theme"
                  loop
                  margi={0}
                  nav
                  items={this.state.OwlCarousel_items}
            > */}
            <div className='creditPlanBox_container'>
            <div className='creditPlanBox '>
            <div className="row mt-3"  style={{display: 'flex',justifyContent:'center',alignItems:'center', marginRight:10,marginLeft:10}}>
            
            {this.state.creditsData.map((item, index) =>(
                
              <div className= {index===0?active:null} key={index}>
                <div className="factbox ">
                  <div className="dolbox">
                    <h3>
                    {item.name}
                      
                    </h3>
                    <p style={{color: !item.free_credit? "#fff": ""}}>
                    {item.free_credit?(
                      <>
                    Free {item.free_credit} {item.free_credit<=1?"credit":"credits"}
                    </>
                    ):("fgdfhfgj")}
                    </p>
                  </div>
                  <div className="facttextbox">
                  <p><span>${item.price}{" "}</span> for {item.credit} Credits </p>
                    
                    <div className="btn bttn1"  onClick={()=>this.openModal(item.price, item.credit, item.free_credit, item._id)}>
                      Try Now
                    </div>
                  </div>
                </div>
              </div>
              ))}
            </div>
            {/* </OwlCarousel> */}
          </div>
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
            <Payment_information  price={this.state.creditPrice} credit={this.state.creditQuantity} onClick={this.modalHandler} />
          </Modal>
        </div>


        <div>
          <Modal show={this.state.SigninModalIsOpen} dialogClassName="modal-90w">
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


        {/* Blog Section filed ----------------- */}

        <div className="ourblogmn">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h1>{this.state.fifthSectionData.title}</h1>
                <h3>
                  {this.state.fifthSectionData.sub_title}
                </h3>
                <p>
                {this.state.fifthSectionData.description}
                </p>
              </div>
              <div className="col-lg-12 blogslide">
                {/* <div id="ourblog" class="owl-carousel owl-theme owl-loaded owl-drag">
                    <div class="owl-stage-outer">
                    <div class="owl-stage">     */}
               
                <OwlCarousel
                  className="owl-theme"
                  loop
                  margi={0}
                  
                  dots={false}
                  items={this.state.OwlCarousel_items}
                >
                  {/* {console.log("kldjflskfjsk   ", blogData)} */}

                  {blogData.map((item, index) => (
                    <React.Fragment key={index}>
                      {/* {console.log(" jlkfd")} */}
                      <div className="item" style={{ margin: 10 }}>
                        <div className="slideBox">
                          <img
                            src={item.image}
                            alt=""
                            style={{ maxHeight: 230 }}
                          />
                          <h5>{item.title.slice(0, 40)}</h5>
                          <h6>
                            By: <span> Admin,</span>{" "}
                            {item.createdAt.substring(0, 10)}
                          </h6>
                          <p>{item.description.slice(0, 150)}</p>
                          <Link
                            to={{
                              pathname: `/blog-description-${item._id}`,
                              state: {
                                data: item,
                              },
                            }}
                          >
                            Read More
                          </Link> 
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                  
                </OwlCarousel>
              </div>
            </div>
          </div>
        </div>

        {/* Credintial Modal ---------------------------------------- */}

        <div className="container">
          <Modal
            show={this.state.credintialModalIsOpen}
            // onHide={() => setShow(false)}
            dialogClassName="modal-90w"

            // aria-labelledby="example-custom-modal-styling-title"
          >
            <div
              onClick={() => this.setState({ credintialModalIsOpen: false })}
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


        <div className="container">
          <div className="row">
            <div 
            // className="googleapp allcenter2" 
            id="googleAppstore2_container">
              <a>
                <img src={googleplay2} />
              </a>
              <a>
                <img src={appstore2} />
              </a>
            </div>
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  // console.log('state',state);
  return {
    scrollView: state.underLineReducer.scrollView,
    home: state.underLineReducer.home,
    scrollCount: state.underLineReducer.scrollCount,
  };
};

const mapPropsToState = dispatch => {
  // console.log('dispatch');
  return {
    setHome: async no => await dispatch({type: HOME, payload: no}),
    setHowItWork: async no => await dispatch({type: HOWITWORK, payload: no}),
    setPricing: async no => await dispatch({type: PRICING, payload: no}),
    setNullUnderLine: async no => await dispatch({type: CLOSEUNDERLINE, payload: no}),
    setScrollView: async no => await dispatch({type: SCROLLVIEW, payload: no}),
    setScrollCount: async no => await dispatch({type: SCROLLCOUNT, payload: no}),
  };
};


export default connect(
  mapStateToProps,
  mapPropsToState,
)(Home);
