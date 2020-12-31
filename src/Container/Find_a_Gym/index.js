/* eslint-disable no-use-before-define */
/* eslint-disable no-const-assign */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
import React, { useRef } from "react";
import Headers from "../../Compenents/Comman/header";
import Footer from "../../Compenents/Comman/footer";
import "../../Utils/style.css";
import marker2 from "../../Images/marker2.png";
import search1 from "../../Images/search1.png";
import marker from "../../Images/marker.png";
import googleplay2 from "../../Images/googleplay2.png";
import appstore2 from "../../Images/appstore2.png";
import sample_logo from "../../Images/sample_logo.png";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
// import countryList from "react-select-country-list";
import csc from "country-state-city";
// import Select from 'react-select';
import axios from "axios";
import Api from "../../Url";
import Loader from "../../Compenents/Comman/loader";
import Autocomplete from "react-google-autocomplete";
import { Link } from "react-router-dom";
import {FINDAGYM, CLOSEUNDERLINE, CURRENT_LAT, CURRENT_LUNG} from '../../Action/type';
import {connect} from 'react-redux';
// import useSupercluster from 'use-supercluster';
import Supercluster from 'supercluster';
import MapView from '../../Compenents/Comman/mapView';
let maxDis = 0;
let activity = "Activities";
let category = "Categories";
let latitude = 0;
let longitude = 0;

class FindGym extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: 0,
      longitude: 0,
      mapHeight: 640,
      mapWidth: 94,
      body_marginBottom: 630,
      locationData: [],
      amenitiesData: [],
      activitiesData: [],
      inputFieldValue: "",
      CategoryValue: "Categories",
      activityValue: "Activities",
      distanceValue: 0,
      options: [],
      countryName: "null",
      loader: false,
      totalGym: 0,
      isGoogleSearch: false,
      zoom: 11,
    };
    window.addEventListener("resize", this.getNumberOfColumns.bind(this));
  }

  loaderHandler = () => {
    // console.log(" hello");
    this.setState({ loader: !this.state.loader });
  };

  getNumberOfColumns() {
    window.innerWidth <= 480
      ? this.setState({
          mapHeight: 590,
          mapWidth: 92,
          body_marginBottom: 580,
        })
      : window.innerWidth <= 570
      ? this.setState({
          mapHeight: 590,
          mapWidth: 94,
          body_marginBottom: 600,
        })
      : window.innerWidth <= 768
      ? this.setState({
          mapHeight: 590,
          mapWidth: 94,
          body_marginBottom: 590,
        })
      : window.innerWidth <= 845
      ? this.setState({
          mapHeight: 623,
          mapWidth: 96,
          body_marginBottom: 640,
        })
      : window.innerWidth <= 991
      ? this.setState({
          mapHeight: 633,
          mapWidth: 96,
          body_marginBottom: 640,
        })
      : window.innerWidth <= 1020
      ? this.setState({
          mapHeight: 560,
          mapWidth: 92,
          body_marginBottom: 0,
        })
      : window.innerWidth <= 1111
      ? this.setState({
          mapHeight: 560,
          mapWidth: 92,
          body_marginBottom: 0,
        })
      : window.innerWidth <= 1120
      ? this.setState({
          mapHeight: 633,
          mapWidth: 92,
          body_marginBottom: 0,
        })
      : this.setState({
          mapHeight: 633,
          mapWidth: 94,
          body_marginBottom: 0,
        });
  }

  componentDidMount = async () => {
    
    this.props.setFindaGym(1);
    let cityProps, countryProps;
    this.props.location.state
      ? ((cityProps = this.props.location.state.city),
        (countryProps = this.props.location.state.country),
        this.getGymOn_Country_GymName(
          this.props.location.state.city,
          "cityName"
        ),
        this.setState({ countryName: countryProps }))
      : await this.getCurrentLocation();

    this.getNumberOfColumns();
    this.getAllAmenities();
    this.getAllActivities();
    // let country = countryList().getData();
    let country = csc.getAllCountries();
    // console.log(country[0].name, cityProps, countryProps);
    this.setState({ options: country });
  };

  componentWillUnmount=()=>{
    this.props.setNullUnderLine(1);
  }

  currentAddress = (e) => {
    // console.log("google address", e)
    e.map((data) =>
      data.types.map((type) =>
        type == "country"
          ? // console.log("google address", type, data.formatted_address),
            this.setState({ countryName: data.formatted_address })
          : null
      )
    );
    // console.log("google address", e);
  };

  getCurrentLocation = async () => {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        longitude: position.coords.longitude,
        latitude: position.coords.latitude,
      });
      longitude = position.coords.longitude;
      latitude = position.coords.latitude;
      const geocoder = new google.maps.Geocoder();
      const latlng = new google.maps.LatLng(
        position.coords.latitude,
        position.coords.longitude
      );
      
      geocoder.geocode({ location: latlng }, this.currentAddress);

      // console.log("Latitude is :", position.coords.latitude,);
      // console.log("Longitude is :", position.coords.longitude);
      this.GetAllGyms(position.coords.latitude, position.coords.longitude);
      this.props.setLatitute(position.coords.latitude);
      this.props.setLongitute(position.coords.longitude);
    });
  };

  GetAllGyms = (lat, long) => {
    this.loaderHandler();
    // let distance = maxDis;
    // let activityValue = activity;
    // let category = category;
    const user = JSON.parse(localStorage.getItem("userData"));
    let searchFiled = "";
    if (user) {
      searchFiled = `&user_id=${user._id}`;
    }
    if (activity != "Activities") {
      searchFiled = `${searchFiled}&activities=${activity}`;
    }
    if (category != "Categories") {
      searchFiled = `${searchFiled}&amenities=${category}`;
    }
    if (maxDis > 0) {
      searchFiled = `${searchFiled}&maxDistance=${maxDis}`;
    }
    // console.log("filter searchable data === ", searchFiled, "jhjh");
    axios
      .get(`${Api.API_URL}/gym-list?userLat=${lat}&userLong=${long}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // console.log("gym-list", res);
        if (res.data.response_code == 2000) {
          const responseData = res.data.response_data.docs;
          // console.log("gym-list response data", responseData);
          this.setState({ locationData: responseData, totalGym: res.data.response_data.total});
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

  getAllAmenities = () => {
    axios
      .get(`${Api.API_URL}/gym-amenities-list`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // console.log("amenities", res);
        if (res.data.response_code == 2000) {
          const responseData = res.data.response_data;
          // console.log("amenities response data", responseData);
          this.setState({ amenitiesData: responseData });
        } else {
          console.log("amenities Info  " + res.data.response_message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  getAllActivities = () => {
    axios
      .get(`${Api.API_URL}/gym-activities-list`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // console.log("activities", res, res.data.response_code);
        if (res.data.response_code == 2000) {
          const responseData = res.data.response_data;
          // console.log("activities response data", responseData);
          this.setState({ activitiesData: responseData });
        } else {
          console.log(" activities Info  " + res.data.response_message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  getGymOn_Country_GymName = (value, fieldName) => {
    let searchData = "";
    // let lat = 0;
    // let long = 0;
    let searchFiled = "";
    
    this.loaderHandler();
    const user = JSON.parse(localStorage.getItem("userData"));

    if (user) {
      searchFiled = `&user_id=${user._id}`;
    }

    if (activity != "Activities") {
      searchFiled = `${searchFiled}&activities=${activity}`;
    }

    if (category != "Categories") {
      searchFiled = `${searchFiled}&amenities=${category}`;
    }

    if (fieldName == "countryName") {
      searchData = `&country=${value}${searchFiled}`;
    }
    if (fieldName == "cityName") {
      searchData = `&city=${value}${searchFiled}`;
    }

    // if(distance != 0){
    //     searchFiled = `${searchFiled}&maxDistance=${distance}`;
    // }

    // if (fieldNmae == "inputGym") {
    //   searchData = `globalSearch=${value}`;
    // }

    console.log(" search data   ", searchData);
    axios
      .get(`${Api.API_URL}/gym-list?page=1${searchData}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // console.log("country gym", res, res.data.response_code);
        if (res.data.response_code == 2000) {
          const responseData = res.data.response_data.docs;
          // console.log("country gym response data", responseData);
          
          

          // if(responseData.length > 0){
          //  let lat = responseData[0].lat;
          //  let long = responseData[0].long;
          // console.log("hrtfgy",)
          //   console.log("hrtfgy",responseData[0].lat)
          //   }

          if(!this.state.isGoogleSearch)
          {
           
          if(responseData.length > 0){
            latitude = responseData[0].lat;
            longitude = responseData[0].long;
            console.log("hrtfooogy",responseData[0].lat)
          } else {
            latitude = this.props.latitude;
            longitude = this.props.longitute;
          }
        }
          // console.log('country gym response data lat long ',lat,latitude,long,longitude)
          if(!responseData){
            // console.log("jfhksdkjsd",responseData)
            this.setState({
              locationData: [],
              // latitude: lat,
              // longitude: long,
              totalGym: res.data.response_data.total,
              isGoogleSearch: false,
            });
          } else{
            // console.log("jfhksdkjsd",responseData)
          this.setState({
            locationData: responseData,
            // latitude: lat,
            // longitude: long,
            totalGym: res.data.response_data.total,
            isGoogleSearch: false,
          });
        }
          this.loaderHandler();
        } else {
          console.log(" country gym Info  " + res.data.response_message);
          this.loaderHandler();
        }
      })
      .catch((error) => {
        console.error(error);
        this.loaderHandler();
      });
  };

  handleCategories = (e) => {
    category = e.target.value;
    // console.log(" select  ", e.currentTarget.value);
    this.setState({ CategoryValue: e.target.value });
  };

  handleActivities = (e) => {
    activity = e.target.value;
    // console.log(" select  ", e.currentTarget.value);
    this.setState({ activityValue: e.target.value });
  };

  handleDistance = (e) => {
    maxDis = e.target.value;
    // console.log(" select  ", e.currentTarget.value);
    this.setState({ distanceValue: e.target.value });
  };

  // handleInputData = (e) => {
  //   e.persist();
  //   this.setState({ inputFieldValue: e.target.value });
  //   setTimeout(() => {
  //     // console.log("Input Data ", e.target.value);
  //     this.getGymOn_Country_GymName(e.target.value, "inputGym");
  //   }, 3000);
  // };

  handleCountryNmae = (e) => {
    let countryName = "";
    // if(e.currentTarget.value != null){
    countryName = e.currentTarget.value.toLowerCase();
    // console.log("country name", countryName);
    this.setState({ countryName: e.currentTarget.value ,isGoogleSearch: false, zoom: 7});
    this.getGymOn_Country_GymName(countryName, "countryName");
    // }
  };

  // optionHandleCountryNmae= (country)=>{
  //   let countryName = country.toLowerCase();
  //   console.log("country name", countryName);
  //   this.setState({ countryName: country });
  //   this.getGymOn_Country_GymName(countryName, "countryNmae");
  // }

  onPlaceSelected = (e) => {
    let city ='';
    let country ='';
    e.address_components.map(area=>{
      area.types.map(areaType=>{
        areaType == "locality"?
        city = area.long_name
        : null
        
      })
      // city == ''?
      // area.types.map(areaType=>{  
      //   areaType == "country"?
      //   country = area.long_name
      //   : null
      // })
      // : null
    })
    console.log("google address", e)
    let lat = e.geometry.location.lat();
    let long = e.geometry.location.lng();
    let length = e.address_components.length;
    let countryName = "";
    e.address_components.map((data) =>
      data.types.map((type) =>
        type == "country"
          ? (console.log("google address", type, data.long_name),
            (countryName = data.long_name))
          : null
      )
    );
    longitude = long;
    latitude = lat;
    this.setState({
      countryName,
      isGoogleSearch: true,
      // latitude: lat,
      // longitude: long,
      zoom: 11
    });
    // console.log(" Auto search ", e, lat, long);
    // city != ''?
    this.getGymOn_Country_GymName(city, "cityName")
    // : 
    // this.getGymOn_Country_GymName(country, "countryName")
    
  };
  // paramsDataHandle=(name)=>{
  //   console.log('hello ',name);
  // }

  handleSingleGymStore =(gymdetail) =>{
    localStorage.removeItem("PassDetails")
    localStorage.setItem('SingleGymData', JSON.stringify(gymdetail));
    let SingleGymId = {SingleGymId: gymdetail._id}
    localStorage.setItem('SingleGymId', JSON.stringify(SingleGymId));
  }
  fetchPlaces(mapProps, map) {
    const {google} = mapProps;
    const service = new google.maps.places.PlacesService(map);
    // console.log("service",service,"google",google)
  }
  render() {
    const distance = [];
    for (let i = 2; i <= 100; i++) {
      distance.push(
        <option key={i} value={i}>
          {i} km
        </option>
      );
    }
    // console.log(
    //   "lat long ",
    //   parseFloat(this.state.latitude),
    //   this.state.longitude.toFixed(2),
    //   maxDis,
    //   activity
    // );
    // this.props.location.state?(
    // console.log("name",this.props.location.state.city)
    // ):null
    
    // let  useRef= useRef();
    // const zoom = this.state.zoom;
    // const bounds = this.state.bounds;
    // const points = this.state.locationData.map((data, index) => ({
    //  type:"feature",
    //  properties: {
    //    cluster: false,
    //    clusterId: data._id,
    //  },
    //  geometry: {
    //    type: 'point',
    //    coordinates: [
    //      parseFloat(data.lat),
    //      parseFloat(data.long)
    //    ]
    //  }
    // }))

    // const {clusters} = useSupercluster({
    //   points,
    //   bounds,
    //   zoom,
    //   options:{radius: 75,maxZoom: 20}
    // })
    
  //   const index = new Supercluster({
  //     radius: 40,
  //     maxZoom: 16
  // });
  // index.load(points);
  // index.getClusters([-180, -85, 180, 85], this.state.zoom);
  // console.log("clusters", index);

    return (
      <React.Fragment>
        <div style={{height:100}}></div>
        <div
          className="innnerban Sticky"
          style={{ position: "fixed", top: 0, zIndex: 100 ,backgroundColor: '#000080'}}
        >
          <Headers backgroundColor="#000080" />
        </div>

        {/* --  body section  -- */}

        <div
          style={{ marginBottom: this.state.body_marginBottom }}
          className=""
        >
          <div className="container">
            <div className="row" style={{}}>
              <div className="col-lg-7">
                <div id="maptopLeft-upper-div">
                  <div className="maptopLeft" style={{ backgroundColor: "" }}>
                    
                    <a style={{ display: "inline-flex", paddingTop: 6 }}>
                      <img src={marker} alt="" style={{ paddingRight: 5, width:25,height:20,marginTop:10}} />
                      {/* <i class="fa map-marker-alt" aria-hidden="true"></i> */}
                      <select
                        className="custom-select countryList"
                        onChange={this.handleCountryNmae}
                        value={this.state.countryName}
                        // onClick={this.handleCountryNmae}
                        // onSelect={this.handleCountryNmae}
                        
                      >
                        <option value="null"className="countryOption">Select country</option>
                        {this.state.options.map((item, index) => (
                          <option
                            key={index}
                            className=""
                            value={item.name}
                          >
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </a>

                    <a>
                      
                      <img
                        src={search1}
                        alt=""
                        style={{ paddingRight: 5, width: 22  ,height: 17 }}
                      />{" "}
                      <Autocomplete
                        placeholder="Search City"
                        style={{
                          width: "80%",
                          height: "30px",
                          // paddingLeft: '16px',
                          // marginTop: '2px',
                          // marginBottom: '100px'
                        }}
                        onPlaceSelected={this.onPlaceSelected}
                        types={["(regions)"]}
                      />
                      {/* <input
                        value={this.state.inputFieldValue}
                        onChange={this.handleInputData}
                        className="gymSearchInput"
                        placeholder="Find a gym"
                      />{" "} */}
                    </a>

                  </div>
                </div>
                <div className="scroll_left">
                  <p>{this.state.totalGym} Fitness Clubs in {this.state.countryName != "null"?this.state.countryName:('')}</p>
                  <ul>
                    {/* {console.log(this.state.locationData)} */}
                    {this.state.locationData.length > 0 ? (
                      this.state.locationData.map((item, index) => (
                        <Link key={index}
                          to={{
                            pathname: `/gym-details-${item._id}`,
                            state: {
                              data: item,
                            },
                          }}
                          onClick={()=>this.handleSingleGymStore(item)}
                        >
                        <li>
                          {" "}
                          <img
                            src={
                              item.banner_image
                                ? item.banner_image
                                : sample_logo
                            }
                            alt=""
                            style={{ height: 110, width: 120, marginBottom: 7 }}
                            id="gymlogo"
                          />
                          <h5>{item.name}</h5>
                          <span>
                            <img src={marker2} alt="" style={{width:13,height:16}} /> {item.address}
                          </span>
                          <p>{item.description.slice(0, 130)} ...</p>
                        </li>
                        </Link>
                      ))
                    ) : (
                      <b
                        style={{
                          color: "#cccccc",
                          display: "flex",
                          justifyContent: "center",
                          alignSelf: "center",
                          fontSize: 16,
                          marginTop: 40,
                        }}
                      >
                        Gym not found!
                      </b>
                    )}
                  </ul>
                </div>
              </div>
                
                {/* Filtering gym */}


              <div className="col-lg-5" style={{ height: "100%" }}>
                <div className="mapcatoTop" style={{ marginTop: 30 }}>
                  <select
                    name=""
                    id=""
                    onChange={this.handleCategories}
                    value={category}
                  >
                    <option value="Categories">All Amenities</option>
                    {this.state.amenitiesData.map((data, index) => (
                      <option key={index} value={data.name}>
                        {data.name}
                      </option>
                    ))}
                  </select>
                  <select
                    name=""
                    id=""
                    onChange={this.handleActivities}
                    value={activity}
                  >
                    <option value="Activities">Activities </option>
                    {this.state.activitiesData.map((data, index) => (
                      <option key={index} value={data.name}>
                        {data.name}
                      </option>
                    ))}
                  </select>
                  <select
                    name=""
                    id=""
                    onChange={this.handleDistance}
                    value={maxDis}
                  >
                    <option value={0}>Distance </option>
                    <option value={1}> 1 km </option>
                    {distance}
                  </select>
                </div>

                <MapView latitude={latitude} longitude={longitude} mapWidth={this.state.mapWidth} mapHeight={this.state.mapHeight} locationData={this.state.locationData} google={this.props.google} zoom={this.state.zoom}/>

              </div>
            </div>
          </div>
        </div>


        {this.state.loader ? <Loader modalToggle={this.state.loader} /> : null}

        
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
  centerMoved=(e)=>{
    console.log("drage",e);
  }
}
// zoomControl=(e)=>{console.log("Zoom control ====",e)}

const mapStateToProps = state => {
  // console.log('Current lat lung state',state);
  return {
    latitude: state.CurrentLatLung.lat,
    longitute: state.CurrentLatLung.lung
  };
};

const mapPropsToState = dispatch => {
  // console.log('dispatch');
  return {
    setFindaGym: async no => await dispatch({type: FINDAGYM, payload: no}),
    setNullUnderLine: async no => await dispatch({type: CLOSEUNDERLINE, payload: no}),
    setLatitute: async no => await dispatch({type: CURRENT_LAT, payload: no}),
    setLongitute: async no => await dispatch({type: CURRENT_LUNG, payload: no}),
  };
};


export default connect(
  mapStateToProps,
  mapPropsToState,
)(GoogleApiWrapper({
  apiKey: "",
})(FindGym));
