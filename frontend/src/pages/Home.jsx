import {useSelector,useDispatch} from 'react-redux'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import Header from '../components/Header'
import {AiOutlineSearch} from 'react-icons/ai'
import {BsScissors} from 'react-icons/bs'
import PlaceItem from '../components/PlaceItem'
import coers from 'cors'
import { useEffect } from 'react'
import axios from 'axios'
import {getPlaces} from '../features/places/placesSlice'
import NotFoundPlaces from '../components/NotFoundPlaces'
import PlacesList from '../components/PlacesList'
import Spinner from '../components/Spinner'


function Home(){
    const {user}=useSelector(state=>state.auth)
   const {places,isLoading}=useSelector(state=>state.places)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [textSearch,setTextSearch]=useState("")
    


    //fetch places from google maps 
    const fetchPlaces=(e)=>{
        e.preventDefault()
        console.log(textSearch)
     dispatch(getPlaces({textSearch:textSearch}))
    } 


    if(isLoading){
        return( <div>
            <header className='home-header'>
        
        <Header/>
     <section className='home-search'>
         <form className="d-flex" role="search" onSubmit={fetchPlaces}>
             <input 
              className="form-control me-2" 
              type="search" 
              name="textSearch"
              placeholder="Search For Places" 
              aria-label="Search"
              value={textSearch}
              onChange={(e)=>{setTextSearch(e.target.value) }}
             />
             <button className="btn btn-outline-success" type="submit">Search</button>
         </form>
     </section>
       
         
        </header>
         <Spinner/></div>)
    }
  
    return(
        <>
 
       
        <header className='home-header'>
        
           <Header/>
           
            <section className='home-search ' >
                <form className="d-flex" role="search" onSubmit={fetchPlaces}>
                    <input 
                    className="form-control me-2" 
                    type="search" 
                    name="textSearch"
                    placeholder="Search For Places" 
                    aria-label="Search"
                    value={textSearch}
                    onChange={(e)=>{setTextSearch(e.target.value) }}
                    />
                    <button className="btn btn-success" type="submit">Search</button>
                </form>
            </section>   
        </header>
        {places.length!==0?(
                <PlacesList/>
                ):(
                <NotFoundPlaces/>)} 
        </>  
    )
}
export default Home 