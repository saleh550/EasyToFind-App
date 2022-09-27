import {useSelector} from 'react-redux'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ImagesCarousel from '../components/ImagesCarousel'
import Header from '../components/Header'
import {FcHome} from 'react-icons/fc'
import {GiPositionMarker} from 'react-icons/gi'
import {FcRating} from 'react-icons/fc'
import {BsDoorOpenFill} from 'react-icons/bs'
import {BsFillDoorClosedFill} from 'react-icons/bs'
import {CgWebsite} from 'react-icons/cg'


function PlaceInformation(){
    const {place}=useSelector(state=>state.places)
    const navigate=useNavigate()
    
    useEffect(()=>{
        if(!place){
            navigate('/')
        }
    },[place])
   
    return (
        <>
     
        <Header/>
        <div className="container mt-5 py-5 px-5 ">
            
            <ImagesCarousel place={place}/>
            <div className='text-black-50'>
            <h2 className='mb-3 mt-5'><FcHome/> {place.name}</h2>
            <h3 className='mb-3'><GiPositionMarker/> {place.formatted_address}</h3>
            <h3 className='mb-3'><FcRating/> Rating : {place.rating}</h3>
            {place.isopen?(<h3 className='mb-3 text-success'><BsDoorOpenFill/> Open !</h3>):<h3 className='mb-3 text-danger'><BsFillDoorClosedFill/> Close</h3>}
            {place.web_site&&<a href={place.web_site} className='mb-3 fs-1'><CgWebsite/> visit us in our website </a>}
            <br></br>
            <div className=" mt-5 d-flex  flex-column" /*style={{"backgroundColor":"red"}}*/>
                <button className='btn btn-success mb-3 py-3 mx-5'>Add To My List</button>
                <Link to='/' className='btn btn-dark py-3 mx-5'>Back</Link>
            </div>
          
            </div>
            

            

        </div>
        </>
        
)
}
export default PlaceInformation