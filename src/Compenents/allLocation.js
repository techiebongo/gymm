/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
import React from "react";
import "../Utils/style.css";
import csc from "country-state-city";
import continentData from "./continent-data";
import { Link } from "react-router-dom";

class AllLocation extends React.Component {
  constructor() {
    super();
    this.state = {
     
      selectedCountries: "",
      selected: [],
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
    this.setAllLocationData();
  };

  setAllLocationData = () => {
    const { locationData } = this.state;
    // console.log(" country ===", csc.getAllCountries());
    // console.log(
    //   " city ===",
    //   csc.getStatesOfCountry("101"),
    //   "Countries",
    //   // continentData.ContinentalData
    // );
    let continentName = continentData.ContinentalData;
    let countryname = csc.getAllCountries();

    locationData.map((locationItem, locationIndex) => {
      continentName.map((continentItem) => {
        if (
          locationItem.name.toLowerCase() === continentItem.region.toLowerCase()
        ) {
          countryname.map((countryItem, countryIndex) => {
            if (
              continentItem.name.toLowerCase() ===
              countryItem.name.toLowerCase()
            ) {
              locationData[locationIndex].countryData.push(countryItem);
            }
          });
        }
      });
    });
    this.setState({ locationData });
  };

  render() {
    const { locationData } = this.state;
    console.log("locationData  ", locationData);

    return (
      <React.Fragment>
        
              <div>
                {locationData.map((locationItem, locationIndex) => (
                  <div key={locationIndex} className=''>
                    <div className="col-lg-12 mt-5">
                      <h4> {locationItem.name.toUpperCase()} </h4>
                    </div>
                    <div className="col-lg-12">
                      <div className="row unistate">

                        {locationItem.countryData.map(
                          (countryItem, countryIndex) => (

                            <div key={countryIndex} className='col-lg-2 col-md-6 col-sm-6'>
                              <h4>{countryItem.name}</h4>

                              {csc
                                .getStatesOfCountry(countryItem.id)
                                .map((stateItem, stateIndex) => (
                                  <div
                                    key={stateIndex}
                                    
                                  >
                                    <div className="row">
                                      <ul className="">
                                        <li>
                                          <span>{stateItem.name}</span>
                                        </li>

                                        {csc
                                          .getCitiesOfState(stateItem.id)
                                          .map((cityItem, cityIndex) => {
                                            return (
                                              <div key={cityIndex}>
                                                <li>
                                                  <Link
                                                    to={{
                                                      pathname: "/Find_a_Gym",
                                                      state: {
                                                        name: cityItem.name,
                                                      },
                                                    }}
                                                    style={{ color: "#343434" }}
                                                  >
                                                    {cityItem.name}
                                                  </Link>
                                                </li>
                                              </div>
                                            );
                                          })}
                                      </ul>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
              </div>
        
      </React.Fragment>
    );
  }
}

export default AllLocation;
