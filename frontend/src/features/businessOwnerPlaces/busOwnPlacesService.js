import axios from 'axios'


const API_URL='/api/maps'


//get places from google maps api 
const getPlaces = async(textSearch)=>{
    const response=await axios.post(API_URL+'/places',textSearch);
    if(response.data){
        localStorage.setItem('busOwnPlaces',JSON.stringify(response.data))
    }
    return response.data
}
//check if the place exist in the data base
const checkPlaceExist =async(googleId)=>{
    const response=await axios.post(API_URL+'/check/place',googleId);
    if(response.data){
        localStorage.setItem('busOwnPlaces',JSON.stringify(response.data))
    }
    return response.data
}

//clear state of places
const clear =()=>{
    localStorage.removeItem('places')
}

const busOwnPlacesService={
    getPlaces,
    checkPlaceExist,
    clear
}

export default busOwnPlacesService