/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import '../../Utils/style.css';
import '../../Utils/profileSection_style.css';
import ImageUploader from 'react-images-upload';
import Loader from "../Comman/loader";
import ModernDatepicker from 'react-modern-datepicker';
import axios from "axios";
import Api from "../../Url";
import Forgot from '../Comman/forgot-password';
import { Menu, Close } from "react-bytesize-icons";
import Modal from "react-bootstrap/Modal";
import {connect} from 'react-redux';
import {URL} from '../../Action/type';

class EditProfile extends React.Component {
    state = {
        startDate: '',
        user: JSON.parse(localStorage.getItem("userData")),
        modalIsOpen: false,
        fname: '',
        lname: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        country: "",
        profileImage: '',
        profileName: '',
        fnameError: '',
        lnameError: '',
        emailError: '',
        phoneError: '',
        addressError: '',
        cityError: '',
        stateError: '',
        countryError: '',
        dateError: '',
        result: '',
        pictures: [],
        loader: false,
        token: '',
        apiCountryData: [],
        apiStateData: [],
        apiCityData: [],
      };

      loaderHandler = () => {
        // console.log(" hello");
        this.setState({ loader: !this.state.loader });
      };
    

      componentDidMount=async()=>{
        await this.viewUserProfile();
      }

      viewUserProfile = () => {
        this.loaderHandler();
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
                let name = responseData.name.split(" ");
                let phone = responseData.phone_no;
                let dob = responseData.dob === null?'':responseData.dob;
                  this.setState({fname:name[0],lname:name[1],email:responseData.email,phone,address:responseData.address, city: responseData.city, state:responseData.state, country:responseData.country,profileImage:responseData.profile_image ,profileName:responseData.name,startDate:dob});
                //   // localStorage.setItem('userData', JSON.stringify(res.data.response_data.));
                  // console.log(res.data.response_message, responseData.dob, "response data");
                  this.getCountryStateCity_token(responseData.country, responseData.state);
                  this.loaderHandler();
              } else if (res.data.response_code === 4000) {
                // this.removeLocalStore();
                console.log("Session timeout");
                // this.props.history.push({
                //   pathname: "/",
                // });
                this.loaderHandler();
              } else {
                
                console.log("Session timeout");
                this.loaderHandler();
              }
            })
            .catch((err) => {console.log(err.data);this.loaderHandler();});
        } else {
          this.props.history.push({
            pathname: "/",
          });
          console.log("Session timeout");
          this.loaderHandler();
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

      onDrop=(picture)=> {
        // this.setState({
        //     pictures: this.state.pictures.concat(picture),
        // });
        // console.log("Picture === ", picture.target.files[0].name,picture,this.state.user.email);

          let formData = new FormData();
          
          formData.append('email', this.state.user.email);
          formData.append('file', picture.target.files[0]);

          let reader = new FileReader();
         let file = picture.target.files[0];
                                
                                    
          // console.log('formData --> ', formData);


          axios.post(`${Api.API_URL}/edit-profileImage`, formData, {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'x-access-token': this.state.user.authtoken
            }
          })
            .then((response) => {
              // console.log("edit profile === ",response,JSON.stringify(response.data.response_data));
              if (response.data.response_code == 2000) {
                reader.onloadend = () => {
                  // console.log('reader.result---',reader.result);
                  this.setState({profileImage: reader.result});
                  this.props.setUrl(reader.result);
                  // document.getElementById('preview').value= reader.result
                  // document.getElementById('preview').value= JSON.stringify(response.data.response_data);
              }
              reader.readAsDataURL(file)
              
                //  this.viewUserProfile();
                // this.setState({profileImage: JSON.stringify(response.data.response_data)})
                this.props.onClick();
                // document.getElementById('preview').value= JSON.stringify(response.data.response_data)
                // console.log(this.state.profileImage);
              }
              else if (response.data.response_code === 4000) {
                
              } else {
                
                
              }
            })
            .catch((error) => {
              console.error(error);
            });
        
    }

      

      handleSubmit = (event) => {
        if(this.state.user){
        if(this.state.fname === ''){
          this.setState({fnameError: 'First Name field Cannot be blanked',lnameError: '',emailError: '',phoneError: '',addressError: '',cityError:'',countryError:'',dateError:''})
        } else if(this.state.lname === ''){
          this.setState({lnameError: 'Last Name field Cannot be blanked',fnameError:'', emailError: '',phoneError: '',addressError: '',cityError:'',countryError:'',dateError:''})
        // } else if( this.state.startDate === ''){
        //   this.setState({dateError: 'Date field Cannot be blanked',emailError: '',lnameError: '',fnameError: '',phoneError:'',addressError:'',cityError:'',countryError:''})
        } else if(this.state.email === ''){
          this.setState({emailError: 'Email field Cannot be blanked',lnameError: '',phoneError: '',fnameError: '',addressError:'',cityError:'',countryError:'',dateError:''})
        }
        //  else if( this.state.phone === null){
        //   this.setState({phoneError: 'Phone field Cannot be blanked',emailError: '',lnameError: '',fnameError: '',addressError:'',cityError:'',countryError:'',dateError:''})
        // } else if( this.state.address === ''){
        //   this.setState({addressError: 'Address field Cannot be blanked',emailError: '',lnameError: '',fnameError: '',phoneError:'',cityError:'',countryError:'',dateError:''})
        // } else if( this.state.city === ''){
        //   this.setState({cityError: 'City field Cannot be blanked',emailError: '',lnameError: '',fnameError: '',phoneError:'',addressError:'',countryError:'',dateError:''})
        // } else if( this.state.country === ''){
        //   this.setState({countryError: 'Country field Cannot be blanked',emailError: '',lnameError: '',fnameError: '',phoneError:'',addressError:'',cityError:'',dateError:''})
        // } 
        else {
        
        // event.preventDefault()
        this.setState({checkError: ''});
        //alert("lojjjj")
        let object = { name: `${this.state.fname} ${this.state.lname}`, email: this.state.email, dob: this.state.startDate, phone_no: parseInt(this.state.phone), address: this.state.address, city: this.state.city, state: this.state.state, country: this.state.country}
        // console.log(object,this.state.user.authtoken);
        //this.props.getLoginApi(object)
        axios.post(`${Api.API_URL}/edit-profile`, object, {headers: {
          'Content-Type': 'application/json',
          'x-access-token': this.state.user.authtoken,
         }})
        .then(res=> {
          // console.log(res.data);
          if (res.data.response_code === 2000) {
            this.setState({emailError: '',fnameError:'',lnameError:'',phoneError: '',addressError:'',cityError:'',countryError:'',dateError:'', result:res.data.response_message});
          // console.log(res.data.response_message, 'response data');
          
        } else if (res.data.response_code === 2008) {
          this.setState({emailError: '',fnameError:'',lnameError:'',phoneError: '',addressError:'',cityError:'',countryError:'',dateError:'',result: 'Email address already exist'});
        } else if (res.data.response_code === 4000) {
          this.setState({emailError: '',fnameError:'',lnameError:'',phoneError: '',addressError:'',cityError:'',countryError:'',dateError:'',result: res.data.response_message});
        }
        })
        .catch(err=>alert(err.response.data));
       }
      }
      }

      handleCountryNmae = (e) => {
        let countryName = "";
        // if(e.currentTarget.value != null){
        countryName = e.currentTarget.value;
        // console.log("country name", countryName);
        this.getState(countryName);
          
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
        this.setState({[e.target.name]:e.target.value});
        // console.log('hello');
      };

    handleChangeDate = date => {
        this.setState({
          startDate: date
        });
    }

    handleImageUpload = (e)=> {
      
      const fb = new FormData();
      fb.append('file',e.target.files[0]);
      // console.log("Upload image === ",e.target.files[0]," Form data ",fb);
    }
   
    render(){
      //     const formData = new FormData();
      //     formData.append('authtoken', this.state.user.authtoken);
      //     formData.append('email', this.state.user.email);
          //   const formData = new FormData();
          //   formData.append('image', 'file');
          // console.log("form data === ", formData);
          
        return(
            <React.Fragment>
                
                <div id="profile-from" className="col-lg-11 mx-auto">
              <div className="form-group text-center" id="man-pic">
                <div className='' style={{display: 'flex',justifyContent:'center',alignItems:'center',marginBottom:50}}>
                <div style={{width:120,height:120, borderRadius:'100%',}}>
                <img src={this.state.profileImage} id='preview' name='preview' className="" style={{width:'100%',height:'100%', borderRadius:'100%',}}/>
                </div>
                
                <span id="prof-edit"><a onClick={()=>this.fileInput.click()}><i className="fa fa-camera fa-cameraIcon" aria-hidden="true"></i></a></span>
                </div>
                <h4>{this.state.profileName}</h4>

                {/* <ImageUploader
                withIcon={false}
                buttonText={<i className="fa fa-calendar" aria-hidden="true"></i>}
                onChange={this.onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
                singleImage={true}
                withLabel={false}
                buttonStyles={{backgroundColor:'#fff', color:'#000'}}
                accept="accept=image/*"
            /> */}

            <input type='file' style={{display: 'none'}} className="form-control" name="file" onChange={this.onDrop} ref={fileInput=>this.fileInput = fileInput} value='' />
              </div>


              <div className="form-group">
                <input type="text" name='fname' className="form-control form-control-o" placeholder="First Name" onChange={this.handleChange} value={this.state.fname}/>
                <span style={{color: 'red', fontSize: 12, paddingLeft: 30}}>{this.state.fnameError}</span><br/>
              </div>
              <div className="form-group">
                <input type="text" name='lname' className="form-control form-control-o"  placeholder="Last Name" onChange={this.handleChange} value={this.state.lname}/>
                <span style={{color: 'red', fontSize: 12, paddingLeft: 30}}>{this.state.lnameError}</span><br/>
              </div>
               <div className="form-group" style={{}}>
                   <div className="form-control form-control-o" style={{display:'flex', justifyContent: 'center',alignItems: 'center'}}>
              
      
       <ModernDatepicker
                date={this.state.startDate}
                format={'YYYY-MM-DD'}
                // showBorder
                className='datePicker'
                onChange={date => this.handleChangeDate(date)}
                placeholder={'Date of Birth'}
            />
            </div>
            <span style={{color: 'red', fontSize: 12, paddingLeft: 30}}>{this.state.dateError}</span><br/>
          </div>
          
              <div className="form-group">
                <input type="text" name='email' className="form-control form-control-o"  placeholder="Email" onChange={this.handleChange} value={this.state.email}/>
                <span style={{color: 'red', fontSize: 12, paddingLeft: 30}}>{this.state.emailError}</span><br/>
              </div>

              <div className="form-group">
                <input type="tel" name='phone' className="form-control form-control-o"  placeholder="Phone" onChange={this.handleChange} value={this.state.phone}/>
                <span style={{color: 'red', fontSize: 12, paddingLeft: 30}}>{this.state.phoneError}</span><br/>
              </div>

              <div className="form-group">
                <input type="text" name='address' className="form-control form-control-o"  placeholder="Address" onChange={this.handleChange} value={this.state.address}/>
                <span style={{color: 'red', fontSize: 12, paddingLeft: 30}}>{this.state.addressError}</span><br/>
              </div>

              <div className="form-group">
              <select
                    style={{ color: "#616A6B", fontSize: 16 }}
                    // className="countryList"
                    className="select-form"
                    onChange={this.handleCountryNmae}
                    value={this.state.country}
                    // onClick={this.handleCountryNmae}
                    // onSelect={this.handleCountryNmae}
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
                {/* <input type="text" name='country' autoComplete='off' className="form-control form-control-o"  placeholder="Country" onChange={this.handleChange} value={this.state.country}/> */}
                <span style={{color: 'red', fontSize: 12, paddingLeft: 30}}>{this.state.countryError}</span><br/>
              </div>

              <div className="form-group">
              <select
                    style={{ color: "#616A6B", fontSize: 16 }}
                    // className="countryList"
                    className="select-form"
                    onChange={this.handleStateNmae}
                    value={this.state.state}
                    // onClick={this.handleCountryNmae}
                    // onSelect={this.handleCountryNmae}
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
                {/* <input type="text" name='state' className="form-control form-control-o"  placeholder="state" onChange={this.handleChange} value={this.state.state}/> */}
                <span style={{color: 'red', fontSize: 12, paddingLeft: 30}}>{this.state.stateError}</span><br/>
              </div>

              <div className="form-group">
              <select
                    style={{ color: "#616A6B", fontSize: 16 }}
                    // className="countryList"
                    className="select-form"
                    onChange={this.handleCityNmae}
                    value={this.state.city}
                    // onClick={this.handleCountryNmae}
                    // onSelect={this.handleCountryNmae}
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
                {/* <input type="text" name='city' className="form-control form-control-o"  placeholder="City" onChange={this.handleChange} value={this.state.city}/> */}
                <span style={{color: 'red', fontSize: 12, paddingLeft: 30}}>{this.state.cityError}</span><br/>
              </div>

              <div className="form-group">
                <div className=" form-control-password">
                     <div className="row">
                     <div style={{width: '77%', paddingLeft: 15}}>Password</div> 
                     <button onClick={() => this.setState({ modalIsOpen: true })} style={{}}>Change</button>
                     </div>
                </div>
                {/* <input type="password" className="form-control"  placeholder="Password"/> */}
              </div>
              <span style={{color: 'green', fontSize: 18, paddingLeft: 30}}>{this.state.result}</span><br/>

              <div className="form-group" id="save-btn">
                <a onClick={this.handleSubmit} style={{cursor:'pointer'}}>Save</a>
              </div>
           </div>
           
           {/* Credintial Modal ---------------------------------------- */}

        <div className="container">
          <Modal
            show={this.state.modalIsOpen}
            // onHide={() => setShow(false)}
            dialogClassName="modal-90w"
          >
            <div
              onClick={() => this.setState({ modalIsOpen: false })}
              style={{ width: "100%", textAlign: "right", padding: 25 }}
            >
              <Close width={15} height={15} color="#B3B6B7" />
            </div>
              
              <Forgot onClick={() => this.modalHandel("signin")} />
            
          </Modal>
        </div>

        {this.state.loader ? <Loader modalToggle={this.state.loader} /> : null}

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
  // console.log('dispatch');
  return {
    
    setUrl: async url => await dispatch({type: URL, payload:url}),
  };
};

export default connect(
  mapStateToProps,
  mapPropsToState,
)(EditProfile);