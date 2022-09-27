import axios from 'axios'


const API_URL='/api/maps'


//get places from google maps api 
const getPlaces = async(textSearch)=>{

    const response=await axios.post(API_URL+'/places',textSearch);
    if(response.data){
        localStorage.setItem('places',JSON.stringify(response.data))
    }
    return response.data
}

//set specific place in the state
const setPlace =async(place)=>{
if(place){
localStorage.setItem('place',JSON.stringify(place))
}
return place
}
const placesService={
    getPlaces,
    setPlace
}

export default placesService