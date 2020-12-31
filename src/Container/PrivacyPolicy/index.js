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
import homeSlide_1 from "../../Images/homeSlide_1.jpg";
import homeSlide_2 from "../../Images/homeSlide_2.jpg";
import homeSlide_3 from "../../Images/homeSlide_3.jpg";
import Axios from "axios";
import Api from "../../Url";
import ReactHtmlParser from 'react-html-parser';
import Loader from '../../Compenents/Comman/loader';
import { connect } from "react-redux";
import { CLOSEUNDERLINE } from "../../Action/type";



class PrivacyPolicy extends React.Component {
  constructor() {
    super();
    this.state = {
      condition: '',
      loader: false,
    };
  }

  loaderHandler = () => {
    // console.log(" hello");
    this.setState({loader: !this.state.loader});
  }

  componentDidMount=()=>{
    this.props.setNullUnderLine(1);
    this.apiCall();
  }
  apiCall=()=>{
    this.loaderHandler();
    Axios.get(`${Api.API_URL}/list-term-condition?content_type=privacy_policy`)
    .then(res=>{
      // console.log("odifuidhofjg======= ",res);
      if(res.data.response_code === 2000){
    this.setState({condition:res.data.response_data[0].description})
      }
      this.loaderHandler();
    });
  }


  render() {
    return (
      <React.Fragment>
        <div style={{height:60}}></div>
        <div
          className="innnerban Sticky"
          style={{ position: "fixed", top: 0, zIndex: 100 ,backgroundColor: '#000080'}}
        >
          <Headers backgroundColor="#000080" />
        </div>


        {/* Privacy Policy */}

        <div className="row">
    <div className="col-lg-12">
      <div className="container" id="privacypolicy-banner">
         <h2>Privacy Policy</h2>
         <div className="">
         { ReactHtmlParser(this.state.condition)}
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

        {this.state.loader?
                 <Loader modalToggle={this.state.loader}/>
                : null }


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

export default connect(mapStateToProps, mapPropsToState)(PrivacyPolicy);
