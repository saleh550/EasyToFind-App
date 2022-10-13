import { useState ,useEffect} from 'react'
import {FaUser,FaSignInAlt} from 'react-icons/fa'
import {FcGoogle} from 'react-icons/fc'
import Logo from '../images/barberShop3.png'
import Spinner from '../components/Spinner' 
import Header from '../components/Header'
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
   if(isLoading){
    
    return <Spinner/>
   }
    return (
        <>
         <div className='home-header'>
        <Header/>

        </div>
       
    <div className='container mt-5 ' style={{"textAlign":"center"}} >
        <h1><FaUser/> Login</h1>
        <form onSubmit={onSubmit}>
            <div className='col mt-5 profile-data mr-4' >
                <div className='row-sm mt-4'>
                    <label className="text-dark d-none d-lg-inline" disabled>email:</label>
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
                <div className='row-sm mt-4'>
                    <label className="text-dark d-none d-lg-inline" disabled>pass:</label>
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
                 <button className='btn btn-dark text-light btn-profile btn-profile-login mt-5' type='submit'>login</button>
                 <br/>
                 <div className='mt-5 position-relative'>
                   <label  >
                <FcGoogle className='display-4 ' />
                <p className='text-dark'>Login With Google</p>

                 <GoogleLogin
                className='google-facebook-login mt-4 d-none'
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText='Login With Google'
                onSuccess={googleSignin}
                onFailure={googleFailedSignin}
                ></GoogleLogin>
                </label>
                </div>



            </div>

        </form>
    </div>
            
        
        </>
    )
}
export default Login