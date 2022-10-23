import {GoogleMap,useLoadScript, MarkerF } from "@react-google-maps/api";
import { useState } from "react";


function Map(){
    const [position,setPosition]=useState({lat:null,lng:null})
    const {isLoaded}=useLoadScript({
    googleMapsApiKey:process.env.REACT_APP_API_KEY
    })
    if(!isLoaded){
        return <h1>Loading ...</h1>
    }
    // const [position,setPosition] =useState({lat:32.255134 ,lng:35.186776})
    
    const onClick=(ev)=>{
     setPosition({
        lat:ev.latLng.lat(),
        lng:ev.latLng.lng()
     })   
    }
    return <div>
        <GoogleMap onClick={onClick} center={{lat:32.255134,lng:35.186776}} zoom={8} mapContainerClassName='map-container '>
        {/* <Marker position={{lat: 32.255134 ,lng: 35.186776}}/> */}
        <MarkerF  position={position}/>
        
        </GoogleMap>
        
    </div>
}
export default Map