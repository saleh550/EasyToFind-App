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
//set google place in the state
const setGooglePlace=(googlePlace)=>{
    console.log(googlePlace)

    localStorage.setItem('busOwnPlaces',JSON.stringify(googlePlace))
    return googlePlace

}
//create place by business owner
const createPlace= async(formData)=>{
   
    const response=await axios.post(API_URL+'/create/place',formData);
    if(response.data){
        localStorage.setItem('busOwnPlaces',JSON.stringify(response.data))
    }
    return response.data
}
//upload images to s3 and return ther url
const uploadImages=async(fromdata)=>{
    const response =await axios.post(API_URL+'/upload/images',fromdata);
    if(response.data){
        localStorage.setItem('busOwnPlaces',JSON.stringify(response.data))
    }
    return response.data
}

const busOwnPlacesService={
    getPlaces,
    checkPlaceExist,
    setGooglePlace,
    clear,createPlace,
    uploadImages
}

export default busOwnPlacesService