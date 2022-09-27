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
    <div class="card place-item" >
        {place.photos?<img src={`${process.env.REACT_APP_GOOGLE_REQUIST_PHOTO}photo_reference=${place.photos[0]}&key=${process.env.REACT_APP_API_KEY}&maxheight=300&maxwidth=300`} class="d-block w-100" alt="image"/>:<img src="https://media.istockphoto.com/vectors/no-image-available-sign-vector-id922962354?k=20&m=922962354&s=612x612&w=0&h=f-9tPXlFXtz9vg_-WonCXKCdBuPUevOBkp3DQ-i0xqo=" class="d-block w-100" alt="image"/>}
       
        <div class="card-body">
            <h5 class="card-title">{place.name}</h5>
            <p class="card-text">{place.type}</p>
            {place.isOpen?<p className="card-text text-success">open</p>:<p className="text-danger">close</p>} 
            <div className="btn-group me-2">
                <button style={{"width":"5rem"}} href="#" class="btn btn-success btn-sm">Add</button>
                <button style={{"marginLeft":" 5px"}}  onClick={moreInfo} className="btn btn-dark btn-sm">More</button>
                {place.web_site&&<a target="_blank" rel="noopener noreferrer" style={{"marginLeft":" 5px"}} href={place.web_site} class="btn btn-dark btn-sm">Visit us</a>}
            </div>
        </div>
    </div>
     
     ) 
}

export default PlaceItem