/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import '../../Utils/style.css';
import axios from "axios";
import Api from "../../Url";
import '../../Utils/profileSection_style.css';

class SuggestGym extends React.Component {
    state = {
        
      };

      componentDidMount=()=>{
        
      }

   
    render(){
    
        return(
            <React.Fragment>
               
               <div id="dashbord-menu-suggest">
             <h2>Suggest a Gym</h2>
             <input type="text" name="gym-suggest" placeholder="Type your search"/>

             <div id="suggest-btn-g">
               <a href="#">Suggest</a>
             </div>
          </div>


            </React.Fragment>
        );
    }
}

export default SuggestGym;