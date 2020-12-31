/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import '../../Utils/style.css';
import axios from "axios";
import Api from "../../Url";
import '../../Utils/profileSection_style.css';
import whatsapp from '../../Images/whatsapp.png';
import messenger from '../../Images/messenger.png';
import skype from '../../Images/skype.png';
import mail_pic from '../../Images/mail_pic.png';

class GiftFriends extends React.Component {
    state = {
        
      };

      componentDidMount=()=>{
        
      }

   
    render(){
    
        return(
            <React.Fragment>
               
               <div id="dashbord-invite-fnd">
             <div className="row">
               <div className="col-lg-12" id="five-creditss">
                 <h2>Credit you want to gift</h2>
                 <input type="text" name="gift" placeholder="5 Credits"  style={{display: 'flex',justifyContent:'center',alignSelf  : 'center'}}/>
               </div>
             </div>


             <h2>Gift Firends by</h2>
              <div className="row"  style={{display: 'flex',justifyContent:'center',alignItems: 'center'}}>
                <div className="col-lg-8">
                  <div className="row">
                    <div className="col-lg-3 col-6" id="s">
                      <a href="#">
                         <img src={whatsapp}/>
                      </a>
                      <p>Whatsapp</p>
                    </div>
                    <div class="col-lg-3 col-6" id="s">
                      <a href="#">
                         <img src={messenger}/>
                      </a>
                      <p>Messenger</p>
                    </div>
                    <div class="col-lg-3 col-6" id="s">
                      <a href="#">
                         <img src={skype}/>
                      </a>
                      <p>skype</p>
                    </div>
                    <div class="col-lg-3 col-6" id="s">
                      <a href="#">
                         <img src={mail_pic}/>
                      </a>
                      <p>Mail</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row" >
                <div class="col-lg-12" id="confirm"  style={{display: 'flex',justifyContent:'center',alignItems: 'center'}}>
                  <a href="#">Confirm</a>
                </div>
              </div>
          </div>



            </React.Fragment>
        );
    }
}

export default GiftFriends;