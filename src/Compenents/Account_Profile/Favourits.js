/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "../../Utils/style.css";
import axios from "axios";
import Api from "../../Url";
import "../../Utils/profileSection_style.css";
import Loader from '../Comman/loader';

class Favourits extends React.Component {
  state = {
    user: JSON.parse(localStorage.getItem("userData")),
    favouritList: [],
    loader: false,
  };

  loaderHandler = () => {
    console.log(" hello");
    this.setState({ loader: !this.state.loader });
  };

  componentDidMount = () => {
    this.loaderHandler();
    this.allFavouritsList();
  };

  allFavouritsList = () => {
    if (this.state.user) {
      let body = `&userLat=22.6634716&userLong=88.3738867&user_id=${this.state.user._id}`;

      axios
        .get(`${Api.API_URL}/list-favourite-gym?${body}`, {
          headers: {
            "x-access-token": this.state.user.authtoken,
          },
        })
        .then((res) => {
          // console.log(" favourite response data", res);
          if (res.data.response_code === 2000) {
            const responseData = res.data.response_data.docs;
            // console.log(" favourite response data after 2000", responseData);
            this.setState({ favouritList: responseData });
            this.loaderHandler();
          } else {
            console.log("favourite listing Info  " + res.response_message);
            this.loaderHandler();
          }
        })
        .catch((error) => {
          console.error(error);
          this.loaderHandler();
        });
    }
  };

  favouriteHandle = (gymId) => {
    this.loaderHandler();
    let body = {
      user_id: this.state.user._id,
      gym_id: gymId,
    };
    console.log("favorite ", body);

    axios
      .post(`${Api.API_URL}/remove-favourite-gym`, body, {
        headers: {
          "x-access-token": this.state.user.authtoken,
        },
      })
      .then((res) => {
        // console.log("remove favorite  ", res);
        if (res.data.response_code === 2000) {
          // this.setState({isFavourite: false});
          this.allFavouritsList();
        }
      });
  };

  render() {
    let minimumCredit = 0;
    return (
      <React.Fragment>
        <div id="user-favorites-two" style={{}}>
          <h3>Favorites</h3>

          <div style={{ maxHeight: 600, overflowY: "scroll", overflowX:"hidden"}}>
            {this.state.favouritList.map((favouritItem, favouritIndex) => (
              <div className="row" style={{}} key={favouritIndex}>
                <div className="col-lg-10 col-11 mx-auto mb-5" style={{}}>
                  {favouritItem.gym_passes && favouritItem.gym_passes.map((gymPassCredit, gymPassCreditIndex)=>(
                    minimumCredit = gymPassCredit.credit,
                    gymPassCredit.credit < minimumCredit?
                    minimumCredit = gymPassCredit.credit
                    : null
                  ))}
                  <h4>
                    Starting from {minimumCredit} Credits
                    {/* <span>
                      <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
                    </span> */}
                  </h4>

                  <div className="row" id="user-favorites-b-one">
                    <div className="col-lg-3">
                      <img
                        src={favouritItem.logo}
                        style={{ width: 120, height: 120 }}
                        className='favoriteImage'
                      />
                    </div>
                    <div className="col-lg-9">
                      <div className="row">
                        <div className="col-lg-12">
                          <h2 style={{fontSize:20, fontWeight: 600}}>
                            {favouritItem.name}
                            <span>
                              <i
                                className="fa fa-heart"
                                aria-hidden="true"
                                onClick={() =>
                                  this.favouriteHandle(favouritItem._id)
                                }
                                style={{cursor:'pointer'}}
                              ></i>
                            </span>
                          </h2>
                          <h5 style={{fontSize:16, fontWeight: 500}}>{favouritItem.address}</h5>
                          <h6 style={{fontSize:16, fontWeight: 500}}>
                            <i className="fa fa-map-marker" aria-hidden="true"></i>
                            __ {favouritItem.dist.calculated.toFixed(2)} KM{" "}
                            <span>
                              {/* <a href="#">Open Now</a> */}
                            </span>
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {this.state.favouritList.length > 0?
            null
            :(
            <b
            style={{
              color: "#cccccc",
              display: "flex",
              justifyContent: "center",
              alignSelf: "center",
              fontSize: 16,
              marginTop: 30,
              marginBottom: 30
            }}
          >
            Favorite gym not found!
          </b>
            )
            }
          </div>

          
        </div>

        {this.state.loader ? <Loader modalToggle={this.state.loader} /> : null}

      </React.Fragment>
    );
  }
}

export default Favourits;
