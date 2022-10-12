import Header from "../components/Header"
import {MdOutlinePassword} from 'react-icons/md'
import {useEffect,useState} from 'react'
import{useSelector,useDispatch}from 'react-redux'
import {toast} from 'react-toastify'
import Spinner from "../components/Spinner"
import {reset,changePassword} from '../features/auth/authSlice'



function ChangePassword(){
    const {user,isLoading,isSuccess,isError,message}=useSelector(state=>state.auth)
    const [formData,setFormData]=useState({
        password:"",
        password1:"",
        password2:""
    })
    const dispatch=useDispatch()

    useEffect(()=>{
        if(isError){
            toast.error(message)
        }
       
        if(isSuccess){
            setFormData({
                password:"",
                password1:"",
                password2:""
            })
            toast.success("Password is Changed !")
        }
        dispatch(reset())
    },[isError,isSuccess,isLoading,user,message,dispatch])

    const {password,password1,password2}=formData


    const onChange=(e)=>{
        setFormData((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }
    const onSubmit=(e)=>{
        e.preventDefault()
        const data={
            password:formData.password,
            password1:formData.password1,
            password2:formData.password2,
            id:user._id
        }
        dispatch(changePassword(data))
    }
    return (<>
        <div className="home-header">
        <Header/>

        </div>
        <div className='container mt-5' style={{"textAlign":"center"}}>
        
            <h1 className="text-dark">Change Password !</h1>
            <MdOutlinePassword className="text-secondary" style={{"fontSize":"100px"}}/>
            <form onSubmit={onSubmit}>
                <div className='col mt-3 profile-data mr-4' >
   
                    <div className='row-sm mt-3'>
                        <input onChange={onChange} type="password" name="password" value={password} placeholder="Your Password" />
                    </div>
                    <div className='row-sm mt-3'>
                        <input onChange={onChange} type="password" name="password1" value={password1} placeholder="New Password"/>
                    </div>
                    <div className='row-sm mt-3'>
                        <input onChange={onChange} type="password" name="password2" value={password2} placeholder="Confirm Passsword"/>
                    </div>
                    <div className='btn-group my-5'>
                        <button type="submit" className='btn  bg-dark text-light btn-profile'>Change</button>
  
 
                    </div>
                </div>
            </form>
        </div>
    </>)

}
export default ChangePassword