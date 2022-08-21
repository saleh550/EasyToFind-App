import { useState ,useEffect} from 'react'
import {FaUser,FaSignInAlt} from 'react-icons/fa'
import {FcGoogle} from 'react-icons/fc'
import Logo from '../images/barberShop3.png'
import Spinner from '../components/Spinner' 
import {useSelector,useDispatch} from 'react-redux'
import {login,reset} from '../features/auth/authSlice'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'

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
        console.log('submited') 
    }
    
    const googleSignin=()=>{
        console.log('google')
        
    }
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
                <p> : שם משתמש </p>
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
                <p> : סיסמה </p>
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
            <p className='p-icon'>התחבר עם </p>
           
            <FcGoogle onClick={googleSignin} className='google-icon'/>
            
            </form>
            </div>


        </div>
            
        
        </>
    )
}
export default Login