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
import circle_one from "../../Images/circle-one.png";
import Modal from "react-bootstrap/Modal";
import { Close } from "react-bytesize-icons";
import Payment_information from "../../Compenents/Comman/Payment_information";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import axios from "axios";
import Api from "../../Url";
import Loader from "../../Compenents/Comman/loader";
import {PRICING, CLOSEUNDERLINE} from '../../Action/type';
import {connect} from 'react-redux';

const user = JSON.parse(localStorage.getItem("userData"));
const userName = user ? user.name.split(" ") : "";

class Pricing extends React.Component {
  constructor() {
    super();
    this.state = {
      modalIsOpen: false,
      SigninModalIsOpen: false,
      // User: user,
      OwlCarousel_items: 2,
      creditsData: [],
      price: 0,
      credit:0,
      scrollPage: '',
      loader: false,
    };
    window.addEventListener("scroll", this.handleScroll.bind(this));
    window.addEventListener("resize", this.getNumberOfColumns.bind(this));
  }

  loaderHandler = () => {
    // console.log(" hello");
    this.setState({ loader: !this.state.loader });
  };

  componentDidMount = async () => {
    this.props.setPricing(1);
    this.getCreditList();
    }

    componentWillUnmount=()=>{
      this.props.setNullUnderLine(1);
    }

    getCreditList=()=>{
      this.loaderHandler();
      axios
              .get(`${Api.API_URL}/list-credit`, {
                  headers: {
                    "Content-Type": "application/json",
                  },
               })
               .then(res => {
                  console.log("Credits",res);
                  if (res.data.response_code == 2000) {
                    const responseData = res.data.response_data.docs;
                    console.log('Credit List response data', responseData);
                    this.setState({creditsData: responseData});
                    this.loaderHandler();
                  } else {
                    console.log('credits Info  ' + res.data.response_message);
                  }
                })
                .catch(error => {
                  console.error(error);
                });
    }
    getNumberOfColumns() {
      window.innerWidth <= 600
        ? this.setState({ OwlCarousel_items: 1 })
        
        : this.setState({ OwlCarousel_items: 2 });
    }
    handleScroll = () => {
      
      let lastScrollY = window.scrollY;
      if (!lastScrollY) {
        
        this.setState({ scrollPage:''});
        // console.log(" Scroll size", window.scrollY);
      } else {
        
      //   if (!this.state.headerStyle) {
          this.setState({scrollPage:'' });
      //   }
        // console.log(" Scroll size", window.scrollY);
      }
    };  
    
  openModal = (price, credit, freeCredit, id) => {
    const user = JSON.parse(localStorage.getItem("userData"));
    let creditId = {creditId: id};
    localStorage.setItem('creditId', JSON.stringify(creditId));
    const Credit = credit + freeCredit;
    console.log("Free credit ",freeCredit,credit, )
    user
      ? user.authtoken
        ? this.setState({ modalIsOpen: true, price , credit: Credit})
        : this.setState({ SigninModalIsOpen: true })
      : this.setState({ SigninModalIsOpen: true });
  };
  modalHandler = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    // const renderuser= JSON.parse(localStorage.getItem('userData'));
    // console.log("render user",renderuser, user,this.state.User);
    return (
      <React.Fragment>
        <div style={{height:80}}></div>
        <div
          className="innnerban Sticky"
          style={{ position: "fixed", top: 0, zIndex: 100 ,backgroundColor: '#000080'}}
        >
          <Headers backgroundColor="#000080" />
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
            <Payment_information price={this.state.price} credit={this.state.credit} onClick={this.modalHandler} />
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


       



        <div className="row" style={{}}>
          <div className="col-lg-12">
            <div className="container" id="pricing-banner">
              <h2
                style={{
                  display: "flex",
                  justifyContent: "left",
                  alignSelf: "left",
                  fontFamily: 'Tahoma',
                  fontWeight: '500'
                }}
              >
                Pricing
              </h2>
              {/* <div class="" id="adjust"> */}
              <OwlCarousel
                  className="owl-theme"
                  loop
                  margi={0}
                  nav
                  items={this.state.OwlCarousel_items}
            >
              {this.state.creditsData.map((item, index) =>(
                <div className="col-lg-12 pad" key={index}>
                

            
            
                  <div className="row" id="box-sadow">
                    <div className="col-lg-4">
                      <img src={circle_one} className="img-fluid" />
                    </div>
                    <div className="col-lg-8">
                      <h3>{item.name}</h3>
                      <h4 style={{color: '#3498DB'}}>
                        <b>${item.price} for {item.credit} Credits</b>
                      </h4>
                      <p>
                      Free {item.free_credit} {item.free_credit<=1?"credit":"credits"}
                      </p>
                      <h5>
                        <a className="row" style={{paddingLeft: 13, cursor: 'pointer'}} onClick={()=>this.openModal(item.price, item.credit, item.free_credit, item._id)}>
                          Get Now -
                          <h5
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignSelf: "left",
                            }}
                          >
                            {">"}
                          </h5>
                        </a>
                      </h5>
                    </div>
                  </div>
            
            
                 </div>
            ))}
            </OwlCarousel>
              {/* </div> */}
            </div>
          </div>
        </div>

        {/* <div
          style={{
            padding: 50,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button
            style={{
              borderRadius: 50,
              width: 100,
              height: 50,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#000000",
              color: "#ffffff",
              fontSize: 16,
              fontWeight: 600,
            }}
            onClick={this.openModal}
          >
            {" "}
            Payment
          </button>
        </div> */}
        <div className="container">
          <div className="row">
            <div
              // className="googleapp allcenter2"
              id="googleAppstore2_container"
            >
              <a href="#">
                <img src={appstore2} />
              </a>
              <a href="#">
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
}

const mapStateToProps = state => {
  // console.log('state',state);
  return {
    
  };
};

const mapPropsToState = dispatch => {
  console.log('dispatch');
  return {
    setPricing: async no => await dispatch({type: PRICING, payload: no}),
    setNullUnderLine: async no => await dispatch({type: CLOSEUNDERLINE, payload: no}),
    
  };
};


export default connect(
  mapStateToProps,
  mapPropsToState,
)(Pricing);
