import {useSelector} from 'react-redux'
import {useEffect,useState} from 'react'
import Header from '../components/Header'
import {BiSave} from 'react-icons/bi'
import {MdOutlineCancel} from 'react-icons/md'
import {MdOutlineSettingsBackupRestore} from 'react-icons/md'
import {RiLockPasswordLine} from 'react-icons/ri'

function Profile(){
const {user,isLoading}=useSelector(state=>state.auth)
const [isDisabled,setIsDisabled]=useState(true)
const [isUpdating,setIsUpdating]=useState(false)
const [formData,setFormData]=useState({
    newName:'',
    newEmail:'',
    newPhoneNumber:''
})
const {newName,newEmail,newPhoneNumber}=formData

const  {
    name,
    email,
    phoneNumber,
    imageUrl,

}=user;
const onUpdate=(e)=>{
    setIsUpdating(true)
    setIsDisabled(false)
}
const onCancel=(e)=>{
    setIsDisabled(true)
    setIsUpdating(false)
    setFormData({
        newName:"",
        newEmail:"",
        newPhoneNumber:""
    })
}
const onChange=(e)=>{
    
    setFormData((prevstate)=>({
        ...prevstate,
        [e.target.name]:e.target.value
    }))
    console.log(newEmail)
}

return (


<>
<Header/>
<div className='container mt-3' style={{"textAlign":"center"}} >
    <img src={imageUrl?imageUrl:"https://img-c.udemycdn.com/user/200_H/anonymous_3.png"} className="profile-image"/>
    <div className='col mt-5 profile-data mr-4' >
   
    <div className='row-sm mt-3'>
        <label className="text-dark " disabled>name:</label>
        <input onChange={onChange} name="newName" id="name"  type="text" placeholder={name} value={newName} disabled={isDisabled}/>
    </div>
    <div className='row-sm mt-3'>
        <label className="text-dark ">email:</label>
        <input onChange={onChange} name="newEmail" id="eamil" type="email" placeholder={email} value={newEmail} disabled={isDisabled}/>
    </div>
    <div className='row-sm mt-3'>
        <label className="text-dark " disabled>phone:</label>
        <input onChange={onChange} name="newPhoneNumber" id="phoneNumber" value={newPhoneNumber} placeholder={phoneNumber?phoneNumber:"Phone Number"} disabled={isDisabled}/>
    </div>
    <div className='btn-group mt-5'>
    <button onClick={onUpdate} className='btn  bg-warning text-light btn-profile'>

    <MdOutlineSettingsBackupRestore className='text-light  pr-1' style={{"fontSize":"23px"}} />
    Update</button>
    {isUpdating&&(
        <>
        <button  className='btn bg-success mx-3 text-light btn-profile'>
        <BiSave className='text-light  pr-1' style={{"fontSize":"23px"}} />
        Save</button>
        <button onClick={onCancel} className='btn bg-danger text-light btn-profile'>
        <MdOutlineCancel  className='text-light  pr-1' style={{"fontSize":"23px"}} />
        Cancel</button>
        </>
    )}
    {!isUpdating&&(
        <button  className='btn bg-dark mx-3 text-light btn-profile'>
        <RiLockPasswordLine className='text-light  pr-1' style={{"fontSize":"23px"}} />
        Change Password</button>
    )}
    </div>
    

   


   
    
  
  

     
    </div>
    


</div>
</>
)
}
export default Profile