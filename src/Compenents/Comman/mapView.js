import React, { useRef, useState } from "react";
import axios from "axios";
import Api from "../../Url";
import useSupercluster from 'use-supercluster';
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

export default function MapView(props){
    const UseRef = useRef();
    
    return(
        <div className="mapmn">
                  {/* <img src={map_top} alt="" /> */}
                  {/* {console.log(
                    "map lat long ",
                    this.state.longitude,
                    longitude,
                    this.state.latitude,
                    latitude
                  )} */}
                  <Map
                    id="map"
                    google={props.google}
                    zoom={props.zoom}
                    
                    style={{
                      width: `${props.mapWidth}%`,
                      height: props.mapHeight,
                      border: 1,
                    }}
                    initialCenter={{
                      lat: parseFloat(props.latitude),
                      lng: parseFloat(props.longitude),
                    }}
                    center={{
                      lat: parseFloat(props.latitude),
                      lng: parseFloat(props.longitude),
                    }}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) =>{
                      console.log("map, maps", map, maps)
                    }}
                    onChange={({zoom, bounds})=>{
                      const bound = [bounds.nw.lng,bounds.se.lat,bounds.se.lat,bounds.nw.lng]
                      console.log("zoom, bound", zoom, bound)
                    }}
                  >
                     {/* <Marker
                        position={{ lat: latitude, lng: longitude }}
                        // onClick={this.onMarkerClick}
                        
                      /> */}
                    {/* {clusters.map(cluster => {
                      const {long, lat} = cluster.geometry.coordinates;
                      const {cluster: isCluster, point_Count: pointCount} = cluster.properties;
                    })} */}
                    {props.locationData.map((data, index) => (
                      <Marker
                        position={{ lat: data.lat, lng: data.long }}
                        // onClick={this.onMarkerClick}
                        //name={'This is test name'}
                        key={index}
                      />
                    ))}
                  </Map>
                </div>
    );
}