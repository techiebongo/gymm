/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
import React from 'react';
import '../../Utils/style.css';
import axios from 'axios';
import Api from '../../Url';


class Forgot extends React.Component{

    constructor(){
        super();
        this.state = {
          email: '',
          emailError: '',
        };
    };

    // componentDidMount() {
    //     console.log("store---->", store.getState().loginReducer)
    //   }

      handleChange = (e) => {
        this.setState({[e.target.name]:e.target.value});
      };


      SumitHandle= (event) => {
        if(this.state.email === ''){
          this.setState({fnameError: 'Field Cannot be blanked'})
        } else {
        event.preventDefault()
        let object = { email: this.state.email }
        // console.log(object);
        axios.post(`${Api.API_URL}/forgot-password`, object, {headers: {
          'Content-Type': 'application/json',
         }})
        .then(res=> {
          // console.log(res);
          if (res.data.response_code === 2000) {
            this.setState({emailError: ''});
          // console.log(res.response_message, 'response data');
          this.props.onClick();
        } else if(res.data.response_code === 5002) {
          this.setState({emailError: '', wrongLogin: 'User is not valid.'});
        console.log(res.response_message, 'response data');
      }
        })
        .catch(err=>alert(err.response.data));
       }
        
      };
   
  render(){
  
      return(
          <React.Fragment>
           
<div style={{}}>
        <div className="loginmain">
        <h3> Forgot Password </h3>
            <div className="logfrom" style={{paddingTop:100}}>
                <input type="email" name="email" placeholder="Enter Your Gmail"  onChange={this.handleChange} value={this.state.email} style={{ marginBottom: 40}} />
                <span style={{color: 'red', fontSize: 12, paddingLeft: 30}}>{this.state.emailError}</span><br/>
                <input type="submit" value="Submit" onClick={this.SumitHandle} />
                <p style={{textAlign: 'center'}}><span style={{color: 'red', fontSize: 12, paddingLeft: 30}}>{this.state.wrongLogin}</span></p><br/>
            </div>


        </div>
</div>

          </React.Fragment>
      );
  }
};


export default Forgot;
  