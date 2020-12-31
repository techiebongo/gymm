/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
import React from 'react';
import Headers from '../../Compenents/Comman/header';
import Footer from '../../Compenents/Comman/footer'
import '../../Utils/style.css';
import gympic1 from '../../Images/gympic1.jpg';
import gympic2 from '../../Images/gympic2.jpg';
import googleplay2 from '../../Images/googleplay2.png';
import appstore2 from '../../Images/appstore2.png';
// import headerImage from '../../Images/inner_banner.png';
import axios from 'axios';
import Loader from '../../Compenents/Comman/loader';
import {GYMOWNER, CLOSEUNDERLINE} from '../../Action/type';
import {connect} from 'react-redux';
import Api from "../../Url";

class GymOwner extends React.Component{

    constructor(){
        super();
        this.state = {
            headerClass: '',
            headerStyle: false,
            fname: '',
            lname: '',
            phone: '',
            email: '',
            gym: '',
            countryNmae: '',
            comment: '',
            fieldError: '',
            error: 'field cannot be blanked',
            successMessage: '',
            loader: false,
            apiCountryData: [],
            token: '',
            firstSectionData: [],
            secondSectionData: [],
            thirdSectionData: [],
            fourthSectionData: [],
            fiveSectionData: [],
        };
        window.addEventListener('scroll', this.handleScroll.bind(this));
    };

    loaderHandler = () => {
        // console.log(" hello");
        this.setState({loader: !this.state.loader});
      }
  
    componentDidMount = () => {
        this.handleScroll();
        this.props.setGymOwner(1);
        // this.loaderHandler();
        this.getCountryStateCity_token();
        this.getSectionStaticData();
        // this.loaderHandler();
    }

    getSectionStaticData=()=>{
      axios
              .get(`${Api.API_URL}/list-website-content?content_type=gym_owner_section_1`, {
                  headers: {
                    "Content-Type": "application/json",
                  },
               }).then(res=>{
                //  console.log("gymOwner_page_section_1 ===",res)
                 if(res.data.response_code == 2000){
                  this.setState({firstSectionData: res.data.response_data.docs[0]})
                 }
               })
  
               axios
              .get(`${Api.API_URL}/list-website-content?content_type=gym_owner_section_2`, {
                  headers: {
                    "Content-Type": "application/json",
                  },
               }).then(res=>{
                //  console.log("gymOwner_page_section_2 ===",res)
                 if(res.data.response_code == 2000){
                  this.setState({secondSectionData: res.data.response_data.docs})
                 }
               })
  
               axios
              .get(`${Api.API_URL}/list-website-content?content_type=gym_owner_section_3`, {
                  headers: {
                    "Content-Type": "application/json",
                  },
               }).then(res=>{
                //  console.log("gymOwner_page_section_3 ===",res)
                 if(res.data.response_code == 2000){
                  this.setState({thirdSectionData: res.data.response_data.docs[0]})
                 }
               })
  
               axios
              .get(`${Api.API_URL}/list-website-content?content_type=gym_owner_section_4`, {
                  headers: {
                    "Content-Type": "application/json",
                  },
               }).then(res=>{
                //  console.log("gymOwner_page_section_4 ===",res)
                 if(res.data.response_code == 2000){
                  this.setState({fourthSectionData: res.data.response_data.docs[0]})
                 }
               })

               axios
               .get(`${Api.API_URL}/list-website-content?content_type=gym_owner_section_5`, {
                   headers: {
                     "Content-Type": "application/json",
                   },
                }).then(res=>{
                  // console.log("gym_owner_section_5 ===",res)
                  if(res.data.response_code == 2000){
                   this.setState({fiveSectionData: res.data.response_data.docs[0]})
                  }
                })
    }

    getCountryStateCity_token=()=>{
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

    handleSubmit = (event) => {
        
        if(this.state.fname === '' && this.state.lname === '' && this.state.email === '' && this.state.phone === '' && this.state.comment === '' && this.state.gym === '' && this.state.partnerType === '')
        {
          // console.log(" enter");
          this.setState({fieldError: 'Fields cannot be blanked', successMessage: ''});
        } else if(this.state.fname === ''){
          this.setState({fieldError: `First Name ${this.state.error}`, successMessage: ''});
        } else if(this.state.lname === ''){
          this.setState({fieldError: `Last Name ${this.state.error}`, successMessage: ''});
        } else if(this.state.email === ''){
          this.setState({fieldError: `Email ${this.state.error}`, successMessage: ''});
        } else if(this.state.phone === ''){
            this.setState({fieldError: `Phone Number ${this.state.error}`, successMessage: ''});
        } else if(this.state.gym === ''){
            this.setState({fieldError: `Gym Name ${this.state.error}`, successMessage: ''});
        } else if(this.state.countryName === ''){
            this.setState({fieldError: "Select Partner Type field", successMessage: ''});
        } else if(this.state.comment === ''){
            this.setState({fieldError: `Comment ${this.state.error}`, successMessage: ''});
        } else {
            this.loaderHandler();
        event.preventDefault()
        
        //alert("lojjjj")
        let object = { firstName: this.state.fname, lastName: this.state.lname, email: this.state.email, phone: this.state.phone, message: this.state.comment, GymGroupName: this.state.gym, country: this.state.countryName }
        // console.log(object);
        //this.props.getLoginApi(object)
        axios.post(`https://nodeserver.mydevfactory.com:1436/api/gymowner-contact-admin`, object, {headers: {
          'Content-Type': 'application/json',
         }})
        .then(res=> {
          // console.log(res);
          if (res.data.response_code === 2000) {
            this.setState({successMessage: res.data.message, fieldError: ''});
          // console.log(res.data.message, 'response data');
          this.loaderHandler();
        } else {
          console.log("response error");
          this.setState({successMessage: '', fieldError: ''});
          this.loaderHandler();
        }
        })
        .catch(err=>alert(err.response.data));
        this.loaderHandler();
       }
      }

      handleChange = (e) => {
        this.setState({[e.target.name]:e.target.value});
        // console.log('hello',[e.target.name], e.target.value);
      };

      handleActivities = (e) => {
        // console.log(" select  ", e.currentTarget.value);
        this.setState({ partnerType: e.target.value });
      };

    handleScroll = () => {
        let headerClass ={};
        let lastScrollY = window.scrollY;
             if(!lastScrollY){
                headerClass = '';
                this.setState({headerClass, headerStyle: false});
                // console.log(" Scroll size", window.scrollY);
             } else {
                headerClass = 'headerImage';
                // if(!this.state.headerStyle){
                this.setState({headerClass, headerStyle: true});
                // }
                // console.log(" Scroll size", window.scrollY);
             }

        }

        handleCountryNmae = (e) => {
            let countryName = "";
            // if(e.currentTarget.value != null){
           
              countryName = e.currentTarget.value;
              // console.log("country name", countryName);
              
            this.setState({ countryNmae: countryName });
            // }
          };
      
    componentWillUnmount() {
        this.props.setNullUnderLine(1);
        window.removeEventListener('scroll', this.handleScroll);
      }

    
  render(){
    let headerStyle ={};
   
        if(this.state.headerStyle){
         headerStyle ={
                position: 'sticky',
                top: 0,
                // zIndex: 100,
                width: '100%',
            }
        } else {
            headerStyle = {}
        }

        // console.log("data value === ",this.state.thirdSectionData.points)
    
      return(
          <React.Fragment>
            <div className="bannermn gymowner" style={{zIndex: 100}}>
              {this.state.headerStyle?
              <div className='Sticky innnerban' style={{backgroundColor:'#000080',opacity:.85,}}>
              <Headers  backgroundColor='#000080' />
            </div>
            : null }
              
              {!this.state.headerStyle?
               <div className='Sticky innnerban'>
              <Headers  backgroundColor='' />
              </div>
            : null }
                <div className="container">
                    <div className="row">
                         <div className="col-lg-12">
                       
                            <div className="gymow">
                                <h1>{this.state.firstSectionData.title}</h1>
                                <h3>{this.state.firstSectionData.sub_title} </h3>


                            </div>
                            <div className="livcountry">
                                <ul>
                                  {this.state.secondSectionData.map((sectionitem, sectionIndex)=>(
                                    <li key={sectionIndex}>{sectionitem.title}</li>
                                  ))}
                                    {/* <li>Users from more than 140 nationalities</li>
                                    <li>More than 1300 gyms worldwide</li> */}
                                </ul>
                             </div>
                       

                    
                    </div>
                  
                </div>
            </div>
    </div>
{/* <!-- head section end --> */}


<div className="gymownbdy">
    <div style={{backgroundColor: '#F7F9F9', paddingTop: 150}}>
    <div className="container">
        <div className="row">
            <div className="col-lg-7">
                <div className="lefttextgym">
                    <h3>{this.state.thirdSectionData.title}</h3>
                    {this.state.thirdSectionData.points &&
                    this.state.thirdSectionData.points.map((point, pointIndex) => (
                    <p key={pointIndex}>{point.point}</p>
                    ))
                  }
                </div>
            </div>
            <div className="col-lg-5">
                <div className="picleft">
                    <img src={this.state.thirdSectionData.image} alt="" />
                    
                </div>
            </div>
        </div>
        </div>
        </div>
        <div className="container" style={{paddingTop: 150}}>
        <div className="row">
            <div className="col-lg-5">
                <div className="picleft2">
                    <img src={this.state.fourthSectionData.image} alt="" />
                    
                </div>
            </div>
            <div className="col-lg-7">
                <div className="lefttextgym2">
                    <h3>{this.state.fourthSectionData.title}</h3>
                    <p>{this.state.fourthSectionData.description}</p>
                    {this.state.fourthSectionData.points2 && this.state.fourthSectionData.points2.map((point, pointIndex)=>(
                      <div key={pointIndex}>
                    <p ><span>{point.heading} </span></p>
                    <p>{point.para}</p>
                    </div>
                    ))}
                    {/* <p><span>Improve data collection & member lead generation</span></p>
                    <p>Avaid manual data collection and get insights on nationality, number of visits and member potential.</p>
                    <p><span>Help your members when thay travel</span></p>
                    <p>Lower churn by providing your members with access to a worldwide network of gyms when they travel.</p>
                    <p><span>Free brand exposure</span></p>
                    <p>We put your brand in front of thousands of active travelers and potential new mmembers</p> */}
                </div>
            </div>
        </div>
    </div>
</div>

{/* <!--  solution section  --> */}
<div className="solutionmn">
    <div className="container">
        <div className="row">
            <div className="col-lg-10 offset-lg-1">
                <h3>{this.state.fiveSectionData.title}</h3>
                  <h4>{this.state.fiveSectionData.sub_title}</h4>
                <p>{this.state.fiveSectionData.description}</p>
                <h5>{this.state.fiveSectionData.sub_title2}</h5>
                {this.state.fiveSectionData.points && this.state.fiveSectionData.points.map((point, pointIndex)=>(
                <p key={pointIndex}>{point.point}</p>
                ))}
                {/* <p>No need for IT system integration</p>
                <p>TrainAway handles all administration</p>
                <p>Free promotion on the worl's biggest gym network for travelers</p> */}
                <a className="btn"> Join Now </a>     
            </div>
        </div>
    </div>
</div>


{/* <!-- solution section end --> */}


{/* <!--  contact us  --> */}


<div className="contusmn">
    <div className="container">
        <div className="row">
            <div className="col-lg-10 offset-lg-1 col-md-12">
              <div className="continn">
                <h4> Contact us for more information </h4>
                <p> Send your information and a manager will contact you within 48 hours </p>

                <input type="text" name="fname" placeholder="First Name" onChange={this.handleChange} value={this.state.fname} />
                
                <input type="text" name="lname" placeholder="Last Name" onChange={this.handleChange} value={this.state.lname} />
                
                <input type="tel" name="phone" placeholder="Phone" onChange={this.handleChange} value={this.state.phone} />
                
                <input type="email" name="email" placeholder="Email" onChange={this.handleChange} value={this.state.email} />
                
                <input type="text" name="gym" placeholder="Gym Name" onChange={this.handleChange} value={this.state.gym} />

                <select 
                  style={{color: '#616A6B', fontSize: 16}}
                  onChange={this.handleCountryNmae}
                  value={this.state.countryName}
                >
                    <option value=''>Select Country</option>
                    {this.state.apiCountryData && this.state.apiCountryData.map((country, countryItem)=>(
                        <option key={countryItem} value={country.country_name}>{country.country_name}</option>
                    ))}
                </select>

                {/* <input type="text" name="Gym" placeholder="Gym Address" />
                <input type="text" name="city" placeholder="City" />
                <input type="text" name="country" placeholder="Country" /> */}

                <textarea name="comment" placeholder="Type Your Comment" onChange={this.handleChange} value={this.state.comment} ></textarea>

                <span id='contactErrorText' ><b style={{color: 'red', fontSize: 16, paddingLeft: 30, paddingBottom: 30}}>{this.state.fieldError}</b></span><br/>
                <span id='contactErrorText' ><b style={{color: 'green', fontSize: 16, paddingLeft: 30, paddingBottom: 30}}>{this.state.successMessage}</b></span><br/>
                {this.state.loader?
                 <Loader modalToggle={this.state.loader}/>
              : null }        
                <div className="submitgym">
                    <input type="submit" value="Submit"  onClick={this.handleSubmit} />
                </div>
              </div>
            </div>
        </div>
    </div>
</div>


<div className="container">
    <div className="row">
        <div 
        // className="googleapp allcenter2"  
        id="googleAppstore2_container">
            <a><img src={appstore2} /></a>
            <a><img src={googleplay2} /></a>
        </div>
    </div>
</div>

              <Footer/>
          </React.Fragment>
      );
  }
};

const mapStateToProps = state => {
    // console.log('state',state);
    return {
      
    };
  };
  
  const mapPropsToState = dispatch => {
    // console.log('dispatch');
    return {
      setGymOwner: async no => await dispatch({type: GYMOWNER, payload: no}),
      setNullUnderLine: async no => await dispatch({type: CLOSEUNDERLINE, payload: no}),
      
    };
  };
  
  
  export default connect(
    mapStateToProps,
    mapPropsToState,
  )(GymOwner);