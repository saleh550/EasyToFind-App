import {useEffect} from 'react'
import PlaceItem from './PlaceItem'
function ListPlaces({places,onChoose}){
    // const {places}=useSelector(state=>state.places)
   
    return(
        <div className='row home-main'>
        {places.map((place)=>{
            return(
                <div className='container col-sm-6 col-md-4 col-lg-3 sa'>
                <PlaceItem id={place._id.toString()} key={place._id} place={place} onChoose={onChoose} onDisable={false}/>
                </div>
            )
         
        })}  
   </div>
    )
}
export default ListPlaces