import {FaUser} from 'react-icons/fa'
import {FcGoogle} from 'react-icons/fc'
import {useState,useEffect} from 'react'
import {useNavigate,Link} from 'react-router-dom'
import {toast} from 'react-toastify'
import {useSelector,useDispatch} from 'react-redux'
import {register,reset,loginWithGoogle} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import Header from '../components/Header'
import {GoogleLogin} from 'react-google-login'


function Register(){

    const {user,isError,isSuccess,isLoading,message}=useSelector((state)=>state.auth)
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const [formData,setFormData]=useState({
        name:'',
        email:'',
        password:'',
        password2:'',
        phoneNumber:''
    })
    const {name ,email,password,password2,phoneNumber}=formData



    useEffect(()=>{
        if(isError){
            toast.error(message)
        }
        if(isSuccess){
            navigate('/')
        }
        
        dispatch(reset())
    },[isError,isSuccess,message,dispatch,navigate])
    const onChange=(e)=>{
        setFormData((prevstate)=>({
            ...prevstate,
            [e.target.name]:e.target.value
        }))
        

    }
    const onSubmit=(e)=>{
        e.preventDefault()
        if(password!==password2)
        {
            toast.error('Please add a same password')
            return
        }else {
            const userData={
                name,email,password,phoneNumber
            }
            dispatch(register(userData))
        }
       
    }
    const googleRegister=(response)=>{
        const {googleId,name,email,imageUrl}=response.profileObj
            const userData={googleId,name,email,imageUrl}
            dispatch(loginWithGoogle(userData))
        
    }
    const googleFailedSignin=()=>{
        toast.error("Register with google failed ! , try again .")
    }
    if(isLoading){
        return <Spinner/>
    }
    return (
        <>
         <div className='home-header'>
        <Header/>

        </div>
        
        <div className='container mt-5 ' style={{"textAlign":"center"}}>
            <h1><FaUser/> Register</h1>
            <div   className='text-right text-xl-center'>
                <Link className='btn btn-light  btn-profile mt-3' to='/businessowner/login'>Login as a business owner</Link>
            </div>
            <form onSubmit={onSubmit}>
                <div className='col  profile-data mr-4' >
                    <div className='row-sm mt-3'>
                        <label className="text-dark d-none d-lg-inline" disabled>name:</label>
                        <input
                        type='text'
                        placeholder='Full Name'
                        id='name'
                        name='name'
                        value={name}
                        onChange={onChange}
                        required
                        />
                    </div>
                    <div className='row-sm mt-3'>
                        <label className="text-dark d-none d-lg-inline " disabled>email:</label>
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
                    <div className='row-sm mt-3'>
                        <label className="text-dark d-none d-lg-inline " disabled>pass:</label>
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
                    <div className='row-sm mt-3'>
                        <label className="text-dark d-none d-lg-inline" disabled>pass:</label>
                        <input
                        type='password'
                        placeholder='Comfirt Password'
                        id='password2'
                        name='password2'
                        value={password2}
                        onChange={onChange}
                        required
                    
                        />
                    </div>
                    <div className='row-sm mt-3'>
                        <label className="text-dark d-none d-lg-inline" disabled>phone:</label>
                        <input
                        type='text'
                        placeholder='Phone Number'
                        id='phoneNumber'
                        name='phoneNumber'
                        value={phoneNumber}
                        onChange={onChange}
                        required
                    
                        />
                    </div>
                </div>
                <button className='btn btn-dark text-light btn-profile btn-profile-login mt-5' type='submit'>Register</button>
                <div className='mt-4'>
                   <label  >
                <FcGoogle className='display-4 ' />
                <p className='text-dark'>Register With Google</p>
                 <GoogleLogin 
                className='google-facebook-login d-none'
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText='Login With Google'
                onSuccess={googleRegister}
                onFailure={googleFailedSignin}
                >    
                </GoogleLogin>  
                </label> 
                </div>
                
                
            </form>
        </div>
        
        </>
    )
}
export default Register