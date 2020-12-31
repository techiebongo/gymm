/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "../../Utils/style.css";
import axios from "axios";
import Api from "../../Url";
import "../../Utils/profileSection_style.css";
import Loader from "../Comman/loader";
import { GiftedChat, Bubble } from "react-web-gifted-chat";
import openSocket from 'socket.io-client';

const  socket = openSocket('https://nodeserver.mydevfactory.com:1436');

class Messaging extends React.Component {
  state = {
    user: JSON.parse(localStorage.getItem("userData")),
    messages: [],
    loader: false,
    text: "",
    messageId: 2,
    user: JSON.parse(localStorage.getItem("userData")),
    adminId: '',
    pageLimit: 1,
    messageLoadMore: false,
    messageLoader: false,
  };

  loaderHandler = () => {
    this.setState({ loader: !this.state.loader });
  };

  componentDidMount = () => {
  
    
    axios
      .get(`${Api.API_URL}/get-admin-id`, {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": this.state.user.authtoken,
        },
      })
      .then(async(res) => {
        // console.log("Credits", res);
        if (res.data.response_code == 2000) {
          const responseData = res.data.response_data;
          // console.log("get admin id Info", responseData);
          await this.setState({ adminId: responseData });
          
          this.getchartData();
          
        } else {
          // console.log("get admin id Info  " + res.data.response_message);
          
        }
      })
      .catch((error) => {
        console.error(error);
        
      });
      
      socket.emit('newUser', { user_id: this.state.user._id });
      socket.on("chat list", msg => {
        // console.log("chat list", msg)
        const socketResponse =  msg.response_data.docs.reverse();
        this.setState({messages:[]})
        socketResponse.map((item, index)=>{
          const newMsg = {
            id: item._id,
            text: item.text,
            createdAt: new Date(item.createdAt),
            user: {
              id: item.from_user,
              // name: item.name,
              // avatar: "https://facebook.github.io/react/img/logo_og.png",
            },
          }
        this.setState((previousState) => ({
          messages: GiftedChat.append(previousState.messages,newMsg),
          // messages: newMsg,
          
        }));
        })
        // this.setState({ messages: msg.response_data.docs.reverse() })
    });
  }

 
  getchartData = () =>{
    const user= JSON.parse(localStorage.getItem("userData"));
    this.setState({messageLoader:true})
    const getChart = {
      "from_user": user._id,
      "to_user": this.state.adminId,
      "page": this.state.pageLimit,
      "limit": 10
  }

    axios
      .post(`${Api.API_URL}/get-chat`, getChart, {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": user.authtoken,
        },
      })
      .then((res) => {
        // console.log("get chart ", res,getChart,user.authtoken);
        if (res.data.response_code == 2000) {
          const responseData = res.data.response_data.docs;
          const pages = res.data.response_data.pages;
          if(pages > this.state.pageLimit){
            this.setState({  pageLimit: this.state.pageLimit + 1, messageLoadMore: true,messageLoader:false});
          } else {
            this.setState({ messageLoadMore: false,messageLoader:false });
          }
          // console.log("get chart after 2000 ", responseData);
          
          responseData.map((item, index)=>{
            // console.log(index);
            const newMsg = {
              id: item._id,
              text: item.text,
              createdAt: new Date(item.createdAt),
              user: {
                id: item.from_user,
                // name: item.name,
                // avatar: "https://facebook.github.io/react/img/logo_og.png",
              },
            }
          this.setState((previousState) => ({
            messages: GiftedChat.append( newMsg, previousState.messages),
            
          }));
          })
        } else if (res.data.response_code == 4000){
          // console.log("get admin id Info  " + res.data.response_message);
          this.props.history.push({
            pathname: "/",
          });
        }
      })
      .catch((error) => {
        console.error(error);
        
      });

    
  }

  componentWillUnmount = () => {
    // console.log("hello jsdhfidgh");
    socket.emit('removeUser', { user_id: this.state.user._id });
  }

  onSend=()=> {
      const newMsg = {
        id: this.state.messageId,
        text: this.state.text,
        createdAt: new Date(),
        user: {
          id: 3,
          name: "React",
          avatar: "https://facebook.github.io/react/img/logo_og.png",
        },
      }
      let msgObj = {
        text: this.state.text,
        to_user: this.state.adminId,
        from_user: this.state.user._id,
        authToken: this.state.user.authtoken
    }
    socket.emit('send message', msgObj);
    socket.emit('getChatUserList', { adminId: this.state.adminId });
    this.setState((previousState) => ({
      // messages: GiftedChat.append(previousState.messages, newMsg),
      messageId: previousState.messageId + 1,
      text: ''
    }));
  }

  renderSend() {
    return (
       
            <div style={{marginRight: 10, marginBottom: 5}}>
            <i className="fa fa-paper-plane" aria-hidden="true" style={{color: 'blue',cursor:'pointer'}} onClick={()=>this.onSend()}></i>
            </div>
        
    );
}


  render() {
    return (
      <React.Fragment>
        {/* <div id="" className="container" style={{}}>
          <h3>Messaging</h3>
        </div> */}
        <div style={{ height:550}}>
        <GiftedChat
          
          text={this.state.text}
          showUserAvatar={true}
          onInputTextChanged={(text)=>this.setState({text})}
          messages={this.state.messages}
          inverted={true}
          renderSend={this.renderSend}
          onSend={this.onSend}
          loadEarlier={this.state.messageLoadMore}
          onLoadEarlier={this.getchartData}
          renderBubble={this.renderBubble}
          // renderLoading={this.getchartData}
          isLoadingEarlier={this.state.messageLoader}
          user={{
            id: this.state.user._id,

          }}
        />
</div>
        {this.state.loader ? <Loader modalToggle={this.state.loader} /> : null}
      </React.Fragment>
    );
  }

  renderBubble(props) {
    // var backgroundColor = props.currentMessage.text == undefined ? 'transparent' : '#666';
    // var padding = backgroundColor == undefined ? 0 : 7;

    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: "#ECF0F1",
            // opacity: .8,
            // padding: padding,
            maxWidth: '80%',
          },
          right: {
            backgroundColor: "blue",
            // opacity: .8,
            // padding: padding,
            maxWidth: '80%',
          }
        }}
        style={{ backgroundColor: "black" }}
      />
    );
  }


}

export default Messaging;
