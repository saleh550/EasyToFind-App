import ImagesCarousel from "./ImagesCarousel"
import {Link} from 'react-router-dom'


function PlaceItem({place}){
    return (
        
    <div className=" place-item">   
    <ImagesCarousel key={place._id} place={place}/>
    <h5 onClick={console.log(place.name)}>{place.name}</h5>
    <button onClick={()=>console.log(place.name)}>{place.type}</button>
    <Link to={`/${place._id}`} >{place.type}</Link>
    </div>)
    
}

export default PlaceItem