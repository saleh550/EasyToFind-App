import {Link, useNavigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import ImagesCarousel from './ImagesCarousel'
import {setPlace} from '../features/places/placesSlice'
function PlaceItem({place}){
    const navigate=useNavigate()
    const dispatch=useDispatch()

    const moreInfo=()=>{
        dispatch(setPlace(place))
        navigate(`place/info/${place._id}`)

    }
    return (
    <div 
    onClick={moreInfo}
    className='item px-2' 
    style={place.photos?
    ({"backgroundImage":`url('${process.env.REACT_APP_GOOGLE_REQUIST_PHOTO}photo_reference=${place.photos[0]}&key=${process.env.REACT_APP_API_KEY}&maxheight=300&maxwidth=300')`})
    :({"backgroundImage":"url('https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg')"})}
    >
    <div>
    <h4  className='text-white'>{place.name}</h4>
    <br/>
    <p className='text-white-50'>{place.formatted_address}</p>
    <br/>
    <p className='text-white-50'>{place.type}</p>

    </div>
    
    </div>
     
     ) 
}

export default PlaceItem