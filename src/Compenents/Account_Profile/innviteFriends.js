/* eslint-disable no-undef */
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
import {
  WhatsappShareButton,
  EmailShareButton,
  TwitterShareButton,
  FacebookMessengerShareButton,
  
  // OKShareCount,
  // PinterestShareCount,
  // RedditShareCount,
  // TumblrShareCount,
  // VKShareCount
} from "react-share";
import Loader from '../Comman/loader';

class InnviteFriends extends React.Component {
    state = {
      skype_id: 'live:.cid.59123495ee6eda0c',
      loader: false,
      };

      loaderHandler = () => {
        // console.log(" hello");
        this.setState({ loader: !this.state.loader });
      };
    

      componentDidMount=()=>{
        // Skype.ui({
        //   name: "dropdown",
        //   element: "SkypeDropdown",
        //   participants: [this.state.skype_id],
        //   });
        // Skype.ui({
        //   name: "dropdown",
        //   element: "SkypeButton_Call_john23",
        //   participants: ["john23"],
        //   imageSize: 32
        //   })
      }

   
    render(){
      const SingleGymId = JSON.parse(localStorage.getItem("SingleGymId"));
      const whatsappUrl=`https://nodeserver.mydevfactory.com/react-native/fittrip/#/gym-details-${SingleGymId.SingleGymId}`;

      const facebookMessagerUrl= `https://nodeserver.mydevfactory.com/react-native/fittrip/#/gym-details-${SingleGymId.SingleGymId}`;

      const emailUrl= `https://nodeserver.mydevfactory.com/react-native/fittrip/#/gym-details-${SingleGymId.SingleGymId}`;
    
        return(
            <React.Fragment>
               
               <div id="dashbord-invite-fnd">
             <h2>Invite a friend by</h2>
              <div class="row"  style={{display: 'flex',justifyContent:'center',alignItems: 'center'}}>
                <div className="col-lg-8">
                  <div className="row" >
                    
                    <div className="col-lg-3 col-6" id="s">
                      <a style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                      <WhatsappShareButton url={whatsappUrl}>
                         <img src={whatsapp} />
                         </WhatsappShareButton>
                      </a>
                      <p>Whatsapp</p>
                    </div>
                    
                    <div className="col-lg-3 col-6" id="s">
                      <a style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <FacebookMessengerShareButton url= {facebookMessagerUrl}>
                         <img src={messenger} />
                         </FacebookMessengerShareButton>
                      </a>
                      <p>Messenger</p>
                    </div>
                      {/* <div className="col-lg-3 col-6" id="s" >
                        <a style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                        
                          <div>
                          <img src={skype} id=''/>
                          </div>
                        </a>
                        <p>skype</p>
                      </div> */}
                    <div className="col-lg-3 col-6" id="s">
                      <a style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <EmailShareButton url= {emailUrl}>
                         <img src={mail_pic}/>
                         </EmailShareButton>
                      </a>
                      <p>Mail</p>
                    </div>
                  </div>
                </div>
              </div>
          </div>

          {this.state.loader ? <Loader modalToggle={this.state.loader} /> : null}

            </React.Fragment>
        );
    }
}

export default InnviteFriends;