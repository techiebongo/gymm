/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
import React from "react";
import Headers from "../../Compenents/Comman/header";
import Footer from "../../Compenents/Comman/footer";
import "../../Utils/style.css";
import googleplay2 from "../../Images/googleplay2.png";
import appstore2 from "../../Images/appstore2.png";
import SuggestGym from "../../Compenents/Comman/suggestGym";
import Modal from "react-bootstrap/Modal";
import { Close } from "react-bytesize-icons";
import csc from "country-state-city";
import continentData from "../../Compenents/continent-data";
import { Link } from "react-router-dom";
import Loader from "../../Compenents/Comman/loader";
// import AllLocation from '../../Compenents/allLocation';
import { GYMLOCATION, CLOSEUNDERLINE } from "../../Action/type";
import { connect } from "react-redux";
import axios from "axios";
import Api from "../../Url";

class Location extends React.Component {
  constructor() {
    super();
    this.state = {
      modalIsOpen: false,
      loader: false,
      country: "",
      region: "",
      selectedCountries: "",
      selected: [],
      AllGymLocationData: [],
      locationData: [
        {
          name: "Asia",
          countryData: [],
        },
        {
          name: "America",
          countryData: [],
        },
        {
          name: "Europe",
          countryData: [],
        },
        {
          name: "Oceania",
          countryData: [],
        },
        {
          name: "Africa",
          countryData: [],
        },
      ],
    };
  }
  componentDidMount = () => {
    this.props.setGymLocation(1);
    // this.setAllLocationData();
    this.getAllLocationData();
  };
  getAllLocationData = () => {
    this.loaderHandler();
    axios
      .get(`${Api.API_URL}/all-gym-list`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // console.log("All gym list ====> ", res);
        if (res.data.response_code == 2000) {
          const responseData = res.data.response_data;
          let data = [];
          let continents = continentData.ContinentalData;

          responseData.map((item) => {
            let d = 0;
            let regionInd = 0;
            let continentName = "";

            continents.map((continent) => {
              if (item.country == continent.name) {
                continentName = continent.region;
              }
            });
            data.map((region, regionIndex) => {
              if (continentName == region.region) {
                d = 1;
                regionInd = regionIndex;
              }
            });
            if (d) {
              let i = 0;
              let countryInd = 0;
              data[regionInd].countries.map((country, countryIndex) => {
                if (country.counryN == item.country) {
                  i = 1;
                  countryInd = countryIndex;
                }
              });
              if (i) {
                  let k = 0;
                  data[regionInd].countries[countryInd].cities.map((city, cityIndex) => {
                    if (city == item.city) {
                      k = 1;
                    }
                  });
                  if (k == 0) {
                    data[regionInd].countries[countryInd].cities.push(item.city);
                  }
               
              } else {
                let object = {
                  counryN: item.country,
                  
                      cities: [item.city],
                    };
                
                // console.log("object  ",object)
                data[regionInd].countries.push(object);
                  }
            } else {
              if(continentName){
              let object = {
                region: continentName,
                countries: [
                  {
                    counryN: item.country,
                    
                        cities: [item.city],
                      },
                    ],
                  };
                
            
              // console.log("object  ",object)
              data.push(object);
            }
            }
          });

          // console.log(
          //   "gym-list response data",
          //   responseData,
          //   " data value  ==",
          //   data,
          //   data.length
          // );

          this.setState({ AllGymLocationData: data });
          this.loaderHandler();
        } else {
          console.log("gym-list Info  " + res.data.response_message);
          this.loaderHandler();
        }
      })
      .catch((error) => {
        console.error(error);
        this.loaderHandler();
      });
  };
  componentWillUnmount = () => {
    this.props.setNullUnderLine(1);
  };

  loaderHandler = () => {
    // console.log(" hello");
    this.setState({ loader: !this.state.loader });
  };
  openModal = () => {
    this.setState({ modalIsOpen: true });
  };
  modalHandler = () => {
    this.setState({ modalIsOpen: false });
  };

  // setAllLocationData = () => {
  //   const { locationData } = this.state;
  //   // console.log(" country ===", csc.getAllCountries());
  //   // console.log(
  //   //   " city ===",
  //   //   csc.getStatesOfCountry("101"),
  //   //   "Countries"
  //   //   // continentData.ContinentalData
  //   // );
  //   let continentName = continentData.ContinentalData;
  //   let countryname = csc.getAllCountries();

  //   locationData.map((locationItem, locationIndex) => {
  //     continentName.map((continentItem) => {
  //       if (
  //         locationItem.name.toLowerCase() === continentItem.region.toLowerCase()
  //       ) {
  //         countryname.map((countryItem, countryIndex) => {
  //           if (
  //             continentItem.name.toLowerCase() ===
  //             countryItem.name.toLowerCase()
  //           ) {
  //             locationData[locationIndex].countryData.push(countryItem);
  //           }
  //         });
  //       }
  //     });
  //   });
  //   this.setState({ locationData });
  // };

  render() {
    const { AllGymLocationData, loader } = this.state;
    // console.log("locationData  ", locationData);
    let cityName;
    let heiscrolClass_style = "";

    return (
      <React.Fragment>
        {loader ? (
          <Loader modalToggle={loader} text="Location loading" />
        ) : null}
        <div style={{ height: 100 }}></div>
        <div
          className="innnerban Sticky"
          style={{
            position: "fixed",
            top: 0,
            zIndex: 100,
            backgroundColor: "#000080",
          }}
        >
          <Headers backgroundColor="#000080" />
        </div>

        {/* modal view */}

        <div>
          <Modal show={this.state.modalIsOpen} dialogClassName="modal-90w">
            <div
              onClick={() => this.setState({ modalIsOpen: false })}
              style={{ width: "100%", textAlign: "right", padding: 25 }}
            >
              <Close width={15} height={15} color="#B3B6B7" />
            </div>
            <SuggestGym onClick={this.modalHandler} />
          </Modal>
        </div>

        {/* --  all loaction  -- */}

        <div className="loactionmn">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h3> All our locations </h3>
                {/* <p>
                  {" "}
                  Don’t see a city?
                  <span style={{ cursor: "pointer" }} onClick={this.openModal}>
                    {" "}
                    Suggest us a gym.{" "}
                  </span>
                </p> */}
              </div>

              {/* <AllLocation/> */}

              <div className="col-lg-12">
                {AllGymLocationData.map((locationItem, locationIndex) => (
                  <div key={locationIndex} className="">
                    <div className="col-lg-12 mt-5">
                      <h4> {locationItem.region.toUpperCase()} </h4>
                    </div>
                  
                              <div className="row unistate">
                                
                                {locationItem.countries.map(
                                  (countryItem, countryIndex) => (
                                    <div key={countryIndex} className="col-lg-3">
                                      <ul className="">
                                        <li>
                                          <span>
                                            
                                              {countryItem.counryN}
                                           
                                          </span>
                                        </li>
                                        {countryItem.cities.length > 6
                                          ? (heiscrolClass_style = "scroll")
                                          : (heiscrolClass_style = "")}
                                        <div
                                          className="heiscrol"
                                          style={{
                                            overflowY: heiscrolClass_style,
                                          }}
                                        >
                                          {countryItem.cities.map(
                                            (cityItem, cityIndex) => {
                                              return (
                                                <div className="" key={cityIndex}>
                                                <li >
                                                  
                                                    {cityItem}
                                                  
                                                </li>
                                                </div>
                                              );
                                            }
                                          )}
                                        </div>
                                      </ul>
                                    </div>
                                  )
                                )}

                              </div> 
                    
                  </div>
                ))}
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

        <Footer />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log('state',state);
  return {};
};

const mapPropsToState = (dispatch) => {
  // console.log("dispatch");
  return {
    setGymLocation: async (no) =>
      await dispatch({ type: GYMLOCATION, payload: no }),
    setNullUnderLine: async (no) =>
      await dispatch({ type: CLOSEUNDERLINE, payload: no }),
  };
};

export default connect(mapStateToProps, mapPropsToState)(Location);
