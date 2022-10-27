
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { useState,useEffect } from "react"
import { Link ,useNavigate} from "react-router-dom"
import Header from "../components/Header"
import { useSelector,useDispatch } from "react-redux"
import {getPlaces,checkPlaceExist,clear,setGooglePlace} from '../features/businessOwnerPlaces/busOwnPlacesSlice'
import PlacesList from '../components/PlacesList'
import Modal from 'react-modal'
import {TiBusinessCard} from 'react-icons/ti'
import PlaceItem from "../components/PlaceItem"
import Spinner from '../components/Spinner'
import axios from 'axios'


const customStyles={
    content:{
        width:'80%',
        top:'50%',
        left: '50%',
        right: 'auto',
        buttom:'auto',
        margin:'auto 5px',
        padding:'5px',
        transform: 'translate(-50%,-50%)',
        position: 'relative',
    }
}


function BusinessOwnerLogin(){
    const [item,setItem]=useState(null)
    const [itemToAdd,setItemToAdd]=useState(null)
    const [text,setText]=useState("")   
    const [userData,setUserData]=useState({
                email:'',
                password:''
            })
    const {email,password}=userData

    const navigate=useNavigate()

    const dispatch=useDispatch() 
    const {places,place,isSuccess,isLoading}=useSelector(state=>state.busOwnPlaces)


    const [modalIsOpen,setModalIsOpen]=useState(false)
    const openModal=()=> setModalIsOpen(true)
    const closeModal=()=> setModalIsOpen(false)
    
   useEffect(()=>{
    dispatch(clear())
   },[])

    const fetchPlaces=(e)=>{
        e.preventDefault()
        console.log(text)
        dispatch(getPlaces({textSearch:text}))
       
    }  
    const onClear=()=>{
        dispatch(clear())
        setText("")
        setItem(null)
        setItemToAdd(null)
    
    }
    const onChoose=async(googlePlace)=>{
        try{
            const placeId=googlePlace._id
            const response=await axios.post('/api/maps/check/place',{googleId:placeId});
            if(!response.data.isExist){
                setItem(null)
                setItemToAdd(googlePlace)
                openModal()
            }else{
            setItem(googlePlace)
            setItemToAdd(null)
            dispatch(clear())
            }
        }catch(error){
            throw new Error("somthing Wrong")
        }
        
    }
    const onAdd=()=>{
        dispatch(setGooglePlace(itemToAdd))
        navigate('/newplace')
    }
    if(isLoading){
                return(
            <div className="home-header">
             <Header/>
             <form onSubmit={fetchPlaces}>
                <h3 className="text-white-50 ">Search for your Business</h3> 
                <input 
                className=" mt-0"
                name='text'
                value={text}
                onChange={(e)=>{setText(e.target.value)}}    
                />
                <br/>
                <button className="btn btn-success btn-profile mt-3 mr-2" type="submit">Search</button>
                <button type="button" onClick={onClear} className="btn btn-light btn-profile mt-3 mr-2">Clear</button>
                <Link to='/newplace' className="btn btn-light btn-profile mt-3">New Business</Link>
             </form>
                <Spinner/>
            </div>
        )
    }
return(
    <>
        <div className="home-header">
            <Header/>
            <form onSubmit={fetchPlaces}>
                 <h3 className="text-white-50 ">Search for your Business</h3> 
                 <input 
                 className=" mt-0"
                 name='text'
                 value={text}
                 onChange={(e)=>{setText(e.target.value)}}    
                 />
                 <br/>
                 <button className="btn btn-success btn-profile mt-3 mr-2" type="submit">Search</button>
                 <button type="button" onClick={onClear} className="btn btn-light btn-profile mt-3 mr-2">Clear</button>
                 <Link to='/newplace' className="btn btn-light btn-profile mt-3">New Business</Link>
              </form>
        </div>
            {(!places||places.length==0)?(
                <div className="container mt-5" style={{"textAlign":"center"}}>
                <h1><TiBusinessCard/></h1>
                <h3 className="mb-2">Login as a business owner</h3>
                <form>
                <div className='col  profile-data mr-4'>
                    {item&&<PlaceItem place={item} onDisable={true}/>}
                    <div className='row-sm mt-4'>
                        <label className="text-dark d-none d-lg-inline" disabled>email:</label>
                        <input
                        type='email'
                        placeholder='Email'
                        id='email'
                        name='email'
                        value={email}
                        onChange={(e)=>{setUserData({email:e.target.value})}}
                        required
                    
                    />
                    </div>
                    <div className='row-sm mt-4'>
                        <label className="text-dark d-none d-lg-inline" disabled>pass:</label>
                        <input
                            type='password'
                            placeholder='Password'
                            id='password'
                            name='password'
                            value={password}
                            onChange={(e)=>{setUserData({password:e.target.value})}}
                            required
                    
                        />
                    </div>
                </div>
                 <button className='btn btn-dark text-light btn-profile btn-profile-login mt-5' type='submit'>login</button>

                </form>
                </div>
            ):(<PlacesList onChoose={onChoose} places={places}/>)}
            
            {}
            <Modal isOpen={modalIsOpen} onRequestClose ={closeModal} style={customStyles}  ariaHideApp={false} contentLabel='Update User' >
                 <h6>This business is not managed on our site, do you want to add and register with it ?</h6>
                    <PlaceItem place={itemToAdd} onDisable={true}/>
                 <div className='btn-group'>
                 <button onClick={onAdd} className='btn btn-light'>Accept</button>
                 <button onClick={closeModal} className='btn btn-light'>Cancel</button>

                 </div>
            </Modal>
       
    </>
)


}
export default BusinessOwnerLogin