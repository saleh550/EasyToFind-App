import Header from "../components/Header"
import Spinner from '../components/Spinner'
import OpeningHours from "../components/OpeningHours";
import Map from "../components/Map";
import {useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom";
import {FcAddImage} from 'react-icons/fc'
import {MdOutlineAddBusiness} from 'react-icons/md'
import {TiArrowBackOutline} from 'react-icons/ti'
import {BsImages} from 'react-icons/bs'
import {toast} from 'react-toastify'
import { useDispatch,useSelector } from "react-redux";
import {createPlace,reset,uploadImages} from '../features/businessOwnerPlaces/busOwnPlacesSlice'

function NewPlace(){
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {isLoading,isError,place,message,isSuccess,imagesUrl}=useSelector(state=>state.busOwnPlaces)
    const [workingHours,setWorkingHours]=useState()
    const [location,setLocation]=useState({
        lat:null,
        lng:null
    })
    const [images,setImages]=useState([])
    const [formData,setFormData]=useState({
        email:'',
        password:'',
        name:'',
        phone:'',
        description:'',
        facebook_url:'',
        instagram_url:'',
        whatsapp_url:'',
        opening_hours:null,
        location:{
            type: "Point",
            coordinates: [0,0]
          },
        images:[]
        

    })
    useEffect(()=>{
       
        if(isError){
            toast.error(message)
        }
        if(isSuccess && Object.keys(place).length>0){ 
        navigate('/business/owner')
           
        }
        dispatch(reset())
        

    },[dispatch,navigate,isError,isSuccess,place,message,imagesUrl])
    const WorkingHours=(workHours)=>{
        setWorkingHours(workHours)
    }
    const getLocation=(loc)=>{
        setLocation(loc)
    }
    const onSubmit=(e)=>{
       
        e.preventDefault()
        //check if all details fill In
        if(
            formData.name.length===0||
            formData.phone.length===0||
            formData.description.length===0||
            formData.password.length===0||formData.email.length===0)
        {
        toast.error("Missing Details !")
        return
        }
        //check phone number 
        if(formData.phone.length===10){
            var i=0;
            for( i=0;i<formData.phone.length;i++){
               if(isNaN(formData.phone[i])){
                toast.error("Phone number has failed , Make sure the number is correct ")
                
                return
               }
    
            }
        }else{
            toast.error("Phone number has failed , Make sure it contains 10 digits ")
            return
        }
        //check password 
        if(formData.password.length < 6){
            toast.error("Password should contain 6 letters/numbers or more")
            return
        }
        setFormData((prevState)=>{
            return ({
                ...prevState,
                images:imagesUrl,
                opening_hours:workingHours,
                location:{
                    type: "Point",
                    coordinates: [location.lat,location.lng]
                  },
                
            })
            
        })
        

        
        dispatch(createPlace({formData:formData}))
        // dispatch(reset())
       
        

            

    }
    const onChooseImages=(e)=>{
        e.preventDefault()
        const files=e.target.files
        if(!files){
            toast.warn("Something in selcet images is wrong ,try again")
        }
        setImages(files)
        const formdata=new FormData()
        for(var i=0;i<files.length;i++){
            formdata.append('businessImages',files[i])
        }
        dispatch(uploadImages(formdata))
        
    }
    return(
        <>
            {isLoading&& <Spinner/>}
            <div className="home-header">
                <Header/>
                <MdOutlineAddBusiness className="text-white-50 w-25 h-25"/>
                <h2 className="text-white-50">Creating New Business Place</h2>
            </div>
            <button onClick={()=>{navigate('/businessowner/login')}} type="button" class="btn btn-outline-secondary mt-3 ml-3"><TiArrowBackOutline/> Back</button>
            <div className="mt-2 ml-3 mr-3">
                <form onSubmit={onSubmit} >
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label >Business Name:</label>
                        <input onChange={(e)=>{setFormData((prev)=>{return({...prev,name:e.target.value})})}} value={formData.name} type="name" className="form-control" id="inputEmail4" placeholder="Name"/>
                    </div>
                    <div className="form-group col-md-6">
                        <label >Phone Number:</label>
                        <input onChange={(e)=>{setFormData((prev)=>{return({...prev,phone:e.target.value})})}} value={formData.phone} type="name" className="form-control" id="inputEmail4" placeholder={"Phone"}/>
                    </div>
                    <div className="form-group col-md-6">
                        <label  for="inputEmail4">Email</label>
                        <input onChange={(e)=>{setFormData((prev)=>{return({...prev,email:e.target.value})})}} value={formData.email} type="email" className="form-control" id="inputEmail4" placeholder="Email"/>
                    </div>
                    <div className="form-group col-md-6">
                        <label for="inputPassword4">Password</label>
                        <input onChange={(e)=>{setFormData((prev)=>{return({...prev,password:e.target.value})})}} value={formData.password} type="password" className="form-control" id="inputPassword4" placeholder="Password"/>
                    </div>
                    <div className="form-group col-md-6">
                        <label >Facebook URL :</label>
                        <input onChange={(e)=>{setFormData((prev)=>{return({...prev,facebook_url:e.target.value})})}} value={formData.facebook_url} type="link" className="form-control" id="inputEmail4" placeholder="https://facebook.com/Example"/>
                    </div>
                    <div className="form-group col-md-6">
                        <label >Instagram URL:</label>
                        <input onChange={(e)=>{setFormData((prev)=>{return({...prev,instagram_url:e.target.value})})}} value={formData.instagram_url} type="link" className="form-control" id="inputEmail4" placeholder="https://instagram.com/Example"/>
                    </div>
                    
                    <div className="form-group col-md-6 col-sm-2 ">
                        <label for="floatingTextarea2">Description:</label>
                        <textarea onChange={(e)=>{setFormData((prev)=>{return({...prev,description:e.target.value})})}} value={formData.description} className="form-control  h-25" placeholder="Leave a description about your business here" id="floatingTextarea2" style={{"height":"30vh","width":"100%"}}></textarea>
                        <label for="floatingTextarea2">Set your Location Business:</label>
                        <Map getLocation={getLocation}/>
                        
                    </div>
                    
                    
                    <div className="form-group col-md-6 col-sm-2 ">
                        
                        <label className="mr-3 mt-3">Opening Hours :</label>
                        <OpeningHours WorkingHours={WorkingHours}/>
                    </div>
                   
                    <div className="form-group  col-md-6 col-sm-2 "  >
                        <label>Add Images:</label>
                        <label style={{"fontSize":"30px"}}>
                        <FcAddImage className="icon w-100 h-100"/>
                        <input style={{"display":"none"}} onChange={onChooseImages} type='file' multiple accept="image/*"/>
                        </label>
                        {imagesUrl.length>0?<p className="text-success">{imagesUrl.length} Images Uploaded</p>:<p className="text-secondary"> No Selected Images Yet .</p>}
                        
                    </div>
                    

                   
                    <div className="form-group  col-md-12 col-sm-2 " style={{"textAlign":"center"}} >
                        <button type="submit" className="btn btn-primary btn-success w-25 m-1">Add</button>
                        <button className="btn btn-primary btn-light w-25 m-1">Reset</button>

                    </div>
                </div>
                </form>
            </div>
        </>
        
    )

}
export default NewPlace