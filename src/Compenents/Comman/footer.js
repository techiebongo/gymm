/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "../../Utils/style.css";
// import logo from "../../Images/logo.png";
// import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import mail from '../../Images/mail.png';
import call from '../../Images/call.png';
import markar from '../../Images/markar.png';
import Api from "../../Url";
import {connect} from 'react-redux';
import axios from "axios";
import { HOWITWORK, PRICING, SCROLLVIEW, SCROLLCOUNT} from '../../Action/type';
// import {
//     EmailShareButton,
//     FacebookShareButton,
//     InstapaperShareButton,
//     LineShareButton,
//     LinkedinShareButton,
//     LivejournalShareButton,
//     MailruShareButton,
//     OKShareButton,
//     PinterestShareButton,
//     PocketShareButton,
//     RedditShareButton,
//     TelegramShareButton,
//     TumblrShareButton,
//     TwitterShareButton,
//     ViberShareButton,
//     VKShareButton,
//     WhatsappShareButton,
//     WorkplaceShareButton
//   } from "react-share";
  
class Footer extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      isOpen: false,
      howitworkTopScrollStart: 1000,
      pricingTopScrollStart: 1650,
      email: '',
      subscriptionsucess: "",
      adminEmail: '',
      adminPhone: 0,
      locationTitle: '',
     };
    this.timeOutId = null;
    window.addEventListener("resize", this.getNumberOfColumns.bind(this));
  }

  getNumberOfColumns() {
    window.innerWidth <= 397?
    this.setState({
      
      howitworkTopScrollStart: 2530,
      pricingTopScrollStart: 3440
    })
  : window.innerWidth <= 480
      ? this.setState({
          howitworkTopScrollStart: 2530,
          pricingTopScrollStart: 3370
        })
      : window.innerWidth <= 520?
      this.setState({
        
        howitworkTopScrollStart: 2440,
        pricingTopScrollStart: 3280
      })
    : window.innerWidth <= 570
      ? this.setState({
          
          howitworkTopScrollStart: 2370,
          pricingTopScrollStart: 3200
        })
      : window.innerWidth <= 668
      ? this.setState({
          
          howitworkTopScrollStart: 2370,
          pricingTopScrollStart: 3230
        })
      : window.innerWidth <= 768
      ? this.setState({
    
          howitworkTopScrollStart: 2370,
          pricingTopScrollStart: 3280
        })
      : window.innerWidth <= 845
      ? this.setState({
          
          howitworkTopScrollStart: 1670,
          pricingTopScrollStart: 2600
        })
      : window.innerWidth <= 991
      ? this.setState({
         
          howitworkTopScrollStart: 1670,
          pricingTopScrollStart: 2630
        })
      : window.innerWidth <= 1125
      ? this.setState({
          
          howitworkTopScrollStart: 1250,
          pricingTopScrollStart: 2050
        })
      : this.setState({
          
          howitworkTopScrollStart: 1000,
          pricingTopScrollStart: 1800
        });
  }

  componentDidMount=()=>{
    this.getNumberOfColumns();
    this.getSectionStaticData();
  }

  getSectionStaticData=()=>{
    axios
            .get(`${Api.API_URL}/list-admin-contact`, {
                headers: {
                  "Content-Type": "application/json",
                },
             }).then(res=>{
              //  console.log("getSectionStaticData footer",res)
               if(res.data.response_code == 2000){
                   this.setState({adminEmail: res.data.response_data.docs[0].email, adminPhone: res.data.response_data.docs[0].phone_no})
               }
             })
             axios
            .get(`${Api.API_URL}/list-website-content?content_type=footer_section_1`, {
                headers: {
                  "Content-Type": "application/json",
                },
             }).then(res=>{
              //  console.log("footer_section_1",res)
               if(res.data.response_code == 2000){
                   this.setState({ locationTitle: res.data.response_data.docs[0]})
               }
             })
  }

  handleHowItWorkMenu=()=>{
    this.props.setHowItWork(1);
    this.props.setScrollView(this.state.howitworkTopScrollStart); 
    this.props.setScrollCount(1); 
    }
  handlePricingMenu=()=>{
    this.props.setPricing(1);
    this.props.setScrollView(this.state.pricingTopScrollStart); 
    this.props.setScrollCount(1); 
  }

  onClickHandler = () => {
    this.setState((currentState) => ({
      isOpen: !currentState.isOpen,
    }));
  };

  onBlurHandler = () => {
    this.timeOutId = setTimeout(() => {
      this.setState({
        isOpen: false,
      });
    });
  };
  onFocusHandler = () => {
    clearTimeout(this.timeOutId);
  };

  handleChange = (e) => {
  
    this.setState({ [e.target.name]: e.target.value, subscriptionsucess:""});
// console.log("hello", [e.target.name], e.target.value);
};
handleSubmit = (event) => {
if(this.state.email === "") {
  this.setState({
    
    
  });

} else {
  // this.loaderHandler();
  event.preventDefault();

  //alert("lojjjj")
  let object = {
    email: this.state.email,
    zip: this.state.zip
  };
  console.log(object);
  //this.props.getLoginApi(object)
  axios
    .post(
      `${Api.API_URL}/subscribe-email`,
      object,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      // console.log("subscribe data",res);
      if (res.data.response_code === 2000) {
        this.setState({ subscriptionsucess: "subscribe" });
        // console.log(res.data.message, "response data");
        // this.loaderHandler();
      } else if(res.data.response_code === 5002){
        this.setState({ subscriptionsucess: "already subscribe" });
        // this.loaderHandler();
      } else {
        console.log("response error");
        // this.setState({ successMessage: "", fieldError: "" });
        // this.loaderHandler();
      }
    })
    .catch((err) => alert(err.response.data));
    // this.loaderHandler();
}
};


  render() {
    return (
<div>



<div className="footercont">
    <div className="container">
        
            <div className="col-lg-12">
            <div className="row">
                <div className="ftcontact"> 
                    <h5>Contact </h5>
                    <div className="marker1">                       
                        <p> <span className="contactImage_container"><img src={markar} alt="" /></span>{this.state.locationTitle.title}</p>
                    </div>

                    <div className="call1">                       
                        <a style={{fontSize: 16, fontWeight: 500, color: '#2a2a2a'}}> <span><img src={call} alt="" /></span>Call: {this.state.adminPhone}</a>
                    </div>
                    <div className="email1">                       
                        <a style={{fontSize: 16, fontWeight: 500, color: '#2a2a2a'}}> <span><img src={mail} alt="" /></span>Email: {this.state.adminEmail}</a>
                    </div>
                </div>
                <div className="ftabout">
                    <h5> About </h5>
                    <ul>
                        <li><Link to='./find-a-gym' style={{fontSize: 16, fontWeight: 500, color: '#2a2a2a'}}> Find a Gym</Link></li>
                        <li><Link to={{pathname:"/",hash:"howitwork"}} style={{fontSize: 16, fontWeight: 500, color: '#2a2a2a'}}  onClick={()=>this.handleHowItWorkMenu()}> How it Works</Link></li>
                        <li><Link to={{pathname:"/",hash:"pricing"}} style={{fontSize: 16, fontWeight: 500, color: '#2a2a2a'}} onClick={()=>this.handlePricingMenu()}> Pricing</Link></li>
                        <li><Link to='./all-locations' style={{fontSize: 16, fontWeight: 500, color: '#2a2a2a'}}> Locations</Link></li>
                        <li><Link to='./gym-owner' style={{fontSize: 16, fontWeight: 500, color: '#2a2a2a'}}> Gym Owners</Link></li>
                    </ul>             
                </div>
                <div className="ftabout">
                    <h5> Resources </h5>
                    <ul type="none">
                        <li> Help </li>
                        <li> <Link to='./terms-conditions' style={{fontSize: 16, fontWeight: 500, color: '#2a2a2a'}}>  Terms & Conditions </Link></li>
                        <li> <Link to='./privacy-policy' style={{fontSize: 16, fontWeight: 500, color: '#2a2a2a'}}>  Privacy Policy </Link></li>
                        <li><Link to='./blog' style={{fontSize: 16, fontWeight: 500, color: '#2a2a2a'}}> Blog</Link></li>
                        <li><Link to='./contact' style={{fontSize: 16, fontWeight: 500, color: '#2a2a2a'}}> Contact</Link></li>

                    </ul>             
                </div>

                <div className="stayconect">
                    <h5> Stay Conected </h5>
                    <div className="newsletter">
                        <input type="email" placeholder="Enter your email" name='email' onChange={this.handleChange}
                        value={this.state.email} />
                    <div className="row">
                    <input type="submit" value="Submit" id="submit" onClick={this.handleSubmit} />
    <b style={{fontSize: 13, color:"#000080",marginTop:10,marginLeft:10}}>{this.state.subscriptionsucess}</b>
                    </div>
                    </div>
                    <div className="social">
                        <h6>Connect With Us</h6>
                        <ul  className="footer-sociel-icon">
                           <li><a onClick={()=>window.open("https://www.facebook.com/")}><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                           <li><a onClick={()=>window.open("https://www.instagram.com/")}><i className="fa fa-instagram" aria-hidden="true"></i></a></li>
                           <li><a onClick={()=>window.open("https://www.linkedin.com/")}><i className="fa fa-linkedin" aria-hidden="true"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

        <footer className="footermn" id="footer_mainContainer">
        <div className="container">
            <div className="row">
                <div className="col-lg-12" id="copyRight_container">
                    <p className="copyRight"> Copyright ©2020 fittrip.com. All Rights Reserved. </p>
                </div>
            </div>
        </div>
    
    </footer>
    </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log('state',state);
  return {
    
  };
};

const mapPropsToState = dispatch => {
  // console.log('dispatch');
  return {
    
    setHowItWork: async no => await dispatch({type: HOWITWORK, payload: no}),
    setPricing: async no => await dispatch({type: PRICING, payload: no}),
    setScrollView: async no => await dispatch({type: SCROLLVIEW, payload: no}),
    setScrollCount: async no => await dispatch({type: SCROLLCOUNT, payload: no}),
  };
};

export default connect(
  mapStateToProps,
  mapPropsToState,
)(Footer);
