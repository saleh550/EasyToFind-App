import {useSelector} from 'react-redux'
import PlaceItem from './PlaceItem'
function ListPlaces(){
    const {places}=useSelector(state=>state.places)
    return(
        <div className='row home-main'>
        {places.map((place)=>{
            return(
                <div className='col-sm-6 col-md-4 col-lg-3 sa'>
                <PlaceItem id={place._id.toString()} key={place._id} place={place} />
                </div>
            )
         
        })}  
   </div>
    )
}
export default ListPlaces