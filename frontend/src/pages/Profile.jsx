import {useSelector,useDispatch} from 'react-redux'
import { updateUser,uploadImage } from '../features/auth/authSlice'
import {useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import Header from '../components/Header'
import {BiSave} from 'react-icons/bi'
import {MdOutlineCancel} from 'react-icons/md'
import {MdOutlineSettingsBackupRestore} from 'react-icons/md'
import {RiLockPasswordLine} from 'react-icons/ri'
import {MdAddAPhoto} from 'react-icons/md'
import Modal from 'react-modal'
import Spinner from '../components/Spinner'

const customStyles={
    content:{
        width:'60%',
        top:'50%',
        left: '50%',
        right: 'auto',
        buttom:'auto',
        margin:'auto 5px',
        transform: 'translate(-50%,-50%)',
        position: 'relative',
    }
}



function Profile(){
   
const dispatch=useDispatch()
const navigate=useNavigate()
const {user,isLoading}=useSelector(state=>state.auth)
const [isDisabled,setIsDisabled]=useState(true)
const [isUpdating,setIsUpdating]=useState(false)
const [modalIsOpen,setModalIsOpen]=useState(false)
const [file,setFile]=useState()
const [imageSelected,setImageSelected]=useState(false)
const  {
    name,
    email,
    phoneNumber,
    imageUrl,

}=user;
useEffect(()=>{
    setFormData({
        newName:name,
        newEmail:email,
        newPhoneNumber:phoneNumber
    })
},[user])
const [formData,setFormData]=useState({
    newName:name,
    newEmail:email,
    newPhoneNumber:phoneNumber
})
const {newName,newEmail,newPhoneNumber}=formData


const onUpdate=(e)=>{
    
    setIsUpdating(true)
    setIsDisabled(false)
    e.preventDefault()
}
const onCancel=(e)=>{
    e.preventDefault()
    setIsDisabled(true)
    setIsUpdating(false)
    setFormData({
        newName:name,
        newEmail:email,
        newPhoneNumber:phoneNumber
    })
}
const onSave=(e)=>{
    e.preventDefault()
    const data={
        name:newName,
        email:newEmail,
        phoneNumber:newPhoneNumber,
        id:user._id
    }
     dispatch(updateUser(data))
     onCancel(e)
     closeModal(e)
     toast.success("User changed!")

}
const checkSuccessful=(e)=>{
    e.preventDefault()
    if(formData.newEmail===user.email&&formData.newName===user.name&&formData.newPhoneNumber===user.phoneNumber){
        toast.error("No changes happened")
        return
    }
    if(formData.newEmail===""||formData.newName===""||formData.newPhoneNumber===""){
        switch(""){
            case formData.newEmail:{
                toast.error("Email is empty , Add Email !")
                break;
            }
            case formData.newName:{
                toast.error("Name is empty , Add Name !")
                break;
            }
            case formData.newPhoneNumber:{
                toast.error("Phone Number is empty , Add Phone Number !")
                break;
            }
        }
        return
    }
    if(newPhoneNumber.length===10){
        var i=0;
        for( i=0;i<newPhoneNumber.length;i++){
           if(isNaN(newPhoneNumber[i])){
            toast.error("Phone number has failed , Make sure the number is correct ")
            
            return
           }

        }
    }else{
        toast.error("Phone number has failed , Make sure it contains 10 digits ")
        return
    }
    setModalIsOpen(true)
   
  

    

}
const onChange=(e)=>{
    
    setFormData((prevstate)=>({
        ...prevstate,
        [e.target.name]:e.target.value
    }))
  
}
const openModal=()=> setModalIsOpen(true)
const closeModal=()=> setModalIsOpen(false)

const fileSelected = event => {
    setImageSelected(true)
    const file = event.target.files[0]
    setFile(file)
		
	}
    const onUploadImage=(e)=>{
        if(!file){
            toast.error("You Need To Choose Image!")
            return
        }
        setImageSelected(false)
        const formdata=new FormData()
        formdata.append('image',file)
        formdata.append('id',"6315aec68d64ae778901ff3f")

        dispatch(uploadImage(formdata))
        setFile(null)
        
        
    }

return (
<>
{isLoading&&<Spinner/>}
<header className='home-header'>
<Header />

</header>

<div className='container mt-3 ' style={{"textAlign":"center"}} >
    
    <img src={imageUrl?imageUrl:"https://img-c.udemycdn.com/user/200_H/anonymous_3.png"}  className="profile-image"/>
    <br/>
    {isUpdating&&(
        <div className='btn-group' >
    <label className='btn btn-dark mt-2 text-light ml-5 ' > Choose Image
    <input   style={{"position":"relative" ,"left":"15%","display":"none"}} onChange={fileSelected} type="file" accept="image/*"/>
    </label>
    <label onClick={onUploadImage} className='btn  btn-success mt-2 text-light ml-2' >Upload Image</label>
    </div>
    )}
    
    
    <form onSubmit={checkSuccessful}>
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
    <div className='btn-group my-5'>
    <button onClick={onUpdate} className='btn  bg-warning text-light btn-profile'>

    <MdOutlineSettingsBackupRestore className='text-light  pr-1' style={{"fontSize":"23px"}} />
    Edit</button>
    {isUpdating&&(
        <>
        <button type='submit'  className='btn bg-success mx-3 text-light btn-profile'>
        <BiSave className='text-light  pr-1' style={{"fontSize":"23px"}} />
        Save</button>
        <button onClick={onCancel} className='btn bg-danger text-light btn-profile'>
        <MdOutlineCancel  className='text-light  pr-1' style={{"fontSize":"23px"}} />
        Cancel</button>
        </>
    )}

    {!isUpdating&&(
        <>
        <button onClick={()=>navigate('/changepassword')} className='btn bg-dark mx-3 text-light btn-profile'>
        <RiLockPasswordLine className='text-light  pr-1' style={{"fontSize":"23px"}} />
        Change Password</button>
        </>
    )}
    </div>
    </div>
    </form>

    <Modal isOpen={modalIsOpen} onRequestClose ={closeModal} style={customStyles}  ariaHideApp={false} contentLabel='Update User' >
        <h4>Are you sure want to update user ?</h4>
       {user.name!==newName&& <h6 className='text-danger'>Name : {user.name} to {newName}</h6>}
       {user.email!==newEmail&& <h6 className='text-danger'>Email : {user.email} to {newEmail}</h6>}
       {user.phoneNumber!==newPhoneNumber&& <h6 className='text-danger'>phone Number : {user.phoneNumber} to {newPhoneNumber}</h6>}
       <div className='btn-group'>
        <button onClick={onSave} className='btn btn-light'>Accept</button>
        <button onClick={closeModal} className='btn btn-light'>Cancel</button>

       </div>



    </Modal>
</div>
</>
)
}
export default Profile