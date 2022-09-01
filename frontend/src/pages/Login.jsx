import { useState ,useEffect} from 'react'
import {FaUser,FaSignInAlt} from 'react-icons/fa'
import {FcGoogle} from 'react-icons/fc'
import Logo from '../images/barberShop3.png'
import Spinner from '../components/Spinner' 
import {useSelector,useDispatch} from 'react-redux'
import {login,reset,loginWithGoogle,test} from '../features/auth/authSlice'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import GoogleLogin from 'react-google-login'
import { gapi } from "gapi-script";





function Login(){
    
    const [formData,setFormData]=useState({
        email:'',
        password:''
    })
    const {email,password}=formData
    const {isLoading,isError,isSuccess,message,user}=useSelector((state)=>state.auth)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    
   
    useEffect(()=>{
        
        if(isError){
            toast.error(message)
        }
        if(isSuccess){
            navigate('/')
        }
        dispatch(reset())
    },[isError,isSuccess,message,navigate,dispatch])
    const onChange=(e)=>{
        setFormData((prevstate)=>({
            ...prevstate,
            [e.target.name]:e.target.value
        }))


    }
    const onSubmit=(e)=>{
        e.preventDefault()
        const userData={
            email,password
        }
        dispatch(login(userData))
       
    }
    
    const googleSignin=(response)=>{

            const {googleId,name,email,imageUrl}=response.profileObj
            const userData={googleId,name,email,imageUrl}
            dispatch(loginWithGoogle(userData))
        
    }
    const googleFailedSignin=(response)=>{
        toast.error("login with google failed ! , try again .")
    }
    const MyFacebookButton = ({ onClick, styles }) => (
        <button onClick={onClick} style={styles}>
          Login with facebook
        </button>
      );
   if(isLoading){
    
    return <Spinner/>
   }
    return (
        <>
        
        <div className='log-page'>
        
    
        <div className='form'>
            <form onSubmit={onSubmit}>
            <h1>  התחבר <FaUser/> </h1>
            <div className='form-group'>
              
                 <input
                    type='email'
                    placeholder='Email'
                    id='email'
                    name='email'
                    value={email}
                    onChange={onChange}
                    required
                    
                 /> 
            </div>
            <div className='form-group'>
                
                 <input
                    type='password'
                    placeholder='Password'
                    id='password'
                    name='password'
                    value={password}
                    onChange={onChange}
                    required
                    
                 /> 
            </div>
            <button className='btn-login' type='submit'>התחבר</button>
            <GoogleLogin
            className='google-facebook-login'
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText='Login With Google'
            onSuccess={googleSignin}
            onFailure={googleFailedSignin}
            ></GoogleLogin>

          
            
            
            
           
           
            
            {/* <FcGoogle onClick={googleSignin} className='google-icon'/> */}
           
            
            </form>
            </div>


        </div>
            
        
        </>
    )
}
export default Login