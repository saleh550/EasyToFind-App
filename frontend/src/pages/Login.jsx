import { useState } from 'react'
import {FaUser,FaSignInAlt} from 'react-icons/fa'
import {FcGoogle} from 'react-icons/fc'
import Logo from '../images/barberShop3.png' 
import {useSelector,useDispatch} from 'react-redux'
import {login} from '../features/auth/authSlice'

function Login(){
    const [formData,setFormData]=useState({
        email:'',
        password:''
    })
    const {email,password}=formData
    const {isLoading,isError,isSuccess,message,user}=useSelector((state)=>state.auth)
    const dispatch=useDispatch()
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