/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
import React from 'react';
import '../../Utils/style.css';
import axios from 'axios';
import Loader from './loader';

class SuggestGym extends React.Component{

    constructor(){
        super();
        this.state = {
            gym: '',
            manager: '',
            phone: '',
            email: '',
            gymAdd: '',
            city: '',
            country: '',
            fieldError: '',
            error: 'field cannot be blanked',
            successMessage: '',
            loader: false,
        };
    };

    loaderHandler = () => {
      console.log(" hello");
      this.setState({loader: !this.state.loader});
    }

    handleSubmit = (event) => {
        if(this.state.gym === '' && this.state.manager === '' && this.state.email === '' && this.state.phone === '' && this.state.comment === '' && this.state.gymAdd === '' && this.state.city === '' && this.state.country === '')
        {console.log(" enter");
          this.setState({fieldError: 'Fields cannot be blanked', successMessage: ''});
        } else if(this.state.gym === ''){
          this.setState({fieldError: `Gym Name ${this.state.error}`, successMessage: ''});
        } else if(this.state.manager === ''){
          this.setState({fieldError: `Manager Name ${this.state.error}`, successMessage: ''});
        } else if(this.state.email === ''){
          this.setState({fieldError: `Email ${this.state.error}`, successMessage: ''});
        } else if(this.state.phone === ''){
            this.setState({fieldError: `Phone Number ${this.state.error}`, successMessage: ''});
        } else if(this.state.gymAdd === ''){
            this.setState({fieldError: `Gym Address ${this.state.error}`, successMessage: ''});
        } else if(this.state.city === ''){
            this.setState({fieldError: `City ${this.state.error}`, successMessage: ''});
        } else if(this.state.country === ''){
            this.setState({fieldError: `Country ${this.state.error}`, successMessage: ''});
        } else {
          this.loaderHandler();
        event.preventDefault()
        
        //alert("lojjjj")
        let object = { gymName: this.state.gym, managerName: this.state.manager, email: this.state.email, phone: this.state.phone, address: this.state.gymAdd, country: this.state.country, city: this.state.city }
        console.log(object);
        //this.props.getLoginApi(object)
        axios.post(`https://nodeserver.mydevfactory.com:1436/api/suggest-a-gym`, object, {headers: {
          'Content-Type': 'application/json',
         }})
        .then(res=> {
          console.log(res);
          if (res.data.response_code === 2000) {
            this.setState({successMessage: res.data.message, fieldError: ''});
          console.log(res.data.message, 'response data');
          this.loaderHandler();
          this.props.onClick();
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
        console.log('hello',[e.target.name], e.target.value);
      };
    
  render(){
  
      return(
          <React.Fragment>
    
    
<div className="suggestGym_contusmn" style={{padding: 1}}>
    <div className="container">
        <div className="row">
            <div className="col-lg-10 offset-lg-1 col-md-12">
             <div className="suggestGym_continn">
                <h4 style={{marginBottom: 40}}> Suggest us a gym </h4>

                <input type="text" name="gym" placeholder="Gym Name" onChange={this.handleChange} value={this.state.gym} />
                
                <input type="text" name="manager" placeholder="Manager Name" onChange={this.handleChange} value={this.state.manager} />
                
                <input type="tel" name="phone" placeholder="Phone" onChange={this.handleChange} value={this.state.phone} />
                
                <input type="email" name="email" placeholder="Email" onChange={this.handleChange} value={this.state.email} />
                
                <input type="text" name="gymAdd" placeholder="Address" onChange={this.handleChange} value={this.state.gymAdd} />

                <input type="text" name="city" placeholder="City" onChange={this.handleChange} value={this.state.city} />
                
                <input type="text" name="country" placeholder="Country" onChange={this.handleChange} value={this.state.country} />
                
                <span id='contactErrorText' ><b style={{color: 'red', fontSize: 16, paddingLeft: 30, paddingBottom: 30}}>{this.state.fieldError}</b></span><br/>
                <span id='contactErrorText' ><b style={{color: 'green', fontSize: 16, paddingLeft: 30, paddingBottom: 30}}>{this.state.successMessage}</b></span><br/>
                {this.state.loader?
                 <Loader modalToggle={this.state.loader}/>
                : null }
                <input type="submit" value="Submit"  onClick={this.handleSubmit} />
              
             </div>
            </div>
        </div>
    </div>
</div>

          </React.Fragment>
      );
  }
};

export default SuggestGym;